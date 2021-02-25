import { createContext, ReactNode, useState } from "react";
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number,
}

interface ChallengesContextData {
  activeChallenge: Challenge,
  challengesCompleted: number,
  completeChallenge: () => void,
  currentExperience: number,
  experienceToNextLevel: number,
  level: number,
  levelUp: () => void,
  resetChallenge: () => void,
  startNewChallenge: () => void,
}

interface ChallengesProviderProps {
  children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    setActiveChallenge(challenges[randomChallengeIndex]);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    const newExperience = currentExperience + activeChallenge.amount;
    if (newExperience < experienceToNextLevel) {
      setCurrentExperience(newExperience);
    } else {
      setCurrentExperience(newExperience - experienceToNextLevel);
      levelUp();
    }
    resetChallenge();
  }

  return (
    <ChallengesContext.Provider
      value={{
        activeChallenge,
        challengesCompleted,
        completeChallenge,
        currentExperience,
        experienceToNextLevel,
        level,
        levelUp,
        resetChallenge,
        startNewChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}