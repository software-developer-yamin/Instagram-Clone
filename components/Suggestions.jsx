import faker from "@faker-js/faker";
import { useEffect, useState } from "react";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-4">
        <h3 className="text-sm text-gray-400 font-bold">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {suggestions.map(({ id, avatar, username, company }) => (
        <div className="flex items-center justify-between mt-4" key={id}>
          <img
            src={avatar}
            alt=""
            className="w-10 h-10 rounded-full object-contain border p-[2px]"
          />
          <div className="flex-grow ml-4">
            <h2 className="font-semibold text-sm">{username}</h2>
            <h3 className="text-xs text-gray-400">Works at {company.name}</h3>
          </div>
          <button className="text-xs text-blue-400 font-bold">Follow</button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
