import { Link } from 'react-router-dom';
import { LoginForm } from '../components/forms/LoginForm/LoginForm';
import { Button } from '../components/ui/Button/Button';
import { AuthLayout } from '../components/auth-layout/AuthLayout';
import { useAuthStore } from '../store/useAuthStore';
import { useAuthActions } from '../hooks/useAuth';

export const LoginPage = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { logout } = useAuthActions();

  const handleLogout = async () => {
    await logout();
  };

  const LogoIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );

  return (
    <AuthLayout
      title="Bienvenido"
      subtitle={isAuthenticated ? 'Ya has iniciado sesión' : 'Inicia sesión en tu cuenta'}
      logo={LogoIcon}
      footer={!isAuthenticated && (
        <>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></>
      )}
    >
      {isAuthenticated && user ? (
        <LoggedInState user={user} onLogout={handleLogout} />
      ) : (
        <LoginForm />
      )}
    </AuthLayout>
  );
};

const LoggedInState = ({ user, onLogout }: { user: any; onLogout: () => void }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
    <div style={{ 
      padding: '18px', 
      background: 'var(--bg-surface)', 
      border: '1px solid var(--border-glass)', 
      borderRadius: '14px' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
          borderRadius: '12px',
          boxShadow: '0 0 24px var(--primary-glow)'
        }}>
          <span style={{ 
            fontSize: '1rem', 
            fontWeight: 700, 
            color: 'white',
            textTransform: 'uppercase'
          }}>
            {user?.firstName ? `${user.firstName.charAt(0)}${user.lastName?.charAt(0) || ''}` : user?.email.charAt(0).toUpperCase() || '?'}
          </span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
            {user?.firstName} {user?.lastName}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{user?.email}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--success)' }}>
        <span style={{ width: '6px', height: '6px', background: 'var(--success)', borderRadius: '50%' }} />
        Sesión activa
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Button variant="primary" onClick={() => window.location.href = '/dashboard'}>
        Ir al Dashboard
      </Button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '4px 0', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
        <span style={{ flex: 1, height: '1px', background: 'var(--border-glass)' }} />
        o
        <span style={{ flex: 1, height: '1px', background: 'var(--border-glass)' }} />
      </div>
      <Button variant="secondary" onClick={onLogout}>
        Cerrar sesión
      </Button>
    </div>
  </div>
);