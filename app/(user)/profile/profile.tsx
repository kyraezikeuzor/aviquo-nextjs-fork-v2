"use client";

import React, { useState, useEffect } from "react";

import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Tag from "@/components/Tag";

import interestList from "@/lib/interests.json";

import { toDateTimeString } from "@/utils";

import { UserInterface } from "@/auth/lucia";

export default function Profile({
  user,
}: {
  user: UserInterface & { userId: string };
}) {
  const [forumData, setForumData] = useState<any>([]);
  const [likedActivities, setLikedActivities] = useState<any>([]);

  useEffect(() => {
    if (!user.posts) user.posts = [];
    if (!user.comments) user.comments = [];

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
          className="w-20 h-auto rounded-full"
          src="https://lh3.googleusercontent.com/a-/AOh14GgeD4LTuYuvwpMah5byGlk8eREsrmb9xO691yO3VQ=s96-c"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl">
            {user?.firstName} {user?.lastName}
          </h1>
          <div className="flex gap-2">
            <Tag type="tag">
              <b>1</b>Upvotes
            </Tag>
            <Tag type="tag">
              <b>29</b>Downvotes
            </Tag>
            <Tag type="tag">
              <b>23</b>Posts
            </Tag>
            <Tag type="tag">
              <b>108</b>Liked Items
            </Tag>
          </div>
          <p>{user?.bio}</p>
        </div>
      </div>
      <h2 className="text-lg tracking-normal md:text-xl lg:text-xl">
        My Posts
      </h2>
      <div className="flex flex-col gap-5">
        {forumData.map((item: any, index: number) => (
          <div
            key={index}
            className="border-2 border-[var(--clr-grey-300)] p-4 rounded-xl flex flex-row gap-5"
          >
            <div className="flex flex-col items-center w-4">
              <Icon icon="arrow-up" fillColor="black" />
              <p className="text-sm font-semibold text-[var(--clr-grey-400)]">
                {item.upvotes == undefined
                  ? 0
                  : item.upvotes.length - item.downvotes.length}
              </p>
              <Icon icon="arrow-down" fillColor="black" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="flex gap-2 text-sm">
                @{item.username} • {toDateTimeString(item.date)}{" "}
                <Tag type="tag">{item.type}</Tag>{" "}
              </span>
              <h3 className="text-lg font-semibold tracking-tight md:text-lg lg:text-lg">
                {item.title}
              </h3>
              <p className="text-sm">
                {item.type == "Question" ? item.body : item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-lg tracking-normal md:text-xl lg:text-xl">
        My Liked Opportunities
      </h2>
      <div className="flex flex-row flex-wrap gap-3">
        {likedActivities.map((item: any, index: number) => (
          <Card key={index}>
            <h3 className="text-lg tracking-tight md:text-lg lg:text-lg">
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
      {!user.firstName && (
        <div>
          <h2>Almost there!</h2>
        </div>
      )}
    </main>
  );
}
