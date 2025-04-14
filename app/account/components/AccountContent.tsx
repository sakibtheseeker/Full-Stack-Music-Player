'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Button from '@/components/Button';
import useSubscribeModal from '@/hooks/useSubscribeModal';
import { useUser } from '@/hooks/useUser';
import { postData } from '@/libs/helper';
import styles from './AccountContent.module.css';

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

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="text-center text-gray-600 mt-10">
        <p>Please sign in to view your account details.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.container} mb-10 px-6`}>
      <div className={styles.userInfo}>
        <p className={styles.userName}>
          Name: {user.user_metadata?.name || 'N/A'}
        </p>
        <p className={styles.userEmail}>
          Email: {user.email || 'N/A'}
        </p>
      </div>

      {!subscription ? (
        <div className={styles.subscriptionInfo}>
          <p className="text-gray-700">No active plan.</p>
          <Button onClick={subscribeModal.onOpen} className={styles.subscribeButton}>
            Subscribe
          </Button>
        </div>
      ) : (
        <div className={styles.subscriptionInfo}>
          <p className="text-gray-700">
            You are currently on the
            <b> {subscription?.prices?.products?.name} </b>
            plan.
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectTocustomerPortal}
            className={styles.portalButton}
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
