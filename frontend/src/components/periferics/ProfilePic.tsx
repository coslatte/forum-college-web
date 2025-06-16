import type React from "react";

interface ProfilePicProps {
  profile_pic: string | null;
  username: string;
  size?: number; // Opcional
}

export const ProfilePic: React.FC<ProfilePicProps> = ({
  profile_pic,
  username,
  size = 8,
}) => {
  return (
    <>
      {profile_pic ? (
        <img
          src={profile_pic}
          alt={`${username}'s profile`}
          className={`w-${size} h-${size} rounded-full`}
        />
      ) : (
        <div
          className={`w-${size} h-${size} rounded-full bg-gray-300 flex items-center justify-center`}
        >
          <span className="text-gray-600">{username[0]}</span>
        </div>
      )}
    </>
  );
};
