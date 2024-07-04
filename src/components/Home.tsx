import { useState } from "react";
import videoBackGround from "../assets/fallen_angels.mp4";
import Timer from "./Timer";
import EmbedPlayer from "./EmbedPlayer";
import SettingsPannel from "./SettingsPanel";

const Home: React.FC<any> = (props) => {
  const [openSettingPanel, setOpenSettingsPanel] = useState(false);

  return (
    <>
      <SettingsPannel
        trigger={openSettingPanel}
        setTrigger={setOpenSettingsPanel}
        defaultTimer={props.defaultTimer}
        setDefaultTimer={props.setDefaultTimer}
      />
      <div className="grid place-items-center content-center gap-y-4">
        <h1 className="font-sans italic font-extrabold text-4xl text-slate-50 pt-2.5 tracking-wide">
          StudyLofi
        </h1>
      </div>

      <div className="fixed top-0 bottom-0 left-0 h-dvh z-10 ml-4">
        <div className="pt-20">
          {/* <Clock defaultTimer={props.defaultTimer} /> */}
          <Timer initialTime={props.defaultTimer}></Timer>
        </div>

        <button
          className="fixed bottom-12 ml-5 z-10"
          onClick={() => setOpenSettingsPanel(true)}
        >
          <img width={40} src="./src/assets/stopwatch-icon.svg"></img>
        </button>
      </div>

      <div className="fixed content-center bottom-12 w-full">
        <EmbedPlayer></EmbedPlayer>
      </div>
      <video
        className="background_video"
        src={videoBackGround}
        autoPlay
        loop
        muted
      />
    </>
  );
};

export default Home;
