"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
  CompositionProps,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { Main } from "../remotion/MyComp/Main";

const Home: NextPage = () => {
  const [text] = useState<string>(defaultMyCompProps.title);
  const [tagline] = useState<string>(defaultMyCompProps.tagline);

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: text,
      tagline,
    };
  }, [text, tagline]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-screen-lg px-4">
        <div className="overflow-hidden rounded-lg shadow-2xl">
          <Player
            acknowledgeRemotionLicense={true}
            component={Main}
            inputProps={inputProps}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={{
              width: "100%",
            }}
            controls
            autoPlay
            loop
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
