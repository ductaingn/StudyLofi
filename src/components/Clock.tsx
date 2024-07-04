import { useRef, useState, useEffect } from 'react';
import Countdown, {CountdownRendererFn } from 'react-countdown';

const worker = new Worker(new URL('../utils/worker.js', import.meta.url));

interface ClockProps {}

const Clock: React.FC<any> = (props) => {
  const [countdownTime, setCountdownTime] = useState<number>(0);
  const [isRunning, setRunning] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);
  const countdownRef = useRef<Countdown | null>(null);
  const [isCompleted,setCompleted] = useState<boolean>(false);
  // const [defaultHour,setDefaultHour] = useState<number>(0);
  // const [defaultMinute,setDefaultMinute] = useState<number>(0);
  // const [defaultSecond,setDefaultSecond] = useState<number>(0);
  const defaultHour = props.defaultTimer.hour;
  const defaultMinute = props.defaultTimer.minute;
  const defaultSecond = props.defaultTimer.second;

  useEffect(()=>{
    if(isRunning){
      worker.postMessage({timeValue: countdownTime});
    }
  }, [isRunning,countdownTime]);

  useEffect(()=>{
    worker.onmessage = (event: MessageEvent)=>{
      if(event.data.completed){
        setRunning(false);
        setCompleted(true);
      }
    }
  }, [])

  const renderer: CountdownRendererFn = ({ hours, minutes, seconds, completed }) => {
    return (
      <>
        {completed && 
        <>
          <h1>You're good to go!</h1>
        </>}
        <div className='grid place-items-center content-center w-max'>
          <p className='text-xl text-white font-[760] italic'>{hours.toString().padStart(2, '0')}</p>
          <p className='text-white pl-1'>:</p>
          <p className='text-xl text-white font-[760] italic'>{minutes.toString().padStart(2, '0')}</p>
          <p className='text-white pl-1'>:</p>
          <p className='text-xl text-white font-[760] italic'>{seconds.toString().padStart(2, '0')}</p>
        </div>
      </>
    );
  };
  

  const handleStart = () => {
    setRunning(true);
    setKey((prevKey) => prevKey + 1);
    console.log('default timer:',props.defaultTimer);
    
    setCountdownTime((defaultSecond + defaultMinute*60 + defaultHour*3600)*1000)
    
  };

  const handleStop = () => {
    setRunning(false);
    if (countdownRef.current) {
      countdownRef.current.stop(); // Stop countdown using ref
    }
  };

  const handlePause = () => {
    if (countdownRef.current) {
      if (countdownRef.current.isPaused()) {
        countdownRef.current.start(); // Resume if paused
      } else {
        countdownRef.current.pause(); // Pause countdown
      }
    }
  };

  useEffect(() => {
    if (countdownRef.current) {
      if (isRunning) {
        countdownRef.current.start();
      } else {
        countdownRef.current.stop();
      }
    }
  }, [isRunning]);

  return (
    <>   
      <div className='grid place-items-center gap-y-4 w-max'>
        <Countdown
          key={key}
          date={isRunning ? Date.now() + countdownTime : Date.now()}
          renderer={renderer}
          ref={countdownRef}
        />

        <div className='grid grid-cols-1 justisfy-items-center pl-4'>
          <button
            className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-20'
            onClick={(e) => {
              e.preventDefault();
              handleStart();
            }}
          >
            Start
          </button>

          <button
            className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-20'
            onClick={(e) => {
              e.preventDefault();
              handlePause();
            }}
          >
            Pause
          </button>

          <button
            className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-20'
            onClick={(e) => {
              e.preventDefault();
              handleStop();
            }}
          >
            Reset
          </button>
        </div>

      </div>   
    </>
  );
};

export default Clock;
