'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Button from '@/components/Button';
import useSubscribeModal from '@/hooks/useSubscribeModal';
import { useUser } from '@/hooks/useUser';
import { postData } from '@/libs/helper';

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  const redirectTocustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
      });
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        <p>Please sign in to view your account details.</p>
        {/* Add your sign-in component or redirect logic here */}
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8 px-6 bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/1500x500"
            alt="Profile Banner"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-32 left-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile Picture"
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 pb-6 px-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.user_metadata?.name || 'User Name'}
          </h2>
          <p className="text-gray-600">{user.email || 'user@example.com'}</p>
          <div className="mt-4">
            {!subscription ? (
              <div className="flex flex-col items-center gap-y-4">
                <p className="text-gray-600">No active plan.</p>
                <Button onClick={subscribeModal.onOpen} className="w-[300px]">
                  Subscribe
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-y-4">
                <p className="text-gray-600">
                  You are currently on the
                  <b> {subscription?.prices?.products?.name} </b>
                  plan.
                </p>
                <Button
                  disabled={loading || isLoading}
                  onClick={redirectTocustomerPortal}
                  className="w-[300px]"
                >
                  Open customer portal
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountContent;
