import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;
const initialTime = 0.05 * 60;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRigth] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(initialTime);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => setTime(time - 1), 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRigth}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRigth}</span>
        </div>
      </div>

      { hasFinished ? (
        <button className={styles.countdownButton} disabled>
          Ciclo Encerrado
        </button>
      ) : (
          <>
            {
              isActive ? (
                <button
                  className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                  onClick={resetCountdown}
                  type="button"
                >
                  Abandonar ciclo
                </button>
              ) : (
                  <button
                    className={styles.countdownButton}
                    onClick={startCountdown}
                    type="button"
                  >
                    Iniciar um ciclo
                  </button>
                )
            }
          </>
        )}
    </div >
  );
}
