"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/app/components/Avatar";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();

  const isActive = members.indexOf(otherUser?.email!) != -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive ? "Online" : "Offline";
  }, [conversation, isActive]);
  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-neutral-800 w-full flex drop-shadow-sm sm:px-4 py-3 px-4 lg:px-6 justify-between items-center">
        <div className="flex gap-3 items-center">
          <Link
            className="lg:hidden block text-black transition cursor-pointer"
            href="/conversations"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div className="text-white">
              <p className="text-md font-medium text-white">
                {conversation && conversation.name
                  ? conversation.name
                  : otherUser && otherUser.name
                  ? otherUser.name
                  : "Unknown"}
              </p>
            </div>
            <div className="text-sm font-light text-neutral-300">
              {statusText}
            </div>
          </div>
        </div>
        <div className="rounded-full p-1 lg:p-2 bg-white drop-shadow-lg">
          <HiEllipsisHorizontal
            size={32}
            onClick={() => setDrawerOpen(true)}
            className="text-black cursor-pointer transition"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
