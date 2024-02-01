import React, {useRef, useEffect, CSSProperties} from 'react';

export const AnimatedGradientBorderTW: React.FC<{
    children: React.ReactNode,
    height: string,
    width: string,
  }> = ({ children, height, width }) => {
    const boxRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const boxElement = boxRef.current;
  
      if (!boxElement) {
        return;
      }
  
      const updateAnimation = () => {
        const angle =
          (parseFloat(boxElement.style.getPropertyValue("--angle")) + 5) % 360;
        boxElement.style.setProperty("--angle", `${angle}deg`);
        requestAnimationFrame(updateAnimation);
      };
  
      requestAnimationFrame(updateAnimation);
    }, []);
  
    return (
      <div
        ref={boxRef}
        style={
          {
            "--angle": "0deg",
            "--border-color": "linear-gradient(var(--angle), #070707, #687aff)",
            "--bg-color": "linear-gradient(rgb(76 29 149), rgb(76 29 149))",
          } as CSSProperties
        }
        className={`flex ${height} ${width} duration-300 rounded-[12px] transition-[transition_box-shadow] hover:scale-110 hover:cursor-pointer items-center justify-center rounded-lg border-4 border-[#0000] [background:padding-box_var(--bg-color),border-box_var(--border-color)]`}
      >
        {children}
      </div>
    );
  };
  