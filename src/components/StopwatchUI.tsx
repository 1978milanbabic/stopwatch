import React from 'react';
import './style.scss';

interface StopwatchUIProps {
  time: number;
  isRunning: boolean;
  handleStartStop: () => void;
  handleReset: () => void;
}

export const StopwatchUI: React.FC<StopwatchUIProps> = ({ time, isRunning, handleStartStop, handleReset }) => {
  const seconds = (time / 1000) % 60;
  const minutes = (time / 60000) % 60;

  // Create the tick marks
  const ticks = [];
  for (let i = 0; i < 60; i++) {
    const isMajor = i % 5 === 0;
    ticks.push(
      <line
        key={i}
        x1="50"
        y1="2"
        x2="50"
        y2={isMajor ? "10" : "5"}
        stroke="white"
        strokeWidth={isMajor ? "2" : "1"}
        transform={`rotate(${i * 6} 50 50)`}
      />
    );
  }

  return (
    <div className="stopwatch-container">
      <div className='stopwatch-inner'>
        <div className="button-container">
          {/* Buttons and connections for the buttons */}
          <button className="reset-button" onClick={handleReset}></button>
          <button className="start-stop-button" onClick={handleStartStop}></button>
          <svg className="connections" viewBox="0 0 100 100">
            <line
              x1="20"
              y1="25"
              x2="50"
              y2="50"
              className="connection-line connection-left"
            />
            <line
              x1="80"
              y1="25"
              x2="50"
              y2="50"
              className="connection-line connection-right"
            />
          </svg>
        </div>
        {/* Stopwatch inner */}
        <svg className="stopwatch" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" className="circle" />
          {ticks}
          {/* Seconds pointer */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            className="pointer"
            style={{ transform: `rotate(${seconds * 6}deg)` }}
          />
          {/* Minutes pointer */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="20"
            className="pointer"
            style={{ transform: `rotate(${minutes * 6}deg)` }}
          />
        </svg>
      </div>
    </div>
  );
};
