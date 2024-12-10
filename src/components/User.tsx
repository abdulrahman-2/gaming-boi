import Image from "next/image";
import React from "react";

const User = ({
  user,
}: {
  user: { name: string; avatar: { secure_url: string } };
}) => {
  return (
    <div className="flex items-center cursor-pointer gap-2">
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <Image
          src={user?.avatar.secure_url}
          alt={user?.name}
          fill
          className="object-cover"
        />
      </div>

      <h2 className="font-semibold text-white">{user?.name}</h2>
    </div>
  );
};

export default User;
