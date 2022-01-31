import React from "react";

function Story({ img, username }) {
  return (
    <div>
      <img
        src={img}
        className="h-14 w-14 p-[1.5px] border-red-500 hover:scale-110 transition transform duration-200 ease-out border-2 object-contain cursor-pointer rounded-full"
        alt=""
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
}

export default Story;
