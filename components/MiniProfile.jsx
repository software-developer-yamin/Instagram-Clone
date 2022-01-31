import { signOut, useSession } from "next-auth/react";
import React from "react";

function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={session.user.image}
        alt=""
        className="inline-block object-cover w-12 h-12 rounded-full"
      />
      <div className="flex-grow mx-4">
        <h2 className="font-bold">{session?.user.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      <button onClick={signOut} className="text-blue-400 text-sm font-semibold">
        Sign out
      </button>
    </div>
  );
}

export default MiniProfile;
