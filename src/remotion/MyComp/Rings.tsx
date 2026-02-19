import React from "react";
import { AbsoluteFill } from "remotion";

export const Rings: React.FC<{
  outProgress: number;
}> = ({ outProgress }) => {
  const scale = 1 / (1 - outProgress);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
        background: `linear-gradient(135deg, 
          #2a1810 0%, 
          #3d2418 20%, 
          #4a2c1a 40%, 
          #5a3820 60%, 
          #4a2c1a 80%, 
          #3d2418 100%
        )`,
      }}
    />
  );
};
