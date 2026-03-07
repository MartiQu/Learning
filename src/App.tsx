import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomeScreen } from './screens/HomeScreen';
import { SystemSelectScreen } from './screens/SystemSelectScreen';
import { LevelMapScreen } from './screens/LevelMapScreen';
import { LevelIntroScreen } from './screens/LevelIntroScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultScreen } from './screens/ResultScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { DashboardScreen } from './screens/DashboardScreen';

export function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/select" element={<SystemSelectScreen />} />
        <Route path="/system/:systemId" element={<LevelMapScreen />} />
        <Route path="/system/:systemId/level/:levelNumber" element={<LevelIntroScreen />} />
        <Route path="/system/:systemId/level/:levelNumber/game" element={<GameScreen />} />
        <Route path="/system/:systemId/level/:levelNumber/result" element={<ResultScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/home" element={<DashboardScreen />} />
      </Routes>
    </AnimatePresence>
  );
}
