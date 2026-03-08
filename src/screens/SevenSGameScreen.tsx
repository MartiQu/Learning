import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { SevenSGame } from '../games/SevenSGame';

export function SevenSGameScreen() {
  const navigate = useNavigate();
  const { systemId } = useParams<{ systemId: string }>();
  const { user, loading } = useAuthStore();

  if (!loading && !user) {
    navigate('/');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
        <div className="text-white/30 text-sm">Ielādē...</div>
      </div>
    );
  }

  // Only available for 7s system
  if (systemId !== '7s') {
    navigate('/games');
    return null;
  }

  return <SevenSGame />;
}
