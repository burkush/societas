import React, { useEffect } from 'react';
import { useUserStore, useAuthStore } from '../../app/store';
import ProfileHeader from './ProfileHeader';
import PostForm from '../../features/posts/PostForm';

const Profile = () => {
  const { id } = useAuthStore((state) => state.user);
  const getUserInfo = useUserStore((state) => state.getUserInfo);

  useEffect(() => {
    async function getInfo(userId) {
      await getUserInfo(userId);
    }

    getInfo(id);
  }, []);

  return (
    <main className="max-w-5xl mx-auto">
      <ProfileHeader />

      <div className="flex flex-wrap gap-10">
        <PostForm />
      </div>
    </main>
  );
};

export default Profile;
