//replace the phrase 'every' with the phrase 'some' for all filter functions to rever to Linkedin style filtering

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import Tag from "@/components/Tag";
import SearchBar from "@/components/SearchBar";
import Card from "@/components/Card";
import {
  Input,
  Divider,
  Select,
  SelectItem,
  Chip,
  SelectedItems,
  Avatar,
  useDisclosure,
  Selection,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

import { FaHeart, FaHome } from "react-icons/fa";

import { SearchIcon } from "@/public/SearchIcon";

import { extractFilters, formatRelativeTime } from "@/utils";

import AnimatedHeart from "@/components/Heart";

export default function Discover() {
  const [searchText, setSearchText] = useState("");
  // const [ecItems, setEcItems] = useState<Record<number | string, any>>({});
  const [ecItems, setEcItems] = useState<Array<Record<number | string, any>>>(
    []
  );
  const [searchFilters, setSearchFilters] = useState<Record<string, any>>({
    Type: new Set(),
    Location: new Set(),
    Deadline: new Set(),
    Grade: new Set(),
    Subject: new Set(),
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [showLiked, setShowLiked] = useState(false);

  const getLikedActivites = () => {
    if (global?.window !== undefined) {
      const savedValue = localStorage.getItem("liked");
      if (savedValue) {
        return JSON.parse(savedValue);
      } else {
        return [] as string[];
      }
    }
  };

  const saveLikedActivities = () => {
    if (global?.window !== undefined) {
      localStorage.setItem("liked", JSON.stringify(likedActivites));
    }
  };

  const [searchDataFiltered, setSearchDataFiltered] = useState<any>([]);
  // const [opps, setOpps] = useState<object>(user.opportunities);
  const [likedActivites, setLikedActivites] =
    useState<string[]>(getLikedActivites());

  useEffect(() => {
    saveLikedActivities();
  }, [likedActivites]);

  useEffect(() => {
    if (showLiked) {
      const likedEcs = ecItems.filter((obj: any) =>
        likedActivites.includes(obj.id)
      );
      setSearchDataFiltered(likedEcs);
    } else {
      setSearchDataFiltered(ecItems);
    }
  }, [showLiked, likedActivites]);

  const handleLike = (state: boolean, oppId: string) => {
    // const currentOpp = ecItems.find((obj: any) => obj.id === oppId);
    // let likes = currentOpp!.users;
    // let url;

    // if (state) {
    //   url = 'add';
    // } else {
    //   url = 'remove'
    // }

    // const update = axios.put(`/api/like/${url}`, {
    //   id: oppId,
    //   userId: user.userId
    // })
    // console.log(state, oppId)
    if (state) {
      setLikedActivites([...likedActivites, oppId]);
    } else {
      setLikedActivites(likedActivites.filter((id) => id !== oppId));
    }
  };

  // const oppToUser = (opp:any) => {
  //   if (opp.users.every((obj: any) => obj.id === user.userId)) {
  //     return {
  //       ...opp,
  //       isMine: true,
  //     }
  //   } else {
  //     return {
  //       ...opp,
  //       isMine: false
  //     }
  //   }
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raw_response = await axios.get(`/api/ecs`);
        let response = raw_response.data;
        response = Object.values(response).filter(
          (value: any) => formatRelativeTime(value.deadline, true) != false
        );
        // response = response.map(oppToUser)
        // console.log(response.length)
        setEcItems(response);
        setSearchDataFiltered(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const filterData = (s: any, sc: string) => {
    setSearchFilters((prev) => ({
      ...prev,
      [sc]: s,
    }));
  };

  useEffect(() => {
    var filtered_data = ecItems;

    if (searchFilters["Type"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) => {
        // Split item.type into an array of items
        const itemTypes = item.type.split(",").map((type: any) => type.trim());

        // Check if any of the searchFilters["Type"] are part of the itemTypes array
        return Array.from(searchFilters["Type"]).every((filter) =>
          itemTypes.includes(filter)
        );
      });
    }

    if (searchFilters["Location"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) => {
        // Split item.type into an array of items
        const itemTypes = item.location
          .split(",")
          .map((type: any) => type.trim());

        // Check if any of the searchFilters["Type"] are part of the itemTypes array
        return Array.from(searchFilters["Location"]).every((filter) =>
          itemTypes.includes(filter)
        );
      });
    }

    if (searchFilters["Grade"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) => {
        // Split item.type into an array of items
        const itemTypes = item.education
          .split(",")
          .map((type: any) => type.trim());

        // Check if any of the searchFilters["Type"] are part of the itemTypes array
        return Array.from(searchFilters["Grade"]).every((filter) =>
          itemTypes.includes(filter)
        );
      });
    }

    if (searchFilters["Subject"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) => {
        // Split item.type into an array of items
        const itemTypes = item.subjects
          .split(",")
          .map((type: any) => type.trim());

        // Check if any of the searchFilters["Type"] are part of the itemTypes array
        return Array.from(searchFilters["Subject"]).every((filter) =>
          itemTypes.includes(filter)
        );
      });
    }

    if (searchFilters["Deadline"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) =>
        searchFilters["Deadline"].has(item.deadline)
      );
    }

    setSearchDataFiltered(filtered_data);
  }, [searchFilters]);

  const [modalItem, setModalItem] = useState<any | null | undefined>();

  const handleClick = (event: any, item: any) => {
    // console.log('clicked')
    // console.log(event.target.classList)
    if (
      !event.target.classList.contains("go2484888251") &&
      !event.target.classList.contains("go4268192979")
    ) {
      // console.log(event.target.classList)
      // console.log('Clicked on the div, not the AnimatedHeart component');
      setModalItem(item);
      onOpen();
    }
  };

  return (
    <>
      <Navbar
        isBordered
        classNames={{
          base: "bg-gradient-to-r from-violet-500 to-fuchsia-500 drop-shadow-xl",
        }}
      >
        <NavbarContent justify="end">
          <NavbarItem>
            {!showLiked ? (
              <Button
                variant="bordered"
                endContent={<FaHeart />}
                className="text-white"
                onClick={() => {
                  setShowLiked(!showLiked);
                }}
              >
                View My Opportunities
              </Button>
            ) : (
              <Button
                variant="bordered"
                endContent={<FaHome />}
                className="text-white"
                onClick={() => {
                  setShowLiked(!showLiked);
                }}
              >
                View All Opportunities
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="flex flex-row w-full h-full">
        <div className="scrollbar-hide flex flex-col gap-5 !pl-[12.5%] !pr-[12.5%] w-[80%] overflow-y-auto h-max-screen pt-[2%]">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-theme-text-more-dark md:text-4xl lg:text-5xl">
              {showLiked ? "My Opportunities" : "Discover"}
            </h1>
            <p className="text-theme-text-dark-dimmed">
              {showLiked
                ? "View your liked opportunities."
                : "Discover new opportunities and activities."}
            </p>

            <Input
              isClearable
              radius="lg"
              classNames={{
                label: "text-theme-text-dark/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-theme-text-dark/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-xl",
                  "bg-default-200/60",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "group-data-[focused=true]:bg-default-200/50",
                  "dark:group-data-[focused=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder="Type to search..."
              value={searchText}
              onValueChange={setSearchText}
              startContent={
                <SearchIcon className="text-theme-text-dark/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>

          <div className="flex flex-row flex-wrap max-w-full gap-3">
            {searchDataFiltered.map((item: any, index: number) => (
              <Card
                key={index}
                className="max-w-full duration-300 transition-transition hover:scale-105 hover:cursor-pointer"
              >
                <div onClick={(e) => handleClick(e, item)}>
                  <div className="flex flex-row items-center w-full pt-[-2.5%]">
                    <h2 className="flex-grow text-base md:text-lg lg:text-xl">
                      {item.name}
                    </h2>
                    <AnimatedHeart
                      className="self-end justify-self-end animated-heart-section"
                      likeTrigger={(e, a) => handleLike(e, a)}
                      oppId={item.id}
                      liked={likedActivites.includes(item.id)}
                    />
                  </div>
                  <p className="text-sm">{item.description}</p>
                  <div className="flex flex-wrap pt-[5%] pb-[2.5%] gap-1">
                    <Tag type="pink">💼 {item.type}</Tag>
                    <Tag type="pink">🌍 {item.location}</Tag>
                    <Tag type="green">🎓 {item.education}</Tag>
                    <Tag type="orange">
                      ⏰ {formatRelativeTime(item.deadline, true)}
                    </Tag>
                    <Tag
                      type="tag"
                      className="!w-fit-content !max-w-full !flex !items-start !justify-start !flex-wrap !whitespace-normal"
                    >
                      📖 {item.subjects}
                    </Tag>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-[20%] drop-shadow-lg p-6 mb-6 bg-white rounded-xl px-[2.5%] !mr-[5%] h-fit !mt-[2.5%]">
          <FilterBox
            values={extractFilters(ecItems, "type")}
            sector={"Type"}
            callback={filterData}
          ></FilterBox>
          <Divider />
          <FilterBox
            values={extractFilters(ecItems, "location")}
            sector={"Location"}
            callback={filterData}
          ></FilterBox>
          <Divider />
          <FilterBox
            values={extractFilters(ecItems, "education")}
            sector={"Grade"}
            callback={filterData}
          ></FilterBox>
          <Divider />
          <FilterBox
            values={["N/A"]}
            sector={"Deadline"}
            callback={filterData}
          ></FilterBox>
          <Divider />
          <FilterBox
            values={extractFilters(ecItems, "subjects")}
            sector={"Subject"}
            callback={filterData}
          ></FilterBox>
          <Divider />
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <div className="bg-white relative px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col gap-y-4 font-outfit select-none w-[96%]">
                    <div className="flex flex-col gap-y-1">
                      <div className="flex items-center justify-between">
                        <h1 className="w-11/12 text-4xl font-semibold">
                          {modalItem.name}
                        </h1>
                        <div className="flex gap-x-1">
                          <AnimatedHeart
                            className="self-end justify-self-end animated-heart-section"
                            likeTrigger={(e, a) => handleLike(e, a)}
                            oppId={modalItem.id}
                            liked={likedActivites.includes(modalItem.id)}
                          />
                        </div>
                      </div>
                      {/* <h3 className="text-gray-500">
                      Extracurricular Activity
                    </h3>
                  </div> */}
                    </div>
                    <div className="flex flex-col w-full gap-x-4 gap-y-8 lg:flex-row">
                      <div className="flex flex-col flex-wrap justify-around w-full gap-4 lg:w-1/2 md:flex-row h-max lg:flex-col">
                        <div className="flex flex-col gap-y-1">
                          <h3 className="text-lg text-slate-500">
                            Extracurricular Open To:
                          </h3>
                          <div className="flex flex-col gap-x-3 gap-y-2 lg:flex-row">
                            <div className="px-2 py-1 text-sm text-teal-700 bg-teal-100 rounded-md w-max">
                              {modalItem.education}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <h3 className="text-lg text-slate-500">
                            Location Requirements:
                          </h3>
                          <div className="flex flex-col gap-x-3 gap-y-2 lg:flex-row">
                            <div className="px-2 py-1 text-sm rounded-md bg-sky-100 text-sky-700 w-max">
                              {modalItem.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <h3 className="text-lg text-slate-500">Category:</h3>
                          <div className="flex flex-col gap-x-3 gap-y-2 lg:flex-row">
                            {modalItem.type
                              .split(",")
                              .map((subject: string, index: number) => (
                                <div
                                  key={index}
                                  className="px-2 py-1 text-sm text-indigo-700 bg-indigo-100 rounded-md w-max"
                                >
                                  {subject.trim()}{" "}
                                  {/* Use trim() to remove any leading or trailing spaces */}
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col flex-wrap justify-between w-full gap-4 lg:w-1/2 md:flex-row lg:flex-col gap-y-6 lg:gap-y-4">
                        <div className="flex flex-col gap-y-1">
                          <h3 className="text-lg text-slate-500">
                            Preferred Skill Level(s):
                          </h3>
                          <div className="flex flex-col gap-x-3 gap-y-2 lg:flex-row">
                            <div className="px-2 py-1 text-sm text-green-700 bg-green-100 rounded-md w-max">
                              All Skill Levels
                            </div>
                            <div className="px-2 py-1 text-sm text-green-700 bg-green-100 rounded-md w-max">
                              Beginner Friendly
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <h3 className="text-lg text-slate-500">
                            Activity Commitment:
                          </h3>
                          <div className="flex gap-x-3">
                            <div className="px-2 py-1 text-sm text-orange-700 bg-orange-100 rounded-md w-max">
                              {modalItem.duration}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-y-1">
                          <h3 className="text-lg text-slate-500">
                            Activity Subjects:
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {modalItem.subjects
                              .split(",")
                              .map((subject: string, index: number) => (
                                <div
                                  key={index}
                                  className="px-2 py-1 text-sm text-indigo-700 bg-indigo-100 rounded-md w-max"
                                >
                                  {subject.trim()}{" "}
                                  {/* Use trim() to remove any leading or trailing spaces */}
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center py-8 font-thin gap-x-4 h-max font-outfit tracking-loose text-slate-500 leading-1">
                      <img
                        alt="Image of Key Club"
                        className="hidden w-1/6 lg:block"
                        src={
                          modalItem.imageUrl ||
                          "https://raw.githubusercontent.com/BRama10/aviquo_dev/b18f426149adff2de1437a7af596830b45cf3681/public/Opp%20Placeholder.png"
                        }
                      />
                      <div className="w-full lg:w-5/6">
                        <h1 className="block text-xl font-bold tracking-tight underline text-slate-700 font-manrope">
                          Description:
                        </h1>
                        <p className="font-[650]">{modalItem.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center px-4 py-3 bg-gray-50 gap-x-2 sm:px-6">
                    <a
                      className="inline-flex justify-center w-full px-3 py-2 text-base font-medium text-white transition duration-300 transform bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      href={modalItem.url}
                      target="_blank"
                    >
                      Visit Site
                    </a>
                    {/* <Button
                          className="inline-flex justify-center w-full px-3 py-2 text-base font-medium text-gray-900 transition duration-300 transform bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          type="button"
                          onPress={onClose}
                        >
                          Go Back
                        </Button> */}
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
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
