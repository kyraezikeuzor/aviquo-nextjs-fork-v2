"use client"

import { Input } from "@nextui-org/react"
import { useState } from "react";

function Button({ value, className, onClick }: { value: any, className: any, onClick: () => void }) {
    return (
        <button
            onClick={(e) => onClick}
            className={`${className} mt-6 transition transition-all block py-3 px-4 w-1/4 text-white font-bold rounded-md cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg h-auto`}>
            {value}
        </button>
    )
}

function Onboarding({ user }: { user: any }) {
    const [username, setUsername] = useState(user.username);
    const [pfpUrl, setPfpUrl] = useState(user.pfp);
    const [name, setName] = useState({
        firstName: user.firstName,
        lastName: user.lastName
    });

    const [stage, setStage] = useState(0);

    return (
        <div className=" bg-gradient-to-tr from-pink-500 to-yellow-500 shadow-lg flex justify-center items-center h-screen w-screen">
            <div className="rounded-sm bg-[rgba(255,255,255,0.5)] p-12 shadow-2xl w-[60%]">
                <h1 className="font-bold text-center block text-2xl pb-[8%]">What's Your Name?</h1>
                <Input
                    isClearable
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
                />
                <Input
                    isClearable
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
                />
                <div className="flex flex-row w-full justify-between">
                <Button value={'Back'} className={"self-start"} onClick={() => setStage(stage+1)} />
                <Button value={'Continue'} className={"self-end"} onClick={() => setStage(stage-1)} />
                </div>
            </div>
        </div>
    )
}

export default Onboarding