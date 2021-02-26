import { useContext } from 'react';
import { MdClose, MdPlayArrow, MdCheckCircle } from "react-icons/md";
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const {
    hasFinished,
    isActive,
    minutes,
    resetCountdown,
    seconds,
    startCountdown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRigth] = String(seconds).padStart(2, '0').split('');

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
        <button className={`${styles.countdownButton} ${styles.countdownButtonFinished}`} disabled>
          Ciclo Encerrado
          <MdCheckCircle className={styles.countdownCheckCircleIcon} />
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
                  Abandonar ciclo <MdClose />
                </button>
              ) : (
                  <button
                    className={styles.countdownButton}
                    onClick={startCountdown}
                    type="button"
                  >
                    Iniciar um ciclo <MdPlayArrow />
                  </button>
                )
            }
          </>
        )}
    </div >
  );
}
