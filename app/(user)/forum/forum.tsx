//here for all the actions such as posting, updating, etc

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./page.module.css";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";

export default function Forum({ user }: { user: any }) {
  const [posts, setPosts] = useState<Record<number | string, any>>({});
  const [searchDataFiltered, setSearchDataFiltered] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raw_response = await axios.get(`/api/posts`);
        const response = raw_response.data;

        setPosts((prevState) => ({
          ...prevState,
          ...response,
        }));

        setSearchDataFiltered(Object.values(response));
        // console.log(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col gap-5 px-1/6 md:px-[10vw] lg:px-[10vw]">
      <div className="flex gap-5">
        <img className="w-20 h-20" src="/graphics/admissions-advice.png" />

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl">Forums</h1>
          <p>Get your questions answered by peers and admissions experts</p>
        </div>
      </div>

      <section className={`${styles["forum__content__container"]}`}>
        <div className="flex flex-col gap-5 cursor-pointer">
          {searchDataFiltered.map((item: any, index: number) => (
            <div
              key={index}
              className="border-2 border-[var(--clr-grey-300)] p-4 rounded-xl flex flex-row gap-5 hover:bg-[#FAEAEC] hover:opacity-60"
              onClick={(e) => router.replace(`/forum/${item.id}`)}
            >
              <div className="flex flex-col items-center w-4">
                <Icon icon="arrow-up" fillColor="black" />
                <p className="font-semibold text-[var(--clr-grey-400)]">
                  {item.upvotes.length - item.downvotes.length}
                </p>
                <Icon icon="arrow-down" fillColor="black" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="flex inline-block gap-2 text-xs md:text-sm lg:text-sm">
                  @{item.author.username} • {item.date}{" "}
                </span>
                <h2 className="text-base font-semibold md:text-lg lg:text-xl">
                  {item.title}
                </h2>
                <p className="text-xs md:text-sm lg:text-sm">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <aside className="flex flex-col gap-5">
          <h2 className="text-lg tracking-normal md:text-xl lg:text-xl">
            Create Post
          </h2>
          <Card>
            <Link href="forum/ask" className="flex flex-row items-center gap-2">
              <div className="flex flex-col items-center bg-[var(--clr-blue-300)] rounded-full p-4 cursor-pointer">
                <Icon icon="pencil-edit" fillColor="#3981F6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base tracking-normal md:text-base lg:text-lg">
                  @{user.username}
                </h3>
                <p>Ask for advice or share your thoughts.</p>
              </div>
            </Link>
          </Card>
        </aside>
      </section>
    </main>
  );
}
