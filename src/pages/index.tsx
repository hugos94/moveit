import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengesProvider } from '../context/ChallengesContext';
import { CountdownProvider } from '../context/CountdownContext';
import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home({
  challengesCompleted,
  currentExperience,
  level,
}: HomeProps) {
  return (
    <ChallengesProvider
      challengesCompleted={challengesCompleted}
      currentExperience={currentExperience}
      level={level}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | Moveit</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { challengesCompleted, currentExperience, level } = ctx.req.cookies;

  return {
    props: {
      challengesCompleted: Number(challengesCompleted),
      currentExperience: Number(currentExperience),
      level: Number(level),
    },
  };
};
