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
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Navbar, NavbarBrand, NavbarContent, NavbarItem, 
  Link,
} from "@nextui-org/react";

import { FaHeart } from "react-icons/fa";

import { SearchIcon } from '@/public/SearchIcon'

import { extractFilters, formatRelativeTime } from "@/utils";

import AnimatedHeart from "@/components/Heart";

export default function Discover() {
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [showLiked, setShowLiked] = useState(false);


  const getLikedActivites = () => {
    if (global?.window !== undefined) {

      const savedValue = localStorage.getItem('liked');
      if (savedValue) {
        return JSON.parse(savedValue);
      } else {
        return [] as string[];
      }
    }
  }

  const saveLikedActivities = () => {
    if (global?.window !== undefined) {
      localStorage.setItem('liked', JSON.stringify(likedActivites));
    }
  }

  const [searchDataFiltered, setSearchDataFiltered] = useState<any>([]);
  // const [opps, setOpps] = useState<object>(user.opportunities);
  const [likedActivites, setLikedActivites] = useState<string[]>(getLikedActivites());

  useEffect(() => {
    console.log(likedActivites)
    saveLikedActivities();
  }, [likedActivites])

  useEffect(() => {
    if (showLiked) {
      const likedEcs = ecItems.filter(obj => likedActivites.includes(obj.id));
      setSearchDataFiltered(likedEcs)
    } else {
      setSearchDataFiltered(ecItems)
    }
  }, [showLiked])


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
    if (state) {
      setLikedActivites([...likedActivites, oppId])
    } else {
      setLikedActivites(likedActivites.filter(id => id !== oppId));
    }
  }

  // const oppToUser = (opp:any) => {
  //   if (opp.users.some((obj: any) => obj.id === user.userId)) {
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
        let response = raw_response.data
        response = Object.values(response).filter((value: any) => formatRelativeTime(value.deadline, true) != false);
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
    if (searchText.length >= 2) {

      // console.log(searchText)

      let filtered_data = ecItems;
      // console.log(filtered_data)
      filtered_data = filtered_data.filter(obj =>
        obj.name.toLowerCase().trim().includes(searchText) || obj.description.toLowerCase().trim().includes(searchText)
      );

      setSearchDataFiltered(filtered_data);
    }
  }, [searchText])

  useEffect(() => {

    var filtered_data = ecItems;

    if (searchFilters["Type"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) => {
        // Split item.type into an array of items
        const itemTypes = item.type.split(',').map((type: any) => type.trim());
    
        // Check if any of the searchFilters["Type"] are part of the itemTypes array
        return Array.from(searchFilters["Type"]).some(filter => itemTypes.includes(filter));
      });
    }

    if (searchFilters["Location"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) => {
        // Split item.type into an array of items
        const itemTypes = item.location.split(',').map((type: any) => type.trim());
    
        // Check if any of the searchFilters["Type"] are part of the itemTypes array
        return Array.from(searchFilters["Location"]).some(filter => itemTypes.includes(filter));
      });
    }

    if (searchFilters["Grade"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) => {
        // Split item.type into an array of items
        const itemTypes = item.education.split(',').map((type: any) => type.trim());
    
        // Check if any of the searchFilters["Type"] are part of the itemTypes array
        return Array.from(searchFilters["Grade"]).some(filter => itemTypes.includes(filter));
      });
    }

    if (searchFilters["Subject"].size !== 0) {
      filtered_data = filtered_data.filter((item: any) => {
        // Split item.type into an array of items
        const itemTypes = item.subjects.split(',').map((type: any) => type.trim());
    
        // Check if any of the searchFilters["Type"] are part of the itemTypes array
        return Array.from(searchFilters["Subject"]).some(filter => itemTypes.includes(filter));
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
    if (!event.target.classList.contains('go2484888251') && !event.target.classList.contains('go4268192979')) {
      // console.log(event.target.classList)
      // console.log('Clicked on the div, not the AnimatedHeart component');
      setModalItem(item)
      onOpen()
    }
  };

  return (
    <>
    <Navbar isBordered classNames={{
      base: 'bg-transparent'
    }}>
   
    <NavbarContent justify="end">
      <NavbarItem>
        <Button as={Link} href="#" variant="bordered" endContent={<FaHeart/>} className="text-white" onClick={() => {
          setShowLiked(!showLiked)
        }}>
          View Liked Opportunities
        </Button>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
    <div className="flex flex-row w-full h-full">
      <div className="scrollbar-hide flex flex-col gap-5 !pl-[12.5%] !pr-[12.5%] w-[80%] overflow-y-auto h-max-screen">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-white">Discover</h1>
          <p className='text-white'>Discover new opportunities and activities.</p>
          <Input
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            value={searchText}
            onValueChange={setSearchText}
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>

        <div className="flex flex-row flex-wrap gap-3 max-w-full">
          {searchDataFiltered.map((item: any, index: number) => (
            <Card key={index} className="transition-transform hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-5000 hover:scale-105 hover:cursor-pointer max-w-full">
              <div onClick={(e) => handleClick(e, item)}>
                <div className='flex flex-row items-center w-full mt-[-2.5%] '>
                  <h2 className="text-base flex-grow md:text-lg lg:text-xl">{item.name}</h2>
                  <AnimatedHeart className="self-end justify-self-end animated-heart-section" likeTrigger={(e, a) => handleLike(e, a)} oppId={item.id} liked={likedActivites.includes(item.id)} />
                </div>
                <p className="text-sm">{item.description}</p>
                <div className="flex flex-wrap pt-[5%]">
                  <Tag type="pink">💼 {item.type}</Tag>
                  <Tag type="pink">🌍 {item.location}</Tag>
                  <Tag type="green">🎓 {item.education}</Tag>
                  <Tag type="orange">⏰ {formatRelativeTime(item.deadline, true)}</Tag>
                  <Tag type="tag">📖 {item.subjects}</Tag>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-[20%] rounded-md shadow-lg p-6 mb-6 bg-[#FAEAEC] bg-opacity-40 rounded-md px-[2.5%] !mr-[5%] h-fit ">
        <FilterBox
          values={extractFilters(ecItems, 'type')}
          sector={"Type"}
          callback={filterData}
        ></FilterBox>
        <Divider />
        <FilterBox
          values={extractFilters(ecItems, 'location')}
          sector={"Location"}
          callback={filterData}
        ></FilterBox>
        <Divider />
        <FilterBox
          values={extractFilters(ecItems, 'education')}
          sector={"Grade"}
          callback={filterData}
        ></FilterBox>
        <Divider />
        <FilterBox
          values={['N/A']}
          sector={"Deadline"}
          callback={filterData}
        ></FilterBox>
        <Divider />
        <FilterBox
          values={extractFilters(ecItems, 'subjects')}
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
                {/* <Card >
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
                </Card> */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity opacity-100">
                </div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-outfit">
                  <div className="flex min-h-full px-2 xl:px-10 items-end justify-center p-4 text-center sm:items-center">
                    <div
                      className="relative transform lg:w-11/12 xl:w-7/12 overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 opacity-100 translate-y-0 sm:scale-100"
                      data-headlessui-state="open" id="headlessui-dialog-panel-:r2:">
                      <div
                        className="bg-white relative px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col gap-y-4 font-outfit select-none">
                        <div className="flex flex-col gap-y-1">
                          <div className="flex justify-between items-center">
                            <h1 className="font-semibold text-4xl w-11/12">
                              Key Club
                            </h1>
                            <div className="flex gap-x-1">
                              <AnimatedHeart className="self-end justify-self-end animated-heart-section" likeTrigger={(e, a) => handleLike(e, a)} oppId={'xd'} liked={false} />
                            </div>
                          </div>
                          {/* <h3 className="text-gray-500">
                      Extracurricular Activity
                    </h3>
                  </div> */}
                        </div>
                        <div className="w-full gap-x-4 gap-y-8 flex flex-col lg:flex-row">
                          <div
                            className="w-full lg:w-1/2 flex flex-col md:flex-row flex-wrap h-max justify-around lg:flex-col gap-4">
                            <div className="flex flex-col gap-y-1">
                              <h3 className="text-slate-500 text-lg">
                                Extracurricular Open To:
                              </h3>
                              <div className="flex gap-x-3 gap-y-2 flex-col lg:flex-row">
                                <div className="bg-teal-100 w-max text-teal-700 text-sm py-1 px-2 rounded-md">
                                  All Grades
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-y-1">
                              <h3 className="text-slate-500 text-lg">
                                Location Requirements:
                              </h3>
                              <div className="flex gap-x-3 gap-y-2 flex-col lg:flex-row">
                                <div className="bg-sky-100 text-sky-700 text-sm py-1 px-2 w-max rounded-md">
                                  Global/Worldwide
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-y-1">
                              <h3 className="text-slate-500 text-lg">
                                Category:
                              </h3>
                              <div className="flex gap-x-3 gap-y-2 flex-col lg:flex-row">
                                <div className="bg-indigo-100 w-max text-indigo-700 text-sm py-1 px-2 rounded-md">
                                  Club
                                </div>
                                <div className="bg-indigo-100 w-max text-indigo-700 text-sm py-1 px-2 rounded-md">
                                  Community Service
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-y-1">
                              <h3 className="text-slate-500 text-lg">
                                Organization Type:
                              </h3>
                              <div className="flex gap-x-3 gap-y-2 flex-col lg:flex-row">
                                <div className="bg-yellow-100 w-max text-yellow-700 text-sm py-1 px-2 rounded-md">
                                  Nonprofit Organization
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="w-full lg:w-1/2 flex flex-col md:flex-row justify-between flex-wrap lg:flex-col gap-4 gap-y-6 lg:gap-y-4">
                            <div className="flex flex-col gap-y-1">
                              <h3 className="text-slate-500 text-lg">
                                Preferred Skill Level(s):
                              </h3>
                              <div className="flex gap-x-3 gap-y-2 flex-col lg:flex-row">
                                <div className="bg-green-100 w-max text-green-700 text-sm py-1 px-2 rounded-md">
                                  All Skill Levels
                                </div>
                                <div className="bg-green-100 w-max text-green-700 text-sm py-1 px-2 rounded-md">
                                  Beginner Friendly
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-y-1">
                              <h3 className="text-slate-500 text-lg">
                                Activity Commitment:
                              </h3>
                              <div className="flex gap-x-3">
                                <div className="bg-orange-100 w-max text-orange-700 text-sm py-1 px-2 rounded-md">
                                  Long-Term
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-y-1">
                              <h3 className="text-slate-500 text-lg">
                                Team/Individual Based
                              </h3>
                              <div className="flex gap-x-3">
                                <div className="bg-fuchsia-100 w-max text-fuchsia-700 text-sm py-1 px-2 rounded-md">
                                  Team-Based
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-y-1">
                              <h3 className="text-slate-500 text-lg">
                                Activity Subjects:
                              </h3>
                              <div className="flex gap-3 flex-wrap">
                                <div className="bg-green-100 w-max text-green-700 text-sm py-1 px-2 rounded-md">
                                  Entrepreneurship
                                </div>
                                <div className="bg-green-100 w-max text-green-700 text-sm py-1 px-2 rounded-md">
                                  Leadership
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="flex gap-x-4 h-max py-8 items-center justify-center font-outfit font-thin tracking-loose text-slate-500 leading-1">
                          <img alt="Image of Key Club" className="hidden lg:block w-1/6"
                            src="https://upload.wikimedia.org/wikipedia/en/b/b4/Keyclub.png" />
                          <div className="w-full lg:w-5/6">
                            <h1 className="text-slate-700 font-manrope font-bold tracking-tight underline block text-xl">
                              Description:
                            </h1>
                            <p>
                              Key Club is a renowned international student-led organization that empowers high school students
                              to serve their communities, develop leadership skills, and make a positive impact through
                              volunteerism and service projects. Key Club chapters operate in schools worldwide, fostering
                              collaboration, compassion, and civic engagement.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 flex items-center justify-center gap-x-2 sm:px-6">
                        <a className="inline-flex w-full justify-center rounded-md transition transform duration-300 bg-blue-600 px-3 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                          href="https://www.keyclub.org/" target="_blank">
                          Visit Site
                        </a>
                        <Button
                          className="inline-flex w-full justify-center rounded-md transition transform duration-300 bg-white px-3 py-2 text-base font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          type="button"
                          onPress={onClose}>
                          Go Back
                        </Button>
                      </div>
                    </div>
                  </div>
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
