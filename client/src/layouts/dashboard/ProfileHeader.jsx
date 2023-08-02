import React from 'react';
import { Link } from 'react-router-dom';
import profilePicture from '../../assets/img/user/blank-profile-picture.png';
import { useUserStore } from '../../app/store';

const ProfileHeader = () => {
  const isLoading = useUserStore((state) => state.isLoading);
  const {
    firstName,
    lastName,
    createdAt: dateJoined
  } = useUserStore((state) => state.user);

  const formattedDate = new Date(dateJoined).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="mb-10">
      <section className="flex gap-10">
        <div>
          <img
            src={profilePicture}
            alt="Profile avatar"
            width="150"
            height="150"
          />
        </div>

        <div className="flex-1">
          <header className="border-b pb-2">
            <div className="flex items-center gap-x-5">
              <h1 className="text-xl text-slate-800 font-bold">
                <span>
                  {firstName} {lastName}
                </span>
              </h1>
              <Link
                to="settings"
                className="text-sm text-blue-600 hover:underline"
              >
                Edit profile
              </Link>
            </div>
          </header>

          <div className="grid grid-cols-[150px,_1fr]">
            <div>
              <h2>Posts number</h2>
              <h2>Date joined</h2>
            </div>
            <div>
              <p>4</p>
              <p>{formattedDate}</p>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default ProfileHeader;
