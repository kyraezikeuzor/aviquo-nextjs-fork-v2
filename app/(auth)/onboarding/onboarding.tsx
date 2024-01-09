//TODO bug fix regarding router

"use client";

import { Input } from "@nextui-org/react";
import { PutBlobResult, HeadBlobResult } from "@vercel/blob";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { promisify } from "util";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function Button({
  value,
  className,
  onClick,
  disabled,
}: {
  value: any;
  className: any;
  onClick: (e: any) => void;
  disabled: any;
}) {
  return (
    <button
      type={"button"}
      onClick={(e) => onClick(e)}
      className={
        "${className} mt-6 transition-all block py-2 text-white w-32 rounded-md cursor-pointer " +
        (disabled
          ? `bg-slate-700 text-gray-500 h-auto`
          : `font-bold drop-shadow-[-3px_3px_6px_#00000055] bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg h-auto`)
      }
      disabled={disabled}
    >
      {value}
    </button>
  );
}

const CHOOSE_NAME = 0;
const CHOOSE_USERNAME_PFP = 1;

function Onboarding({ user }: { user: any }) {
  const router = useRouter();

  var newBlob;

  const [username, setUsername] = useState(user.username);
  const [pfp, setPfp] = useState<PutBlobResult | HeadBlobResult | null>(null);
  const [name, setName] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });

  const [stage, setStage] = useState(CHOOSE_NAME);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (name.firstName == "" || name.lastName == "") {
      setStage(CHOOSE_NAME);
    } else if (username == "" || user.pfp == "") {
      setStage(CHOOSE_USERNAME_PFP);
    }
  }, []);

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

    axios
      .put("/api/user", { ...data })
      .then((res) => {
        console.log(res);
        location.reload();
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        toast.error("Onboarding Failed!");
      });
  };

  const INPUT_STYLES = {
    input: [
      "bg-transparent",
      "text-black/90 dark:text-white/90",
      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
    ],
    innerWrapper: ["bg-transparent"],
    inputWrapper: [
      "shadow-2xl",
      "bg-default-200/50",
      "dark:bg-default/60",
      "backdrop-blur-xl",
      "backdrop-saturate-200",
      "hover:brightness-105",
      "dark:hover:bg-default/70",
      "group-data-[focused=true]:bg-default-200/50",
      "dark:group-data-[focused=true]:bg-default/60",
      "!cursor-text",
    ],
  };

  const NAME_INPUT_STYLES = {
    input: [...INPUT_STYLES.input],
    innerWrapper: [...INPUT_STYLES.innerWrapper],
    inputWrapper: [...INPUT_STYLES.inputWrapper],
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen shadow-lg bg-gradient-to-tr from-pink-500 to-yellow-500">
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={
          "rounded-2xl bg-[rgba(255,255,255,0.5)] p-12 shadow-2xl " +
          (stage == CHOOSE_NAME ? "w-1/4" : "w-3/5")
        }
      >
        {stage == CHOOSE_NAME ? (
          <div className="">
            <h1 className="block pb-10 text-2xl font-bold text-center">
              What&apos;s Your Name?
            </h1>
            <div className="grid grid-cols-[minmax(0,_1fr)_5%_minmax(0,_1fr)] grid-rows-1">
              <Input
                size="lg"
                radius="md"
                classNames={NAME_INPUT_STYLES}
                label="First"
                labelPlacement="inside"
                value={name.firstName}
                onValueChange={(v) => {
                  setName((prev) => ({
                    ...prev,
                    firstName: v,
                  }));
                }}
              />
              <div></div>
              <Input
                size="lg"
                radius="md"
                classNames={NAME_INPUT_STYLES}
                label="Last"
                labelPlacement="inside"
                value={name.lastName}
                onValueChange={(v) => {
                  setName((prev) => ({
                    ...prev,
                    lastName: v,
                  }));
                }}
              />
            </div>
          </div>
        ) : (
          <>
            <h1 className="font-bold text-center block text-2xl pb-[4%]">
              Choose your publicly displayed username
            </h1>
            <Input
              radius="lg"
              classNames={INPUT_STYLES}
              label="Username"
              labelPlacement="inside"
              value={username}
              onValueChange={(v) => {
                setUsername(v);
              }}
            />
            <h1 className="font-bold text-center block text-2xl pb-[4%]">
              Choose an avatar (or not)
            </h1>
            <div className="flex flex-col items-center">
              <img
                className="w-[15%] aspect-square object-cover rounded-full bg-white"
                alt=""
                src={
                  pfp
                    ? pfp.url
                    : "https://vwrzsdm8t0uhsvhz.public.blob.vercel-storage.com/image-11@2x-kJ47GKgsfmMLUbeQDquWCR5h0tYKiq.png"
                }
              />
              <Button
                value={"Upload Avatar"}
                className={`self-center`}
                disabled={false}
                onClick={handleAvatarButtonClick}
              />
              <input
                className="hidden"
                type="file"
                // onChange={setInput}
                ref={inputFileRef}
                onChange={handleLocalAvatarChange}
              ></input>
            </div>
          </>
        )}
        <div className="flex flex-row justify-between w-full">
          <Button
            value={"Back"}
            className={`self-start`}
            disabled={stage == 0 ? true : false}
            onClick={(e) => {
              setStage(stage - 1);
              console.log("here");
            }}
          />
          <Button
            value={stage == 1 ? "Complete" : "Continue"}
            className={"self-end"}
            disabled={false}
            onClick={(e) => {
              e.preventDefault();

              if (stage == 0) {
                console.log("stage a");
                if (name.firstName == "" || name.lastName == "") {
                  toast.error("Some fields are empty!");
                } else {
                  setStage(1);
                }
              } else {
                console.log("wstage b");
                // setIsLoading(true)
                handleUpdateInformation();
                // setIsLoading(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
