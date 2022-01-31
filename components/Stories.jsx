import faker from "@faker-js/faker";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Story from "./Story";

const Stories = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="flex space-x-2 p-6 scrollbar-thin scrollbar-thumb-black bg-white border border-gray-200 mt-8 rounded-sm overflow-x-scroll">
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {suggestions.map(({ id, avatar, username }) => (
        <Story key={id} img={avatar} username={username} />
      ))}
    </div>
  );
};

export default Stories;
