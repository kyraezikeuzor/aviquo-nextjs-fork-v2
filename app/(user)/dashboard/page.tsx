import React from "react";
import Card from "@/components/Card";
import styles from "./page.module.css";
import Tag from "@/components/Tag";
import Button from "@/components/Button";

import friendsList from "@/lib/friends.json";
import interestList from "@/lib/interests.json";
import userPosts from "@/lib/userPosts.json";

import Icon from "@/components/Icon";

import { username } from "@/lib/userData";

export default function Dashboard() {
  return (
    <main className={`${styles.main} px-1/6 md:px-[5vw] lg:px-[5vw]`}>
      <section className="flex flex-col px-8 py-4 gap-8">
        <h1 className="text-3xl md:text-4xl lg:text-4xl">
          Welcome back, Soham!
        </h1>

        <div className="flex flex-wrap gap-3">
          {interestList.map((item, index) => (
            <div
              key={index}
              className="flex gap-2 items-center justify-center text-center bg-[#fff] p-2 border-2 border-[var(--clr-grey-300)] rounded-xl"
            >
              <img className="w-6" src={item.img} />
              <p className="text-sm font-medium md:text-sm lg:text-sm">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        <h6>Activity List</h6>
        <div className="flex flex-wrap gap-5">
          <Card>
            <p className="font-semibold text-[var(--fs-400)]">
              Research Science Institute
            </p>
            <p className="text-xs md:text-sm lg:text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              magna mauris, lobortis non dolor non, mattis vulputate nisi.{" "}
            </p>
            <div className="flex flex-wrap gap-2">
              <Tag type="pink">Activity</Tag>
              <Tag type="tag">Global</Tag>
              <Tag type="orange">All Grades</Tag>
            </div>
          </Card>
          <Card>
            <p className="font-semibold text-[var(--fs-400)]">
              Research Science Institute
            </p>
            <p className="text-xs md:text-sm lg:text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              magna mauris, lobortis non dolor non, mattis vulputate nisi.{" "}
            </p>
            <div className="flex flex-wrap gap-2">
              <Tag type="pink">Activity</Tag>
              <Tag type="tag">Global</Tag>
              <Tag type="orange">All Grades</Tag>
            </div>
          </Card>
        </div>

        <h6>Recent Posts</h6>
        <div className="flex flex-col gap-2">
          {userPosts.map((item, index) => (
            <Card key={index}>
              <p className="font-semibold text-[var(--fs-400)]">{item.title}</p>
              <p className="text-xs md:text-sm lg:text-sm">{item.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <aside className="bg-[#fff] h-fit-content rounded-xl px-8 py-8 flex flex-col items-center gap-5 border-2 border-[var(--clr-grey-300)]">
        <img
          className="rounded-full"
          src="https://lh3.googleusercontent.com/a/AAcHTtdyLYM4FwQTKzzM2orCp0ehNswbQ6cQywaFN-fNlCZU9w=s96-c"
        />
        <div className="flex flex-col w-full rounded-lg gap-5">
          <h2 className="text-xl text-center md:text-2xl lg:text-2xl">
            @{username}
          </h2>

          <Card>
            <span className="flex items-center gap-1">
              <Icon icon="notification-bell" fillColor="#0ABA69" />
              <p>
                <b>10</b> answers
              </p>
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="check" fillColor="#0ABA69" />
              <p>
                <b>2</b> most helpful answers
              </p>
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="arrow-up" fillColor="#0ABA69" />
              <p>
                <b>102</b> upvotes received
              </p>
            </span>
          </Card>
        </div>

        <div className="flex flex-col w-full gap-5">
          <h6 className="text-base">Friends</h6>
          <div className="bg-[var(--clr-grey-200)] p-2 rounded-xl">
            {friendsList.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 justify-between border-b-2 border-[var(--clr-grey-300)] p-3"
              >
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-auto rounded-full"
                    src="https://lh3.googleusercontent.com/a/AAcHTtdyLYM4FwQTKzzM2orCp0ehNswbQ6cQywaFN-fNlCZU9w=s96-c"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">{item.name}</p>
                    <p>Friend</p>
                  </div>
                </div>
                <Button type="" style="btn--secondary" size="btn--sm">
                  Following
                </Button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}
