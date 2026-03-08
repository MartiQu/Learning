import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomeScreen } from './screens/HomeScreen';
import { LevelMapScreen } from './screens/LevelMapScreen';
import { LevelIntroScreen } from './screens/LevelIntroScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultScreen } from './screens/ResultScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { CoursesScreen } from './screens/CoursesScreen';
import { ExamScreen } from './screens/ExamScreen';
import { GamesScreen } from './screens/GamesScreen';
import { SnakeGameScreen } from './screens/SnakeGameScreen';

export function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/system/:systemId" element={<LevelMapScreen />} />
        <Route path="/system/:systemId/level/:levelNumber" element={<LevelIntroScreen />} />
        <Route path="/system/:systemId/level/:levelNumber/game" element={<GameScreen />} />
        <Route path="/system/:systemId/level/:levelNumber/result" element={<ResultScreen />} />
        <Route path="/system/:systemId/exam" element={<ExamScreen />} />
        <Route path="/home" element={<DashboardScreen />} />
        <Route path="/courses" element={<CoursesScreen />} />
        <Route path="/games" element={<GamesScreen />} />
        <Route path="/games/snake/:systemId" element={<SnakeGameScreen />} />
      </Routes>
    </AnimatePresence>
  );
}
