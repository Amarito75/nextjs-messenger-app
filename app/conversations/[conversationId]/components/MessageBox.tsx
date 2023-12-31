"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";
import { HiEye } from "react-icons/hi";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email != data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-2 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn
      ? "bg-black text-white rounded-b-xl rounded-tl-xl"
      : "bg-white drop-shadow-lg rounded-b-xl rounded-tr-xl",
    data.image ? "rounded-md p-0 bg-transparent" : "py-3 px-3"
  );
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-300">{data.sender.name}</div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt="Image"
              height={288}
              width={288}
              src={data.image}
              className="object-cover cursor-pointer hover:scale-95 transtion translate duration-200"
            />
          ) : (
            <div>{data.body}</div>
          )}
          <div className="flex justify-end text-[10px] text-gray-300">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            <HiEye />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
