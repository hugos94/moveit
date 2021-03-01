import {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  hasFinished: boolean;
  isActive: boolean;
  minutes: number;
  resetCountdown: () => void;
  seconds: number;
  startCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const initialTime = 25 * 60;

  const [hasFinished, setHasFinished] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(initialTime);

  const { startNewChallenge } = useContext(ChallengesContext);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(initialTime);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => setTime(time - 1), 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider value={{
      hasFinished,
      isActive,
      minutes,
      resetCountdown,
      seconds,
      startCountdown,
    }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
