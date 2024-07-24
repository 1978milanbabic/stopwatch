import React, {useEffect, useRef, useState} from 'react';
import './style.scss';
import { StopwatchUI } from './components/StopwatchUI';

const App: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (time: number) => {
    let milliseconds = (`0${time % 1000}`).slice(-3);
    // prevent glitchiness with leading zeros
    if (milliseconds === '00') {
      milliseconds = '000';
    }
    const seconds = (`0${Math.floor((time / 1000) % 60)}`).slice(-2);
    const minutes = (`0${Math.floor((time / 60000) % 60)}`).slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="stopwatch-container">
      <StopwatchUI 
        time={time} 
        isRunning={isRunning} 
        handleStartStop={handleStartStop} 
        handleReset={handleReset} 
      />
      <div className="time-display">{formatTime(time)}</div>
    </div>
  );
};

export default App;
