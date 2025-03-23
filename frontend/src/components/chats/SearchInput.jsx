import React, { useState } from "react";

import { Search } from "lucide-react";
import { useMessageStore } from "@/store/messageStore";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { conversations, selectedConversation, setSelectedConversation } =
    useMessageStore();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return; // ✅ Prevent empty searches

    const filteredConversations = conversations.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredConversations.length > 0) {
      setSelectedConversation(filteredConversations[0]); // ✅ Set the first matching conversation
    }

    
    console.log(filteredConversations);  

    setSearch(""); // ✅ Clear search field after searching
  };


  return (
    <form className="flex items-center gap-2 m-4" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search.."
        className="input input-bordered rounded-full text-white"
        value={search} // ✅ Controlled input
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle hover:bg-rose-500 text-white transition-colors duration-300"
      >
        {" "}
        <Search />
      </button>
    </form>
  );
};

export default SearchInput;
