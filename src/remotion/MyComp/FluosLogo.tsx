import { evolvePath } from "@remotion/paths";
import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const FluosLogo: React.FC<{
  outProgress: number;
}> = ({ outProgress }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Smooth drawing animation
  const drawProgress = spring({
    fps,
    frame,
    config: {
      damping: 170,
      mass: 0.75,
    },
    durationInFrames: 58,
  });

  // The exact SVG path from the provided logo
  const logoPath =
    "M0.5 101.836V107.557C0.5 112.282 9.61435 113.832 11.5401 109.518C23.0901 83.639 44.2509 50.6492 77.5622 48.6857C111.002 46.7146 132.405 80.7818 144.09 107.974C145.966 112.338 155.194 110.827 155.194 106.078V101.871C155.194 101.156 154.986 100.426 154.622 99.8103C76.401 -32.7518 76.0744 -32.1772 1.52439 98.9767L1.03797 99.8325C0.695491 100.435 0.5 101.143 0.5 101.836Z";

  const evolution = evolvePath(drawProgress, logoPath);

  const fillOpacity = interpolate(drawProgress, [0.6, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const strokeOpacity = interpolate(drawProgress, [0.55, 1], [1, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitProgress = interpolate(outProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const containerStyle: React.CSSProperties = useMemo(() => {
    const scale = interpolate(exitProgress, [0, 1], [1, 0.82]);
    const opacity = interpolate(exitProgress, [0, 1], [1, 0]);
    const translateY = interpolate(exitProgress, [0, 1], [0, -16]);

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity,
    };
  }, [exitProgress]);

  return (
    <div style={containerStyle}>
      <svg
        width="320"
        height="290"
        viewBox="-10 -40 176 181"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: "visible",
        }}
      >
        <defs>
          <linearGradient
            id="paint0_linear_54_5"
            x1="77.8469"
            y1="140.5"
            x2="77.8469"
            y2="0.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F17230" />
            <stop offset="0.9999" stopColor="#F89C43" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated stroke drawing */}
        <path
          d={logoPath}
          stroke="url(#paint0_linear_54_5)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={strokeOpacity}
          strokeDasharray={evolution.strokeDasharray}
          strokeDashoffset={evolution.strokeDashoffset}
          filter="url(#glow)"
        />

        {/* Fill after drawing completes */}
        <path
          d={logoPath}
          fill="url(#paint0_linear_54_5)"
          opacity={fillOpacity}
        />
      </svg>
    </div>
  );
};
