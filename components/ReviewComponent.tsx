import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

import './RatingStyles.scss';
import { FaStar } from 'react-icons/fa';

const starVariants = {
  initial: {
    scale: 0
  },
  animate: (i: any) => ({
    scale: 1,
    transition: {
      delay: i * .04,
      duration: .25,
      type: 'spring',
      stiffness: 175
    }
  }),
  exit: (i: any) => ({
    scale: 0,
    transition: {
      duration: .25,
      delay: .2 - i * .04,
    }
  }),
  hovered: {
    scale: .8,
    transition: {
      duration: .2
    }
  }
}

interface StarProps {
    i: any,
    isHoveringWrapper: any,
    isClicked: boolean
}

const Star: React.FC<StarProps> = ({ i, isHoveringWrapper, isClicked }) => {
  const [isHovering, setIsHovering] = useState(false);
  const starControls = useAnimation();
  const backgroundControls = useAnimation();
  useEffect(() => {
    if (isClicked && isHovering) starControls.start('hovered');
    else if (isClicked) starControls.start('animate');
    else starControls.start('exit');
  }, [isClicked, isHovering]);
  useEffect(() => {
    if (isHoveringWrapper) backgroundControls.start({ background: '#ffd700' });
    else backgroundControls.start({ background: '#aaaaaa' });
  }, [isHoveringWrapper]);
  return (
    <>
      <motion.div 
        className="star-background" 
        initial={{ background: '#aaaaaa' }}
        animate={backgroundControls}
      />
      <motion.div 
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        variants={starVariants}
        initial="initial"
        animate={starControls}
        custom={i}
      >
        <FaStar />
       </motion.div> 
    </>
  )
}

interface RatingProps {
    callback: (e: number) => void
}

export const StarRating: React.FC<RatingProps> = ({callback}) => {
  const [isClicked, setIsClicked] = useState(0);
  const [isHovering, setIsHovering] = useState(0);

  const handleClick = (v: number) => {
    setIsClicked(v);
    callback(v);
  }
  
  return (
    <div className="star-rating">
      <div className="stars-container">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div 
            className="star-wrapper"
            onMouseOver={() => setIsHovering(i)}
            onClick={() => handleClick(i)}
            key={i}
          >
            <Star 
              i={i} 
              isHoveringWrapper={isHovering >= i} 
              isClicked={isClicked >= i}    
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}