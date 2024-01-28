//replace the phrase 'every' with the phrase 'some' for all filter functions to rever to Linkedin style filtering

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import Tag from "@/components/Tag";

import { motion, useScroll } from "framer-motion"

import { StarRating } from "@/components/ReviewComponent";

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
  Card, 
  CardHeader, 
  CardBody,
  CardFooter
} from "@nextui-org/react";

import { FaHeart, FaHome } from "react-icons/fa";

import { SearchIcon } from "@/public/SearchIcon";

import { extractFilters, formatRelativeTime } from "@/utils";

import AnimatedHeart from "@/components/Heart";

import { Suspense } from "react";

import Loading from "@/components/Loading";

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
    console.log('clicked')
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

  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
        <div className="scrollbar-hide flex flex-col gap-5 !pl-[6%] !pr-[6%] w-[80%] overflow-y-auto h-max-screen pt-[2%]">
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
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ 
                  opacity: [0.25, 0.4, 0.6, 0.8, 1],
                  scale: [0.5, 1.1, 1],
                  // rotate: [0, 360],
                }}
                transition={{
                   duration: 1.3,
                   ease: "easeInOut" 
                }}
                onClick={(e) => handleClick(e, item)}
                key={index}
              >
              <Card
                key={index}
                className="max-w-full duration-300 transition-[transition_box-shadow] hover:scale-105 hover:cursor-pointer w-[fit-content]"
              >
                <CardHeader className="flex flex-row items-center w-full mt-[-5.0%] mb-[-5.0%] mr-[-5.0%]">
                    <h2 className="flex-grow text-base md:text-lg lg:text-xl text-center">
                      {item.name}
                    </h2>
                    <AnimatedHeart
                      className="self-end justify-self-end animated-heart-section"
                      likeTrigger={(e, a) => handleLike(e, a)}
                      oppId={item.id}
                      liked={likedActivites.includes(item.id)}
                    />
                </CardHeader>
              <CardBody>
                  <div className="flex flex-wrap pt-[5%] pb-[2.5%] gap-1">
                    <Tag type="pink">📖 STEM</Tag>
                    <Tag type="orange">
                      ⏰ {formatRelativeTime(item.deadline, true)}
                    </Tag>
                  </div>
                </CardBody>
              </Card>
              </motion.div>
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{
          base: '!h-full !w-[80vw] !max-w-[100vw] !mr-0 !mt-0',
          wrapper: 'overflow-hidden justify-end !pr-0 !mr-0'
        }}
        motionProps={{
          variants : {
            enter: {
              x: 0,
              opacity: 1,
              transition: {
                duration: 1.5,
                ease: "easeOut",
              },
            }, 
            exit: {
              x: 500,
              opacity: 0,
              transition: {
                duration: 1.5,
                ease: "easeIn",
              },
            }
          }
        }}
        backdrop="blur"
        scrollBehavior="outside"
        >
          <ModalContent>
            {(onClose) => (
              <>
              <ModalHeader className='flex flex-col align-items mx-[1%]'>
                <p className='text-center md:text-2xl lg:text-3xl pt-[6%] pb-[4%] border-r border-l border-t border-indigo-600'>{modalItem.name}</p>
                <div className="flex flex-row w-full border border-indigo-600">
                  <div className='w-1/2 text-center border-r border-indigo-600 py-[2%]'>Deadline!!</div>
                  <div className='w-1/2 text-center py-[2%]'>Grades!!</div>
                </div>
                <div className="flex flex-row w-full border-r border-l border-b border-indigo-600">
                  <div className='w-1/2 text-center border-r border-indigo-600 py-[2%]'>Deadline!!</div>
                  <div className='w-1/2 text-center py-[2%]'>Grades!!</div>
                </div>
              </ModalHeader>
                <ModalBody className='flex flex-col mx-[1%]'>
                <div className="w-full">
                {modalItem.description}
                </div>
                <p className='text-center md:text-2xl lg:text-3xl pt-[3%] pb-[3%]'>
                Reviews
                </p>
                 <StarRating callback={(e) => console.log(e)} />
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
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
