"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/Card";

import users from "@/lib/users.json";
import posts from "@/lib/allPosts.json";
import Tag from "@/components/Tag";

import { getPath } from "@/lib/utilities";

import Icon from "@/components/Icon";

import Button from "@/components/Button";
import axios from "axios";

type Params = {
  params: {
    question_name: string;
  };
};

export default function ForumPost({ params: { question_name } }: Params) {
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/post?id=${question_name}`);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])

  useEffect(() => {
    for (let i = 0; i < posts.length; i++) {
      if (`${getPath(posts[i].title)}` === `/${question_name}`) {
        setPost(posts[i]);
      }
    }
  });

  const postTitle = post ? post.title : "";
  const postLikes = post ? post.likes : "";
  const userId = post ? post.userId : "";
  const postDate = post ? post.date : "";
  const postTags = post ? post.tags : [];
  const postBody = post ? post.body : [];
  const postCommentsCount = post ? post.comments : 0;

  return (
    <main className="flex flex-col px-1/6 md:px-[10vw] lg:px-[10vw] gap-5">
      <Link
        href="/marketplace"
        className="hover:bg-[var(--clr-grey-200)] rounded-xl cursor-pointer text-xs md:text-sm lg:text-sm items-center text-[var(--clr-blue-400)] font-semibold flex gap-2"
      >
        <Icon icon="arrow-left" fillColor="#3981F6" /> Back to Forum
      </Link>

      <Card>
        <div className="flex gap-10">
          <div className="flex flex-col items-center text-xs md:text-sm lg:text-sm">
            <Icon icon="arrow-up" fillColor="black" />
            {postLikes}
            <Icon icon="arrow-down" fillColor="black" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              @kyraezikeuzor
              <Tag type="tag">0 answers, 7 votes</Tag>
              <Tag type="green">{postDate}</Tag>
            </div>
            <h1 className="text-xl md:text-3xl lg:text-4xl">{postTitle}</h1>
            <p className="text-sm md:text-base lg:text-base">{postBody}</p>

            <div className="flex flex-wrap mb-10">
              {postTags.map((item: any, index: any) => (
                <Tag key={index} type="tag">
                  {item}
                </Tag>
              ))}
            </div>
            <Button type="" style="btn--primary" size="btn--sm">
              Add a reply
            </Button>
          </div>
        </div>
      </Card>

      <h2 className="text-base md:text-xl lg:text-xl tracking-tight">
        {postCommentsCount} Comments
      </h2>

      <div className="flex flex-col gap-5 cursor-pointer">
        {posts.map((item, index) => (
          <div
            key={index}
            className="border-2 border-[var(--clr-grey-300)] p-4 rounded-xl flex flex-row gap-5"
          >
            <div className="w-4 flex flex-col items-center">
              <Icon icon="arrow-up" fillColor="black" />
              <p className="font-semibold text-[var(--clr-grey-400)]">
                {item.likes}
              </p>
              <Icon icon="arrow-down" fillColor="black" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="inline-block flex gap-2 text-xs md:text-sm lg:text-sm">
                @{item.username} • {item.date} <Tag type="tag">{item.type}</Tag>{" "}
              </span>
              <h2 className="font-semibold text-base md:text-lg lg:text-xl">
                {item.title}
              </h2>
              <p className="text-xs md:text-sm lg:text-sm">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
