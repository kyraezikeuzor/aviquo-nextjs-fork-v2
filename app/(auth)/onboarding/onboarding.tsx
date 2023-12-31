//TODO bug fix regarding router

"use client"

import { Input } from "@nextui-org/react"
import { PutBlobResult, HeadBlobResult } from "@vercel/blob";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { redirect, useRouter } from 'next/navigation';
import { promisify } from 'util';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


function Button({ value, className, onClick, disabled }: { value: any, className: any, onClick: (e: any) => void, disabled: any }) {
    return (
        <button
            type={'button'}
            onClick={(e) => onClick(e)}
            className={disabled ? `${className} mt-6 transition transition-all block py-3 px-4 w-1/4 text-white font-bold rounded-md cursor-pointer bg-slate-700 h-auto` : `${className} mt-6 transition transition-all block py-3 px-4 w-1/4 text-white font-bold rounded-md cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg h-auto`}
            disabled={disabled}
        >
            {value}
        </button>
    )
}

function Onboarding({ user }: { user: any }) {
    const router = useRouter();

    var newBlob;

    const [username, setUsername] = useState(user.username);
    const [pfp, setPfp] = useState<PutBlobResult | HeadBlobResult | null>(null);
    const [name, setName] = useState({
        firstName: user.firstName,
        lastName: user.lastName
    });

    const [stage, setStage] = useState(0);

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (name.firstName == '' || name.lastName == '') {
            console.log('a')
            setStage(0);
        } else if (username == '' || user.pfp == '') {
            setStage(1);
            console.log('b')
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (user.pfp != '') {
                const imageData = await axios.get(`/api/retrieve?filename=${user.pfp}`);
                const image = imageData.data as HeadBlobResult;
                setPfp(image);
                console.log(image)
            } else {
                console.log('here')
                setPfp(null);
            }
        }
        fetchData();
    }, [])

    const handleAvatarButtonClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    const handleLocalAvatarChange = async () => {
        if (inputFileRef.current?.files) {
            const file = inputFileRef.current.files[0];

            if (file) {
                setIsLoading(true)
                const response = await axios.post(`/api/upload?filename=${file.name}`, file);
                newBlob = response.data as PutBlobResult;
                setPfp(newBlob);
                setIsLoading(false);
            }
        }
    }

    const handleUpdateInformation = () => {
        const data = {
            email: user.email,
            username: username,
            pfp: pfp ? pfp.url : '',
            firstName: name.firstName,
            lastName: name.lastName,
        }

        axios.put('/api/user', { ...data })
        .then((res) => {
            console.log(res);
            location.reload()
        })
        .catch((error) => {
            // Handle errors
            console.error(error);
            toast.error('Onboarding Failed!')
        });
    }

    return (
        <div className=" bg-gradient-to-tr from-pink-500 to-yellow-500 shadow-lg flex justify-center items-center h-screen w-screen">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="rounded-sm bg-[rgba(255,255,255,0.5)] p-12 shadow-2xl w-[60%]">
                {stage == 0 ?
                    (<><h1 className="font-bold text-center block text-2xl pb-[8%]">What&apos;s Your Name?</h1>
                        <Input
                            radius="lg"
                            className="pb-[5%]"
                            classNames={{
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
                            label="First Name"
                            labelPlacement="inside"
                            value={name.firstName}
                            onValueChange={(v) => {
                                setName((prev) => ({
                                    ...prev,
                                    firstName: v
                                }))
                            }}
                        />
                        <Input
                            radius="lg"
                            classNames={{
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
                            label="Last Name"
                            labelPlacement="inside"
                            value={name.lastName}
                            onValueChange={(v) => {
                                setName((prev) => ({
                                    ...prev,
                                    lastName: v
                                }))
                            }}
                        /></>) : (<>
                            <h1 className="font-bold text-center block text-2xl pb-[4%]">Choose your publicly displayed username</h1>
                            <Input
                                radius="lg"
                                className="pb-[5%]"
                                classNames={{
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
                                label="Username"
                                labelPlacement="inside"
                                value={username}
                                onValueChange={(v) => {
                                    setUsername(v)
                                }}
                            />
                            <h1 className="font-bold text-center block text-2xl pb-[4%]">Choose an avatar (or not)</h1>
                            <div className='flex flex-col items-center'>
                                <img className="w-[15%] aspect-square object-cover rounded-full bg-white" alt="" src={pfp ? pfp.url : "https://vwrzsdm8t0uhsvhz.public.blob.vercel-storage.com/image-11@2x-kJ47GKgsfmMLUbeQDquWCR5h0tYKiq.png"} />
                                <Button value={'Upload Avatar'} className={`self-center`} disabled={false} onClick={handleAvatarButtonClick} />
                                <input
                                    className="hidden"
                                    type="file"
                                    // onChange={setInput}
                                    ref={inputFileRef}
                                    onChange={handleLocalAvatarChange}></input>
                            </div>
                        </>)}
                <div className="flex flex-row w-full justify-between">
                    <Button value={'Back'} className={`self-start`} disabled={stage == 0 ? true : false} onClick={(e) => {
                        setStage(stage - 1)
                        console.log('here')
                    }} />
                    <Button value={stage == 1 ? 'Complete' : 'Continue'} className={"self-end"} disabled={false} onClick={(e) => {
                        e.preventDefault();

                        if (stage == 0) {
                            console.log('stage a')
                            if (name.firstName == '' || name.lastName == '') {
                                toast.error('Some fields are empty!')
                            } else {
                                setStage(1)
                            }
                        } else {
                            console.log('wstage b')
                            // setIsLoading(true)
                            handleUpdateInformation();
                            // setIsLoading(false);
                        }
                    }} />
                </div>
            </div>
        </div>
    )
}

export default Onboarding