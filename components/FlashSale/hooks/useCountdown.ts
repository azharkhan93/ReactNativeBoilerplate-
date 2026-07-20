import { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

export const useCountdown = (endTime?: Date): TimeLeft => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!endTime) return;

    const calculateTime = () => {
      const diff = Math.max(0, endTime.getTime() - Date.now());
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return timeLeft;
};
