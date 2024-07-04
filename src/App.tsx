import { useState } from 'react';
import './App.css';
import videoBackGround from './assets/fallen_angels.mp4';
import Clock from './components/Clock';
import EmbedPlayer from './components/EmbedPlayer';
import SettingsPannel from './components/SettingsPanel';

function App() {
  const [openSettingPanel,setOpenSettingsPanel] = useState(false);
  type TimeFormat = {
    hour: Number,
    minute: Number,
    second: Number
  }
  const [defaultTimer,setDefaultTimer] = useState<TimeFormat>({
    hour: 0,
    minute: 0,
    second: 0
  });


  return (
    <div className='main absolute'>
      <SettingsPannel 
        trigger = {openSettingPanel} 
        setTrigger = {setOpenSettingsPanel}
        defaultTimer = {defaultTimer}
        setDefaultTimer = {setDefaultTimer}
        />
      <div className='grid place-items-center content-center gap-y-4'>
        <h1 className='font-sans italic font-extrabold text-4xl text-slate-50 pt-2.5 tracking-wide'>StudyLofi</h1>
      </div>

      <div className='fixed top-0 bottom-0 left-0 h-dvh z-10'>
        <div className="pt-20">
          <Clock
            defaultTimer = {defaultTimer}
          />
        </div>

        <button
          className='fixed bottom-12 pl-8 z-10'
          onClick={()=>setOpenSettingsPanel(true)}
        >
          <img width={40} src='./src/assets/stopwatch-icon.svg'></img>
        </button>
      </div>

      <div className='fixed content-center bottom-12 w-full'>
        <EmbedPlayer></EmbedPlayer>
      </div>
      <video className='background_video' src={videoBackGround} autoPlay loop muted/>
    </div>
  )
}

export default App
