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
      <h2 className={styles.header}>Profile</h2>

      <div className={styles.userInfo}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            value={user.user_metadata?.name || 'N/A'}
            disabled
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="text"
            value={user.email || 'N/A'}
            disabled
            className={styles.inputField}
          />
        </div>
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
