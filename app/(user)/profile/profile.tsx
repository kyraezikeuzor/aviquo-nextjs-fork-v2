"use client";

import React, { useState, useEffect } from "react";

import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Tag from "@/components/Tag";

import interestList from "@/lib/interests.json";

import { toDateTimeString } from "@/utils";

export default function Profile({ user }: { user: any }) {
  const [forumData, setForumData] = useState<any>([]);
  const [likedActivities, setLikedActivities] = useState<any>([]);

  useEffect(() => {
    let posts = user.posts.map((obj: any) => ({ ...obj, type: "Question" }));
    let replies = user.comments.map((obj: any) => ({ ...obj, type: "Reply" }));

    const combined = [...posts, ...replies].sort(
      (a: any, b: any) => b.date - a.date
    );

    setForumData(combined);
    // setSearchDataFiltered(Object.values(response));
    // console.log(response);
  }, []);

  return (
    <main className="m-auto flex flex-col gap-5 !px-1/6 md:!px-[10vw] lg:!px-[10vw]">
      <div className="flex flex-col gap-5">
        <img
          className="rounded-full w-20 h-auto"
          src="https://lh3.googleusercontent.com/a-/AOh14GgeD4LTuYuvwpMah5byGlk8eREsrmb9xO691yO3VQ=s96-c"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl">
            {user?.firstName} {user?.lastName}
          </h1>
          <div className="flex gap-2">
            <Tag type="tag">
              <b>1</b>follower
            </Tag>
            <Tag type="tag">
              <b>29</b>following
            </Tag>
            <Tag type="tag">
              <b>23</b>posts
            </Tag>
            <Tag type="tag">
              <b>108</b>likes
            </Tag>
          </div>
          <p>{user?.bio}</p>
        </div>
      </div>
      <h2 className="text-lg md:text-xl lg:text-xl tracking-normal">
        My Posts
      </h2>
      <div className="flex flex-col gap-5">
        {forumData.map((item: any, index: number) => (
          <div
            key={index}
            className="border-2 border-[var(--clr-grey-300)] p-4 rounded-xl flex flex-row gap-5"
          >
            <div className="w-4 flex flex-col items-center">
              <Icon icon="arrow-up" fillColor="black" />
              <p className="text-sm font-semibold text-[var(--clr-grey-400)]">
                {item.likes}
              </p>
              <Icon icon="arrow-down" fillColor="black" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm inline-block flex gap-2">
                @{item.username} • {toDateTimeString(item.date)}{" "}
                <Tag type="tag">{item.type}</Tag>{" "}
              </span>
              <h3 className="font-semibold text-lg md:text-lg lg:text-lg tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm">
                {item.type == "Question" ? item.body : item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-lg md:text-xl lg:text-xl tracking-normal">
        My Liked Opportunities
      </h2>
      <div className="flex flex-row flex-wrap gap-3">
        {likedActivities.map((item: any, index: number) => (
          <Card key={index}>
            <h3 className="text-lg md:text-lg lg:text-lg tracking-tight">
              {item.name}
            </h3>
            <p className="text-sm">{item.description}</p>
            <div className="flex flex-wrap">
              <Tag type="pink">{item.type}</Tag>
              <Tag type="pink">{item.location}</Tag>
              <Tag type="green">{item.education}</Tag>
              <Tag type="orange">{item.duration}</Tag>
              <Tag type="tag">{item.subjects}</Tag>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
