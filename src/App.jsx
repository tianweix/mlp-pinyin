import { AppProvider, useApp } from './context/AppContext';
import FloatingDecorations from './components/FloatingDecorations';
import ConfettiContainer from './components/ConfettiContainer';
import DetailModal from './components/DetailModal';
import MascotBubble from './components/MascotBubble';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import LearnScreen from './screens/LearnScreen';
import GameScreen from './screens/GameScreen';
import RewardScreen from './screens/RewardScreen';

function AppInner() {
  const { activeScreen } = useApp();

  return (
    <div id="app">
      <FloatingDecorations />

      <WelcomeScreen active={activeScreen === 'welcome'} />
      <MapScreen active={activeScreen === 'map'} />
      <LearnScreen active={activeScreen === 'learn'} />
      <GameScreen active={activeScreen === 'game'} />
      <RewardScreen active={activeScreen === 'reward'} />

      <DetailModal />
      <MascotBubble />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ConfettiContainer>
        <AppInner />
      </ConfettiContainer>
    </AppProvider>
  );
}
