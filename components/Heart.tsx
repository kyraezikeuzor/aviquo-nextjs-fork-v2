'use client'

import React, { useEffect, useState } from "react";

import Heart from "react-heart"

export default function AnimatedHeart({ likeTrigger, className, oppId, liked }: { likeTrigger: (l: boolean, o: string) => void, className: string, oppId: string, liked: boolean }) {
  const [isClick, setClick] = useState(liked);

  useEffect(() => {
    setClick(liked);
  }, [liked]); // Include liked in the dependency array

  // console.log(isClick);

  return (
    <div className={className}>
      <Heart animationScale={1.3} animationDuration={0.7} isActive={isClick} onClick={() => {
        likeTrigger(!isClick, oppId);
        setClick(!isClick);
      }}
      />
    </div>
  );
}