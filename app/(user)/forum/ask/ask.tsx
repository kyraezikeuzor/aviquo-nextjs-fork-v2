"use client";
import React, { useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import Icon from "@/components/Icon";

import { Button, Textarea } from "@nextui-org/react";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Ask({ user }: { user: any }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <main className="flex flex-col px-1/6 md:px-[10vw] lg:px-[10vw] gap-5">
      <Toaster position="top-center" reverseOrder={false} />
      <Link
        href="/forum"
        className="hover:bg-[var(--clr-grey-200)] rounded-xl cursor-pointer text-xs md:text-sm lg:text-sm items-center text-[var(--clr-blue-400)] font-semibold flex gap-2"
      >
        <Icon icon="arrow-left" fillColor="#3981F6" /> Back to Forum
      </Link>
      <h1 className="text-lg tracking-tight md:text-xl lg:text-2xl">
        Create A Post
      </h1>
      <Card>
        <div className="flex flex-col w-full p-2 gap-5">
          <div className="w-full">
            <h2 className="text-[var(--clr-grey-500)] tracking-tight text-sm md:text-base lg:text-lg">
              Title
            </h2>
            <input
              className="focus:outline-none w-full border-2 border-[var(--clr-grey-300)] rounded-xl p-2 text-xs md:text-sm lg:text-sm"
              placeholder="Add a memorable title"
              value={title}
              onChange={(v) => setTitle(v.target.value)}
            />
          </div>
          <div className="w-full">
            <h2 className="text-[var(--clr-grey-500)] tracking-tight text-sm md:text-base lg:text-lg">
              Content
            </h2>
            <textarea
              className="focus:outline-none w-full border-2 border-[var(--clr-grey-300)] rounded-xl p-2 text-xs md:text-sm lg:text-sm"
              placeholder="Add a description to provide more details or elaborate"
              value={content}
              onChange={(v) => setContent(v.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <Button
            color="default"
            onClick={async () => {
              const response = await axios.post("/api/posts", {
                // Your request payload or data goes here
                title: title,
                body: content,
                authorId: user.userId,
              });

              if (response.status == 200) {
                toast.success("Successfully posted!");
                setTitle("");
                setContent("");
              } else {
                toast.error(
                  "Server ran into error! Please contact support at aviquocompany@gmail.com"
                );
              }
            }}
          >
            Send Post
          </Button>
        </div>
      </Card>
    </main>
  );
}
