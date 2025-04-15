'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import uniqid from 'uniqid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';

console.log('⚠️ UploadModal loaded');

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqId = uniqid();
      const sanitizedTitle = values.title.trim().replace(/[^a-zA-Z0-9-_]/g, '');
      const filePath = `song-${sanitizedTitle}-${uniqId}`;

      // Upload song file
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(filePath, songFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (songError) {
        toast.error('Failed to upload song');
        return;
      }

      // Upload image file
      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from('images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (imageError) {
        toast.error('Failed to upload image');
        return;
      }

      // Insert metadata to songs table
      const { error: dbError } = await supabaseClient.from('songs').insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (dbError) {
        toast.error(dbError.message);
        return;
      }

      toast.success('Song created!');
      router.refresh();
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error('Something went wrong! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Artist name"
        />
        <div className="pb-1">
          <div>Select a song file</div>
          <Input
            type="file"
            id="song"
            disabled={isLoading}
            {...register('song', { required: true })}
            accept=".mp3"
          />
        </div>
        <div className="pb-1">
          <div>Select an image</div>
          <Input
            type="file"
            id="image"
            disabled={isLoading}
            {...register('image', { required: true })}
            accept="image/*"
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
