import { YoutubePlaylist } from "./youtube-playlist";

export default function Page() {
  return (
    <div className="grid grid-cols-2 min-h-dvh">
      <p>Video Page</p>
      <YoutubePlaylist youtubeLink="https://www.youtube.com/watch?v=OWhiCkEY-Yk&list=RDOWhiCkEY-Yk&start_radio=1" />
    </div>
  );
}
