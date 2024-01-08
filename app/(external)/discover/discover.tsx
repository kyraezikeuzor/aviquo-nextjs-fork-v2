"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import Tag from "@/components/Tag";
import SearchBar from "@/components/SearchBar";
import Card from "@/components/Card";
import {
  Divider,
  Select,
  SelectItem,
  Chip,
  SelectedItems,
  Avatar,
  useDisclosure,
  Selection,
  Button,
  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter
} from "@nextui-org/react";

import { formatRelativeTime } from "@/utils";

import AnimatedHeart from "@/components/Heart";

export default function Discover({ user }: { user: any }) {
  const [searchText, setSearchText] = useState("");
  // const [ecItems, setEcItems] = useState<Record<number | string, any>>({});
  const [ecItems, setEcItems] = useState<Array<Record<number | string, any>>>([]);
  const [searchFilters, setSearchFilters] = useState<Record<string, any>>({
    Type: new Set(),
    Location: new Set(),
    Deadline: new Set(),
    Grade: new Set(),
    Subject: new Set(),
  });

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [searchDataFiltered, setSearchDataFiltered] = useState<any>([]);
  const [opps, setOpps] = useState<object>(user.opportunities);

  const handleLike = (state: boolean, oppId: string) => {
    // const currentOpp = ecItems.find((obj: any) => obj.id === oppId);
    // let likes = currentOpp!.users;
    let url;

    if(state) {
      url = 'add';
    } else {
      url = 'remove'
    }
    

    const update = axios.put(`/api/like/${url}`, {
      id: oppId,
      userId: user.userId
    })
  }



  const oppToUser = (opp:any) => {
    if (opp.users.some((obj: any) => obj.id === user.userId)) {
      return {
        ...opp,
        isMine: true,
      }
    } else {
      return {
        ...opp,
        isMine: false
      }
    }
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raw_response = await axios.get(`/api/ecs`);
        let response = raw_response.data
        response = Object.values(response);
        response = response.map(oppToUser)

        setEcItems(response);
        setSearchDataFiltered(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const filterData = (s: any, sc: string) => {
    console.log({
      ...searchFilters,
      [sc]: s,
    });
    setSearchFilters((prev) => ({
      ...prev,
      [sc]: s,
    }));
  };

  useEffect(() => {

    var filtered_data = ecItems;

    if (searchFilters["Type"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) =>
        searchFilters["Type"].has(item.type)
      );
    }

    if (searchFilters["Location"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) =>
        searchFilters["Location"].has(item.location)
      );
    }

    if (searchFilters["Grade"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) =>
        searchFilters["Grade"].has(item.education)
      );
    }

    if (searchFilters["Subject"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) =>
        searchFilters["Subject"].has(item.subjects)
      );
    }

    if (searchFilters["Deadline"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) =>
        searchFilters["Deadline"].has(item.deadline)
      );
    }

    setSearchDataFiltered(filtered_data);
  }, [searchFilters]);

  const [modalItem, setModalItem] = useState<any | null | undefined>();

  return (
    <div className="flex flex-row w-full h-full">
      <div className="scrollbar-hide flex flex-col gap-5 !pl-[12.5%] !pr-[12.5%] w-[80%] overflow-y-auto h-max-screen">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl">Discover</h1>
          <p>Discover new opportunities and activities.</p>
          <SearchBar placeholder="Search" searchFunction={setSearchText} />
        </div>

        <div className="flex flex-row flex-wrap gap-3">
          {searchDataFiltered.map((item: any, index: number) => (
            <Card key={index}>
              <div className='flex flex-row items-center w-full'>
                <h2 className="text-base flex-grow md:text-lg lg:text-xl">{item.name}</h2>
                <AnimatedHeart className="self-end justify-self-end" likeTrigger={(e, a) => handleLike(e, a)} oppId={item.id} liked={item.isMine} />
              </div>
              <p className="text-sm">{item.description}</p>
              <div className="flex flex-wrap">
                <Tag type="pink">💼 {item.type}</Tag>
                <Tag type="pink">🌍 {item.location}</Tag>
                <Tag type="green">🎓 {item.education}</Tag>
                <Tag type="orange">⏰ {formatRelativeTime(item.deadline, true)}</Tag>
                <Tag type="tag">📖 {item.subjects}</Tag>
              </div>
              <div className="flex flex-row items-center w-full justify-center">
                <Button onPress={() => {
                  setModalItem(item)
                  onOpen()
                }}>More Info</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-[20%] rounded-md shadow-lg p-6 mb-6 bg-[#FAEAEC] bg-opacity-40 rounded-md px-[2.5%] !mr-[5%] h-fit ">
        <FilterBox
          values={["Activity", "Internship"]}
          sector={"Type"}
          callback={filterData}
        ></FilterBox>
        <Divider />
        <FilterBox
          values={["Global", "America"]}
          sector={"Location"}
          callback={filterData}
        ></FilterBox>
        <Divider />
        <FilterBox
          values={["College", "11th"]}
          sector={"Grade"}
          callback={filterData}
        ></FilterBox>
        <Divider />
        <FilterBox
          values={["Unknown", "28th December"]}
          sector={"Deadline"}
          callback={filterData}
        ></FilterBox>
        <Divider />
        <FilterBox
          values={["Activitydd", "Internshipdd"]}
          sector={"Subject"}
          callback={filterData}
        ></FilterBox>
        <Divider />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
              <Card >
              <div className='flex flex-row items-center w-full'>
                <h2 className="text-base flex-grow md:text-lg lg:text-xl">{modalItem.name}</h2>
                <AnimatedHeart className="self-end justify-self-end" likeTrigger={(e, a) => handleLike(e, a)} oppId={modalItem.id} liked={modalItem.isMine} />
              </div>
              <p className="text-sm">{modalItem.description}</p>
              <div className="flex flex-wrap">
                <Tag type="pink">💼 {modalItem.type}</Tag>
                <Tag type="pink">🌍 {modalItem.location}</Tag>
                <Tag type="green">🎓 {modalItem.education}</Tag>
                <Tag type="orange">⏰ {formatRelativeTime(modalItem.deadline, true)}</Tag>
                <Tag type="tag">📖 {modalItem.subjects}</Tag>
              </div>
              <div className="flex flex-row items-center w-full justify-center">
                <Button onPress={onOpen}>More Info</Button>
              </div>
            </Card>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

type Filter = {
  value: string;
};

type FilterProps = {
  values: string[];
  sector: string;
  callback: (o: Selection, sc: string) => void;
};

const FilterBox: React.FC<FilterProps> = ({ values, sector, callback }) => {
  const types = values.map((val) => ({ value: val }));
  const [options, setOptions] = useState<Selection>(new Set([]));

  useEffect(() => {
    callback(options, sector);
  }, [options]);

  return (
    <div className="flex flex-col pb-[2.5%] pt-[2.5%]">
      {/* <div className="self-center pb-[2.5%]">Filter By Type</div>
      <Divider /> */}
      <Select
        items={types}
        label={`Filter By ${sector}`}
        variant="bordered"
        isMultiline={true}
        selectionMode="multiple"
        placeholder={`Choose Filters`}
        labelPlacement="outside"
        selectedKeys={options}
        onSelectionChange={setOptions}
        classNames={{
          base: "max-w-xs",
          trigger: "min-h-unit-12 py-2",
          label: "!mb-0 self-center text-md font-bold",
        }}
        renderValue={(items: SelectedItems<Filter>) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item.key}>{item.data!.value}</Chip>
              ))}
            </div>
          );
        }}
      >
        {(user) => (
          <SelectItem key={user.value} textValue={user.value}>
            {user.value}
          </SelectItem>
        )}
      </Select>
    </div>
  );
};
