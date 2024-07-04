import React, { useEffect, useState } from "react";
import moment, { Duration } from "moment";

const Countdown: React.FC<any> = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState<Duration>(
    moment.duration({
      hours: initialTime.hour,
      minutes: initialTime.minute,
      seconds: initialTime.second,
    })
  );
  const [isActive, setIsActive] = useState(false);

  const startCountdown = () => setIsActive(true);
  const pauseCountdown = () => setIsActive(false);
  const resetCountdown = (newTime: string) => {
    setTimeLeft(moment.duration(newTime));
    setIsActive(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = moment.duration(
            prevTimeLeft.asMilliseconds() - 1000
          );
          if (newTimeLeft.asMilliseconds() <= 0) {
            clearInterval(timer);
            return moment.duration(0);
          }
          return newTimeLeft;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center mb-4">
        <p className="text-xl text-white font-[760] italic">
          {timeLeft.hours().toString().padStart(2, "0")}
        </p>
        <p className="text-white pl-1">:</p>
        <p className="text-xl text-white font-[760] italic">
          {timeLeft.minutes().toString().padStart(2, "0")}
        </p>
        <p className="text-white pl-1">:</p>
        <p className="text-xl text-white font-[760] italic">
          {timeLeft.seconds().toString().padStart(2, "0")}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 my-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-20"
          onClick={(e) => {
            e.preventDefault();
            startCountdown();
          }}
        >
          Start
        </button>

        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 my-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-20"
          onClick={(e) => {
            e.preventDefault();
            pauseCountdown();
          }}
        >
          Pause
        </button>

        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 my-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-20"
          onClick={(e) => {
            e.preventDefault();
            resetCountdown(initialTime);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Countdown;
