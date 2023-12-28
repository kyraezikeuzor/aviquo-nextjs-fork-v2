"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Tag from "@/components/Tag";
import SearchBar from "@/components/SearchBar";
import Card from "@/components/Card";

export default function Discover({user}: {user: any}) {
  const [searchText, setSearchText] = useState("");
  const [ecItems, setEcItems] = useState<Record<number | string, any>>({});
  const [searchDataFiltered, setSearchDataFiltered] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raw_response = await axios.get(`/api/ecs`);
        const response = raw_response.data;

        setEcItems((prevState) => ({
          ...prevState,
          ...response,
        }));

        setSearchDataFiltered(Object.values(response));
      }catch (error) {
        console.error('Error fetching data: ', error);
      };
    }

    fetchData();
  }, []); 
  
  

  return (
    <main className="flex flex-col gap-5 px-1/6 md:px-1/6 lg:px-1/6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl">Discover</h1>
        <p>Discover new opportunities and activities.</p>
        <SearchBar placeholder="Search" searchFunction={setSearchText} />
      </div>

      <div className="flex flex-row flex-wrap gap-3">
        {searchDataFiltered.map((item: any, index: number) => (
          <Card key={index}>
            <h2 className="text-base md:text-lg lg:text-xl">{item.name}</h2>
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