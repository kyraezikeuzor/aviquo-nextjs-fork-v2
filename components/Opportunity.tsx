"use client";

import React, { useState, useEffect, ReactNode } from "react";

import Tag from "@/components/Tag";

import { motion, useScroll } from "framer-motion"

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";

import { formatRelativeTime } from "@/utils";

import AnimatedHeart from "@/components/Heart";

interface OpportunityProps {
  clickCallback: (a: any, b: any, c: string) => void;
  item: Record<string, any>;
  likedActivites: Array<any>;
  likeCallback: (a: any, b: any) => void;
  status: 'expanded' | 'folded' | 'standard'
  id: string;
}

export const Opportunity: React.FC<OpportunityProps> = ({
  item,
  clickCallback,
  likedActivites,
  likeCallback,
  status,
  id
}) => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: [0.25, 0.4, 0.6, 0.8, 1],
        scale: [0.5, 1.04, 1],
        // rotate: [0, 360],
      }}
      transition={{
        duration: 1.3,
        ease: "easeInOut"
      }}
      onClick={(e) => clickCallback(e, item, id)}
      // className="w-[31%] ml-[1%] mr-[1%] mb-[5%]"
      // className="aspect-square md:w-[31%] lg:w-[24%] ml-[1%] mr-[1%]"
      className="aspect-square w-[31%]  ml-[1%] mr-[1%] max-h-full"
      id={id}
    >
      <Card
        className="max-w-full duration-300 transition-[transition_box-shadow] hover:scale-105 hover:cursor-pointer w-full h-full"
      >
        <CardHeader className="flex flex-row items-center justify-center w-full mt-[-2.5%] mb-[-5.0%] mr-[-5.0%]">
          <h2 className="w-[87%] text-base h-[28px] text-center">
            {/* {item.name} */}
          </h2>
          <AnimatedHeart
            className="justify-self-end animated-heart-section w-[13%] p-1"
            likeTrigger={(e, a) => likeCallback(e, a)}
            oppId={item.id}
            liked={likedActivites.includes(item.id)}
          />
        </CardHeader>
        <CardBody className="flex flex-wrap items-center justify-center pt-[5%] pb-[2.5%]">
          <div className="text-center">{item.name}</div>
        </CardBody>
        <CardFooter className='flex flex-row justify-between'>
          <Tag type="pink">📖 STEM</Tag>
          <Tag type="orange">
            ⏰ {formatRelativeTime(item.deadline, true)}
          </Tag>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

interface OpportunityRowProps {
  children: ReactNode;
}

export const OpportunityRow: React.FC<OpportunityRowProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-row flex-wrap max-w-full pb-[20px] justify-between">
      {children}
    </div>
  )
}