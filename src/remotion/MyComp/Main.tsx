import { fontFamily, loadFont } from "@remotion/google-fonts/Outfit";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { CompositionProps } from "../../../types/constants";
import { FluosLogo } from "./FluosLogo";
import { Rings } from "./Rings";

loadFont("normal", {
  subsets: ["latin"],
  weights: ["700"],
});

export const Main = ({ title, tagline }: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing tuned for a smoother crossfade between logo and text
  const logoSceneDuration = Math.round(2.5 * fps);
  const transitionOverlap = Math.round(0.7 * fps);

  const logoOut = spring({
    fps,
    frame,
    config: {
      damping: 180,
      mass: 0.9,
    },
    durationInFrames: 36,
    delay: logoSceneDuration - transitionOverlap,
  });

  const finalSceneOpacity = spring({
    fps,
    frame,
    config: {
      damping: 190,
      mass: 0.9,
    },
    durationInFrames: 40,
    delay: logoSceneDuration - transitionOverlap,
  });

  // Text animations with staggered delays for smooth reveal
  const titleProgress = spring({
    fps,
    frame,
    config: {
      damping: 120,
      mass: 0.6,
    },
    durationInFrames: 40,
    delay: logoSceneDuration - transitionOverlap + 12,
  });

  const taglineProgress = spring({
    fps,
    frame,
    config: {
      damping: 120,
      mass: 0.6,
    },
    durationInFrames: 40,
    delay: logoSceneDuration - transitionOverlap + 24,
  });

  const underlineProgress = spring({
    fps,
    frame,
    config: {
      damping: 100,
      mass: 0.5,
    },
    durationInFrames: 50,
    delay: logoSceneDuration - transitionOverlap + 32,
  });

  const titleOpacity = interpolate(
    titleProgress * finalSceneOpacity,
    [0, 1],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const taglineOpacity = interpolate(
    taglineProgress * finalSceneOpacity,
    [0, 1],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill>
      <Sequence durationInFrames={logoSceneDuration + transitionOverlap}>
        <Rings outProgress={logoOut}></Rings>
        <AbsoluteFill className="justify-center items-center">
          <FluosLogo outProgress={logoOut}></FluosLogo>
        </AbsoluteFill>
      </Sequence>

      {/* Final Section with darker gradient background */}
      <Sequence from={logoSceneDuration - transitionOverlap}>
        <AbsoluteFill
          style={{
            background: `linear-gradient(135deg, 
              #2a1810 0%, 
              #3d2418 20%, 
              #4a2c1a 40%, 
              #5a3820 60%, 
              #4a2c1a 80%, 
              #3d2418 100%
            )`,
            opacity: finalSceneOpacity,
            transform: `scale(${interpolate(
              finalSceneOpacity,
              [0, 1],
              [1.015, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            )})`,
          }}
        >
          {/* Subtle animated glow effect */}
          <AbsoluteFill
            style={{
              background: `radial-gradient(circle at ${interpolate(
                frame,
                [
                  logoSceneDuration - transitionOverlap,
                  logoSceneDuration + fps * 4,
                ],
                [20, 80],
                { extrapolateRight: "clamp" },
              )}% ${interpolate(
                frame,
                [
                  logoSceneDuration - transitionOverlap,
                  logoSceneDuration + fps * 4,
                ],
                [30, 70],
                { extrapolateRight: "clamp" },
              )}%, 
                rgba(241, 114, 48, 0.15) 0%, 
                transparent 60%
              )`,
            }}
          />

          {/* Content container */}
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 28,
              }}
            >
              {/* Title with orange gradient */}
              <h1
                style={{
                  fontFamily,
                  fontSize: 120,
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #F17230 0%, #F89C43 50%, #FFD166 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "0.08em",
                  filter: "drop-shadow(0 4px 20px rgba(241, 114, 48, 0.4))",
                  transform: `translateY(${interpolate(
                    titleProgress,
                    [0, 1],
                    [40, 0],
                  )}px) scale(${interpolate(titleProgress, [0, 1], [0.9, 1])})`,
                  opacity: titleOpacity,
                }}
              >
                {title.toLowerCase()}
              </h1>

              {/* Tagline with animated reveal */}
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                {/* Animated line underline */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: `${interpolate(underlineProgress, [0, 1], [0, 120])}%`,
                    height: 2,
                    background:
                      "linear-gradient(90deg, transparent, rgba(241, 114, 48, 0.6), transparent)",
                    borderRadius: 1,
                  }}
                />

                <p
                  style={{
                    fontFamily,
                    fontSize: 28,
                    fontWeight: 600,
                    color: "rgba(255, 255, 255, 0.9)",
                    letterSpacing: "0.04em",
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                    opacity: taglineOpacity,
                    transform: `translateY(${interpolate(
                      taglineProgress,
                      [0, 1],
                      [20, 0],
                    )}px)`,
                  }}
                >
                  {tagline}
                </p>
              </div>
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
