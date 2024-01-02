"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/Card";

import posts from "@/lib/allPosts.json";
import Tag from "@/components/Tag";

import Icon from "@/components/Icon";

import axios from "axios";
import { Button, Textarea } from "@nextui-org/react";
import { Button as CustomButton } from "@/components/Button"


export default function Post({ user, postId }: { user: any, postId: string }) {
  const [post, setPost] = useState<any | null>({ comments: 0, author: {
    username: ''
  } });
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState<Array<any>>([]);


  useEffect(() => {
    if (reply == '') {
      const fetchData = async () => {

        try {
          const postResponse = await axios.get(`/api/post?id=${postId}`);
          setPost(postResponse.data);

          const repliesResponse = await axios.get(`/api/comments?id=${postId}`);

          if (repliesResponse.data.length != 0) {
            console.log(Object.values(repliesResponse.data))
            setReplies(Object.values(repliesResponse.data));
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }


      }

      fetchData();
    }
  }, [reply])
  const sendReply = async () => {
    console.log('reply', reply)
    const data = await axios.post('/api/comments', {
      content: reply,
      postId: postId,
      authorId: user.userId,
    })

    setReply('');
  }


  return (
    <main className="flex flex-col px-1/6 md:px-[10vw] lg:px-[10vw] gap-5">
      <Link
        href="/forum"
        className="hover:bg-[var(--clr-grey-200)] rounded-xl cursor-pointer text-xs md:text-sm lg:text-sm items-center text-[var(--clr-blue-400)] font-semibold flex gap-2 w-fit"
      >
        <Icon icon="arrow-left" fillColor="#3981F6" /> Back to Forum
      </Link>

      <Card>
        <div className="flex gap-10">
          <div className="flex flex-col items-center text-xs md:text-sm lg:text-sm">
            <Icon icon="arrow-up" fillColor="black" />
            {post.likes}
            <Icon icon="arrow-down" fillColor="black" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              @{post.author.username}
              <Tag type="green">{post.date}</Tag>
            </div>
            <h1 className="text-xl md:text-3xl lg:text-4xl">{post.title}</h1>
            <p className="text-sm md:text-base lg:text-base">{post.body}</p>

            {/* <CustomButton type="" style="btn--primary" size="btn--sm">
              Add a reply
            </CustomButton> */}
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex gap-10">
          <div className="flex flex-col gap-2 pl-[5%] pr-[5%] w-full h-full">
            <div className="flex gap-2">

            </div>
            <Textarea
              label="What do you wanna say?"
              labelPlacement="outside"
              placeholder="Enter your description"
              className="w-full h-full"
              classNames={{
                label: '!mb-0'
              }}
              value={reply}
              onValueChange={(v) => setReply(v)}
            />

            <Button color='primary' variant='bordered' onClick={sendReply}>
              Send Comment
            </Button>
          </div>

        </div>
      </Card>

      <h2 className="text-base md:text-xl lg:text-xl tracking-tight">
        {post.comments.length} Comment{post.comments.length == 1 ? '' : 's'}
      </h2>

      <div className="flex flex-col gap-5 cursor-pointer">
        {replies.map((item: any, index: number) => (
          <div
            key={index}
            className="border-2 border-[var(--clr-grey-300)] p-4 rounded-xl flex flex-row gap-5"
          >
            <div className="flex flex-col gap-2">
              <span className="inline-block flex gap-2 text-xs md:text-sm lg:text-sm">
                @{item.author.username} • {item.date} <Tag type="tag">Comment</Tag>{" "}
              </span>
              <p className="text-xs md:text-sm lg:text-sm">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
