import { HeadBlobResult, PutBlobResult } from "@vercel/blob";
import { RefObject } from "react";
import { OnboardingButton } from "./onboarding";

export interface PfpInterfaceProps {
  pfp: PutBlobResult | HeadBlobResult | null;
  clickHandler: (e: any) => void;
  changeHandler: (e: any) => void;
  inputRef: RefObject<HTMLInputElement>;
}

export default function PfpInput({
  pfp,
  clickHandler,
  changeHandler,
  inputRef: ref,
}: PfpInterfaceProps) {
  return (
    <>
      <div
        className="flex items-center justify-center w-full h-16 py-2 rounded-xl"
        id="pfp-container"
      >
        <img
          className="object-cover h-full bg-white rounded-full aspect-square"
          alt=""
          src={
            pfp
              ? pfp.url
              : "https://vwrzsdm8t0uhsvhz.public.blob.vercel-storage.com/image-11@2x-kJ47GKgsfmMLUbeQDquWCR5h0tYKiq.png"
          }
        />
        <OnboardingButton
          value="Upload Avatar"
          className="px-2 m-0 ml-4 text-lg w-fit text-neutral-800"
          onClick={clickHandler}
          disabled={false}
        />
      </div>
      <input
        className="hidden"
        type="file"
        // onChange={setInput}
        ref={ref}
        onChange={changeHandler}
      ></input>
    </>
  );
}
