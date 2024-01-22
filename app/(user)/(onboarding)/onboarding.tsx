// TODO bug fix regarding router

"use client";

import { Input } from "@nextui-org/react";
import { PutBlobResult, HeadBlobResult } from "@vercel/blob";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { promisify } from "util";
import PfpInput from "./pfpInput";
import { UserInterface } from "@/auth/lucia";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function OnboardingButton({
  value,
  className = "",
  onClick,
  disabled = false,
}: {
  value: string;
  className?: string;
  onClick: (e: any) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type={"button"}
      onClick={(e) => onClick(e)}
      className={
        className +
        " inline-block py-2 px-2 text-sm rounded-md cursor-pointer text-center"
      }
      disabled={disabled}
    >
      {value}
    </button>
  );
}

export default function Onboarding({ user }: { user: UserInterface }) {
  const router = useRouter();

  var newBlob;

  const [username, setUsername] = useState(user.username);
  const [pfp, setPfp] = useState<PutBlobResult | HeadBlobResult | null>(null);
  const [name, setName] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [deeta, protegent] = useState({
    email: user.email,
    username: username,
    pfp: pfp ? pfp.url : "",
    firstName: name.firstName,
    lastName: name.lastName,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user.pfp != "") {
        const imageData = await axios.get(`/api/retrieve?filename=${user.pfp}`);
        const image = imageData.data as HeadBlobResult;
        setPfp(image);
      } else {
        setPfp(null);
      }
    };
    fetchData();
  }, []);

  const handleAvatarButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleLocalAvatarChange = async () => {
    if (inputFileRef.current?.files) {
      const file = inputFileRef.current.files[0];

      if (file) {
        setIsLoading(true);
        const response = await axios.post(
          `/api/upload?filename=${file.name}`,
          file
        );
        newBlob = response.data as PutBlobResult;
        setPfp(newBlob);
        setIsLoading(false);
      }
    }
  };

  const handleUpdateInformation = () => {
    const data = {
      email: user.email,
      username: username,
      pfp: pfp ? pfp.url : "",
      firstName: name.firstName,
      lastName: name.lastName,
    };

    protegent(data);

    // TODO: Validation here
  };

  const submitDeeta = () => {
    axios
      .put("/api/user", { ...deeta })
      .then((res) => {
        location.reload();
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        toast.error("Onboarding Failed! :(");
      });
  };

  const INPUT_STYLES = {
    input: ["text-black", "placeholder:text-neutral-200"],
    innerWrapper: [],
    inputWrapper: [
      "drop-shadow-xl",
      "!cursor-text",
      "bg-neutral-50",
      "hover:bg-neutral-100",
    ],
    label: ["top-4"],
  };

  return (
    <div
      className="fixed w-screen h-screen backdrop-blur-md z-[1010]"
      id="onboarding-overlay"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="container flex flex-col p-8 mx-auto mt-24 bg-white shadow-2xl gap-y-6 rounded-2xl md:w-96"
        id="onboarding-background"
      >
        <div>
          <h3 className="mb-0 text-4xl">Almost There!</h3>
          <p className="mt-1">Tell more about yourself (or not):</p>
        </div>
        <PfpInput
          pfp={pfp}
          clickHandler={handleAvatarButtonClick}
          changeHandler={handleLocalAvatarChange}
          inputRef={inputFileRef}
        />
        <div id="name-container" className="flex gap-4">
          <Input
            size="md"
            radius="md"
            classNames={INPUT_STYLES}
            label="First"
            value={name.firstName}
            onValueChange={(v) => {
              setName((prev) => ({
                ...prev,
                firstName: v,
              }));
            }}
            isRequired
          />
          <Input
            size="md"
            radius="md"
            classNames={INPUT_STYLES}
            label="Last"
            value={name.lastName}
            onValueChange={(v) => {
              setName((prev) => ({
                ...prev,
                lastName: v,
              }));
            }}
          />
        </div>
        <Input
          classNames={INPUT_STYLES}
          label="Username"
          value={username}
          onValueChange={(v) => {
            setUsername(v);
          }}
          isRequired
        />
        <OnboardingButton
          value="Lets go!"
          onClick={submitDeeta}
          className="px-6 py-3 ml-auto mr-0 text-lg transition-[background_drop-shadow] duration-200 bg-gray-100 drop-shadow-md w-fit hover:bg-gray-50 hover:drop-shadow-xl"
        />
      </div>
    </div>
  );
}
