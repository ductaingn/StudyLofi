import { useRef, useState, useEffect } from 'react';
import Countdown, {CountdownRendererFn } from 'react-countdown';

const worker = new Worker(new URL('../utils/worker.js', import.meta.url));

interface ClockProps {}

const Clock: React.FC<ClockProps> = () => {
  const [countdownTime, setCountdownTime] = useState<number>(0);
  const [isRunning, setRunning] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);
  const countdownRef = useRef<Countdown | null>(null);
  const [isCompleted,setCompleted] = useState<boolean>(false);
  const [defaultHour,setDefaultHour] = useState<number>(0);
  const [defaultMinute,setDefaultMinute] = useState<number>(0);
  const [defaultSecond,setDefaultSecond] = useState<number>(0);

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

  const renderer: CountdownRendererFn = ({ hours, minutes, seconds }) => {
    return (
      <>
        {isCompleted && 
        <>
          <h1>You're good to go!</h1>
        </>}
        <div className='grid place-items-center content-center'>
          <p className='text-xl text-white font-[760] italic'>{hours.toString().padStart(2, '0')}</p>
          <p className='text-white pl-1'>:</p>
          <p className='text-xl text-white font-[760] italic'>{minutes.toString().padStart(2, '0')}</p>
          <p className='text-white pl-1'>:</p>
          <p className='text-xl text-white font-[760] italic'>{seconds.toString().padStart(2, '0')}</p>
        </div>
      </>
    );
  };
  

  const TimeSetter = () => {
    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      const {target: {value}} = event;
      const formattedValue = parseInt(value)

      switch (event.target.id){
        case 'hour':
          setDefaultHour(formattedValue);
          break;
        case 'minute':
          setDefaultMinute(formattedValue);
          break;
        case 'second':
          setDefaultSecond(formattedValue);
          break;
      }
    }
    return (
      <>
        <div className='grid place-items-center content-center'>
          <input 
            id='hour'
            className='bg-transparent outline-transparent text-xl text-white font-[760] italic text-center w-16 focus:outline-none'
            type="string"
            placeholder={defaultHour.toString().padStart(2,'0')}
            onChange={handleInputChange}
            autoComplete='off'
          />
          <p className='text-white pl-1'>:</p>
          
          <input 
            id='minute'
            className='bg-transparent outline-transparent text-xl text-white font-[760] italic text-center w-16 focus:outline-none'
            type="string"
            placeholder={defaultMinute.toString().padStart(2,'0')} 
            autoComplete='off'
            onChange={handleInputChange}
          />
          <p className='text-white pl-1'>:</p>

          <input 
            id='second'
            className='bg-transparent outline-transparent text-xl text-white font-[760] italic text-center w-16 focus:outline-none'
            type="string"
            placeholder={defaultSecond.toString().padStart(2,'0')}
            autoComplete='off'
            onChange={handleInputChange}
          />
        </div>
      </>
    )
  };

  const handleStart = () => {
    setRunning(true);
    setKey((prevKey) => prevKey + 1);
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
      <div className='grid place-items-center gap-y-4'>
        {isRunning? 
          <Countdown
            key={key}
            date={isRunning ? Date.now() + countdownTime : Date.now()}
            renderer={renderer}
            ref={countdownRef}
          />
          : 
          <TimeSetter/>
        }

        <div className='pl-4'>
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
            Stop
          </button>
        </div>

      </div>   
    </>
  );
};

export default Clock;
