"use client"

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useState } from "react";

export default function Settings({ user }: { user: any }) {
    const [profile, setProfile] = useState({

    });

    return (
    <main className="flex flex-col gap-5 px-1/6 md:px-[10vw] lg:px-[10vw]">
      <h1 className="text-2xl md:text-3xl lg:text-4xl">Settings</h1>
        <div className="flex w-full flex-col">
            <Tabs aria-label="Settings" className='self-center w-3/5' classNames={{
                tabList: 'w-full'
            }}>
                <Tab key="display" title="Profile">
                    <Card className='w-full h-full'>
                        <CardBody>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="account" title="Account">
                    <Card className='w-full h-full'>
                        <CardBody>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="notifs" title="Notifications">
                    <Card className='w-full h-full'>
                        <CardBody>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    </main>
    )
}


