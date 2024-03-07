'use client'
import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Experience from './components/Experience'
import SearchBar from '@/app/(external)/database/components/SearchBar'
import Button from '@/components/Button'
import Icon from '@/components/Icon'

import { extractFilters, formatRelativeTime } from "@/utils";

import {
    Input,
    Divider,
    Select,
    SelectItem,
    Chip,
    SelectedItems,
    Avatar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    useDisclosure,
    Selection,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Navbar,
    NavbarContent,
    NavbarItem,
    Textarea,
  } from "@nextui-org/react";


export default function Database() {
    // LOAD ECS FUNCTIONALITY
    const [ecs, setEcs] = useState<Array<Record<number | string, any>>>(
        []
    );

    useEffect(() => {
        const fetchData = async () => {
          try {
            const raw_response = await axios.get(`/api/ecs`);
            let response = raw_response.data;
            response = Object.values(response).filter(
              (value: any) => formatRelativeTime(value.deadline, true) != false
            );
            
            setEcs(response);
            setSearchDataFiltered(response);

          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        };
    
        fetchData();
      }, []);


     // FILTER FUNCTIONALITY
     const [searchText, setSearchText] = useState("");
     const [searchDataFiltered, setSearchDataFiltered] = useState<any>([]);
 
     const [searchFilters, setSearchFilters] = useState<Record<string, any>>({
         Type: new Set(),
         Location: new Set(),
         Deadline: new Set(),
         Grade: new Set(),
         Subject: new Set(),
     });
 
     const [searchQuery, setSearchQuery] = useState('')
     const searchResults = [];
     

     useEffect(() => {
        for (let i = 0; i < ecs.length; i++) {
            if (searchQuery && ecs[i].Name.toLowerCase().includes(searchQuery.toLowerCase())) {
                searchResults.push(ecs[i])
            }
        }

        setSearchDataFiltered(searchResults)
        
      }, []);

      const [chunkedSearchDataFiltered, setChunkedSearchDataFiltered] = useState<any>([]);
  
  
    useEffect(() => {
      const chunkSize = 3;
  
      const chunkedData = [];
  
      for (let i = 0; i < searchDataFiltered.length; i += chunkSize) {
        chunkedData.push(searchDataFiltered.slice(i, i + chunkSize));
      }
  
      console.log(chunkedData);
  
      setChunkedSearchDataFiltered(chunkedData);
    }, [searchDataFiltered]);
  
      
  const filterData = (s: any, sc: string) => {
    setSearchFilters((prev) => ({
      ...prev,
      [sc]: s,
    }));
  };

  useEffect(() => {
    var filtered_data = ecs;

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



    // MODAL FUNCTIONALITY
    const [modalItem, setModalItem] = useState<any | null | undefined>();
    const [currId, setCurrentId] = useState<string | null>(null);

    const handleClick = (event: any, item: any, id: string) => {
    setCurrentId(id);

    if (
        !(event.target.classList.length == 0)
    ) {
        setModalItem(item);
    }
    };

    // OPEN FILTER MODAL 
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const handleFilterModalState = () => {
        setOpenFilterModal(!openFilterModal);
        
    }


    // LIKE FUNCTIONALITY
    const [showLiked, setShowLiked] = useState(false);

    const getLikedActivities = () => {
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

    const [likedActivites, setLikedActivites] =
      useState<string[]>(getLikedActivities());
  

    useEffect(() => {
        saveLikedActivities();
      }, [likedActivites]);

      useEffect(() => {
        if (showLiked) {
          const likedEcs = ecs.filter((obj: any) =>
            likedActivites.includes(obj.id)
          );
          setSearchDataFiltered(likedEcs);
        } else {
          setSearchDataFiltered(ecs);
        }
      }, [showLiked, likedActivites]);
    
      const handleLike: (e: boolean, a: string) => void = (
        state: boolean,
        oppId: string
      ) => {
        
        if (state) {
          setLikedActivites([...likedActivites, oppId]);
        } else {
          setLikedActivites(likedActivites.filter((id) => id !== oppId));
        }
      };

    return (
        <main className='min-h-[100vh] py-[8vh] px-[5vw] flex flex-col items-center gap-4'>
            <header className='flex flex-col gap-2 w-full justify-items-center'>
                <h1 className='text-center text-5xl md:text-6xl lg:text-7xl font-semibold'>Discover</h1>
                <p></p>
                
                <div className='flex flex-row justify-items-center gap-2 w-full'>
                    <span onClick={handleFilterModalState} className='relative flex flex-row gap-1 items-center border border-[--clr-base-accent] rounded-3xl text-sm px-4 py-2 font-medium'>
                        <span>Filter</span>
                        <Icon  icon="ChevronBottom"/>
                        
                        {/*FILTER MODAL*/}
                        {openFilterModal && 
                        <div className='absolute top-10 px-4 py-2 shadow-lg bg-[--clr-base] border border-[--clr-base-accent] w-60 flex flex-col gap-4 text-sm rounded-xl'>
                                <div className="flex flex-col ">
                                    <FilterBox
                                        values={extractFilters(ecs, "type")}
                                        sector={"Type"}
                                        callback={filterData}
                                    ></FilterBox>
                                    
                                    <FilterBox
                                        values={extractFilters(ecs, "location")}
                                        sector={"Location"}
                                        callback={filterData}
                                    ></FilterBox>
                                    
                                    <FilterBox
                                        values={extractFilters(ecs, "education")}
                                        sector={"Grade"}
                                        callback={filterData}
                                    ></FilterBox>
                                    
                                    <FilterBox
                                        values={["N/A"]}
                                        sector={"Deadline"}
                                        callback={filterData}
                                    ></FilterBox>
                                    
                                    <FilterBox
                                        values={extractFilters(ecs, "subjects")}
                                        sector={"Subject"}
                                        callback={filterData}
                                    ></FilterBox>
                                    
                                    </div>
                        </div>}
                    </span>
                    {/*SEARCH BAR*/}
                    <div className='w-full relative'>
                        <span className='w-full flex flex-row items-center gap-2 border border-[--clr-base-accent]  px-8 py-2 rounded-3xl'>
                            <input onChange={(e) => setSearchQuery(e.target.value)} className='w-full focus:outline-none focus:border-none border-transparent bg-transparent text-base placeholder:text-sm placeholder:text-[--clr-grey-dark]' type='text' placeholder={`Search for opportunities, activities, & more`}/>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929L20.2929 21.7071L14.9056 16.3199C13.551 17.3729 11.8487 18 10 18ZM16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z" fill=""/>
                            </svg>
                        </span>
                    </div>
                </div>
                
            </header>
            

            <section className='flex flex-col md:grid md:grid-cols-3 gap-5 bg-[--clr-base-default]'>
                {searchDataFiltered.map((item,index)=>(
                    <Experience 
                        id={index}
                        item={item}
                        clickCallback={handleClick}
                        likeCallback={handleLike}
                    
                    />
                ))}
            </section>
        </main>
    )
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
  