import './App.css'
import videoBackGround from './assets/fallen_angels.mp4'


function App() {

  return (
    <div className='main'>
      <div className='grid place-items-center content-center gap-y-4'>
        <h1 className='font-sans italic font-extrabold text-4xl text-slate-50 pt-2.5 tracking-wide'>StudyLofi</h1>
        {/* <Home></Home> */}
      </div>
      <video className='background_video' src={videoBackGround} autoPlay loop muted/>
    </div>
  )
}

export default App
