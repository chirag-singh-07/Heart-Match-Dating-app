import React from "react";
import { Separator } from "../ui/separator";
import ConversationList from "./ConversationList";
import SearchInput from "./SearchInput";
import BottomBar from "./BottomBar";

const Sidebar = () => {
  return (
    <div className="w-74 border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <Separator />
      <ConversationList />
      <BottomBar />
    </div>
  );
};

export default Sidebar;
