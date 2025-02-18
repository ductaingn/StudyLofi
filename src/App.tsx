import './App.css'
import videoBackGround from './assets/fallen_angels.mp4'
import Clock from './components/Clock'
import EmbedPlayer from './components/EmbedPlayer'

function App() {

  return (
    <div className='main'>
      <div className='grid place-items-center content-center gap-y-4'>
        <h1 className='font-sans italic font-extrabold text-4xl text-slate-50 pt-2.5 tracking-wide'>StudyLofi</h1>
      </div>

      <div className='content-left max-w-20'>
        <Clock></Clock>
      </div>

      <div className='fixed content-center bottom-12 w-full'>
        <EmbedPlayer></EmbedPlayer>
      </div>
      <video className='background_video' src={videoBackGround} autoPlay loop muted/>
    </div>
  )
}

export default App
