import React from "react";
import styles from "./page.module.css";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Tag from "@/components/Tag";
import Link from "next/link";

import interestList from "@/lib/interests.json";
import postList from "@/lib/allPosts.json";
import { username } from "@/lib/userData";

export default function Marketplace() {
  return (
    <main className="flex flex-col gap-5 px-1/6 md:px-[10vw] lg:px-[10vw]">
      <div className="flex gap-5">
        <img className="h-20 w-20" src="/graphics/admissions-advice.png" />

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl">Marketplace</h1>
          <p>Get your questions answered by peers and admissions experts</p>
        </div>
      </div>

      <section className={`${styles["forum__content__container"]}`}>
        <div className="flex flex-col gap-5 cursor-pointer">
          {postList.map((item, index) => (
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
                  @{item.username} • {item.date}{" "}
                  <Tag type="tag">{item.type}</Tag>{" "}
                </span>
                <h2 className="font-semibold text-base md:text-lg lg:text-xl">
                  {item.title}
                </h2>
                <p className="text-xs md:text-sm lg:text-sm">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <aside className="flex flex-col gap-5">
          <h2 className="text-lg md:text-xl lg:text-xl tracking-normal">
            Create Post
          </h2>
          <Card>
            <Link
              href="/marketplace/share"
              className="flex flex-row gap-2 items-center"
            >
              <div className="bg-[var(--clr-blue-300)] rounded-full p-4 cursor-pointer flex flex-col items-center">
                <Icon icon="pencil-edit" fillColor="#3981F6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base md:text-base lg:text-lg tracking-normal">
                  @{username}
                </h3>
                <p>Submit a post to share an activity.</p>
              </div>
            </Link>
          </Card>
          <h2 className="text-lg md:text-xl lg:text-xl tracking-normal">
            Topics
          </h2>
          <Card>
            <div className="flex flex-wrap gap-2">
              {interestList.map((item, index) => (
                <Tag key={index} type="tag">
                  {item.name}
                </Tag>
              ))}
            </div>
          </Card>
          <h2 className="text-lg md:text-xl lg:text-xl tracking-normal">
            Contributions
          </h2>
          <Card>
            <span className="flex items-center gap-1">
              <Icon icon="notification-bell" fillColor="#0ABA69" />
              <p>
                <b>10</b> activities
              </p>
            </span>

            <span className="flex items-center gap-1">
              <Icon icon="arrow-up" fillColor="#0ABA69" />
              <p>
                <b>102</b> upvotes received
              </p>
            </span>
          </Card>
          <h2></h2>
        </aside>
      </section>
    </main>
  );
}
