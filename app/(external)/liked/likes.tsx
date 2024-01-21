"use client";

import React, { useState, useEffect } from "react";

import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Tag from "@/components/Tag";

import interestList from "@/lib/interests.json";

import { toDateTimeString } from "@/utils";

export default function Likes() {
  const [forumData, setForumData] = useState<any>([]);
  const [likedActivities, setLikedActivities] = useState<any>([]);

  useEffect(() => {
    // let likedActivities = user.opportunities;
    // let posts = user.posts.map((obj: any) => ({ ...obj, type: "Question" }));
    // let replies = user.comments.map((obj: any) => ({ ...obj, type: "Reply" }));

    // const combined = [...posts, ...replies].sort(
    //   (a: any, b: any) => b.date - a.date
    // );
    // // console.log(likedActivities)
    // setForumData(combined);
    // setLikedActivities(user.opportunities);
    // setSearchDataFiltered(Object.values(response));
    // console.log(response);
  }, []);

  return (
    <main className="m-auto flex flex-col gap-5 !px-1/6 md:!px-[10vw] lg:!px-[10vw]">
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
