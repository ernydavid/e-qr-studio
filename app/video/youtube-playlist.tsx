"use client";

import React from "react";
import { LiteYTEmbed } from "@justinribeiro/lite-youtube";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        LiteYTEmbed
      > & {
        videoid: string;
        playlistid?: string;
        autoload?: boolean;
        videoStartAt?: string;
        params?: string;
        posterquality?: string;
        className?: string;
      };
    }
  }
}

export function YoutubePlaylist({ youtubeLink }: { youtubeLink?: string }) {
  if (!youtubeLink) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <p className="text-muted-foreground">No video link or playlist</p>
      </div>
    );
  }
  const url = new URL(youtubeLink);

  const videoId = url.searchParams.get("v")?.toString();
  const playlistId = url.searchParams.get("list")?.toString();

  if (videoId && playlistId) {
    return (
      <>
        <lite-youtube
          className="w-full h-full rounded-xl"
          videoid={videoId}
          playlistid={playlistId}
          videoStartAt="5"
          autoload
          params="controls=2&enablejsapi=1&start_radio=1&autoplay=true"
          posterquality="maxresdefault"
        />
        {/* <iframe width='560' height='315' src='https://www.youtube.com/embed/OWhiCkEY-Yk?si=DmtOf_w9gMcN7Zkp' title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; cinnematics; encrypted-media; gyroscope; picture-in-picture; web-share' referrerPolicy='strict-origin-when-cross-origin' allowFullScreen /> */}
      </>
    );
  } else if (videoId) {
    return (
      <lite-youtube
        className="w-full h-full rounded-xl"
        videoid={videoId}
        videoStartAt="5"
        autoload
        params="controls=0&enablejsapi=1&start_radio=1&autoplay=true"
        posterquality="maxresdefault"
      />
    );
  }
}
