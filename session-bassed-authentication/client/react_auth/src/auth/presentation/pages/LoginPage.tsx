import { Link } from 'react-router-dom';
import { LoginForm } from '../components/forms/LoginForm/LoginForm';
import { Button } from '../components/ui/Button/Button';
import styles from './styles/LoginPage.module.css';
import { useAuthStore } from '../store/useAuthStore';
import { useAuthActions } from '../hooks/useAuth';

export const LoginPage = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { logout } = useAuthActions();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={styles.scene}>
      <div className={styles.gradientBg} />
      <div className={styles.meshGradient} />
      <div className={`${styles.floatingOrb} ${styles.orb1}`} />
      <div className={`${styles.floatingOrb} ${styles.orb2}`} />
      <div className={`${styles.floatingOrb} ${styles.orb3}`} />
      
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoWrapper}>
            <div className={styles.logoGlow} />
            <div className={styles.logo}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
          </div>
          <h1 className={styles.title}>Bienvenido</h1>
          <p className={styles.subtitle}>
            {isAuthenticated ? 'Ya has iniciado sesión' : 'Inicia sesión en tu cuenta'}
          </p>
        </div>
        
        {isAuthenticated && user ? (
          <div className={styles.loggedInState}>
            <div className={styles.userCard}>
              <div className={styles.userInfo}>
                <div className={styles.avatar}>
                  <span className={styles.avatarInitials}>
                    {user.getFullName()
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </span>
                </div>
                <div className={styles.userDetails}>
                  <div className={styles.userName}>{user.getFullName()}</div>
                  <div className={styles.userEmail}>{user.getUserEmail()}</div>
                </div>
              </div>
              <div className={styles.status}>
                <span className={styles.statusDot} />
                Sesión activa
              </div>
            </div>

            <div className={styles.loggedInActions}>
              <Button 
                variant="primary" 
                onClick={() => window.location.href = '/dashboard'}
                className={styles.goDashboardBtn}
              >
                Ir al Dashboard
              </Button>
              
              <div className={styles.divider}>o</div>
              
              <Button 
                variant="secondary" 
                onClick={handleLogout}
                className={styles.logoutBtn}
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.formWrapper}>
              <LoginForm />
            </div>
            
            <div className={styles.footer}>
              ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
