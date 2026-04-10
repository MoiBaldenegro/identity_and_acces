import { Button } from '../components/ui/Button/Button';
import { useAuthActions } from '../hooks/useAuth';
import styles from './styles/Dashboard.module.css';

export const DashboardPage = () => {
  const { user, logout } = useAuthActions();
  const userName = user?.getFullName() || 'Usuario';
  const userId = user?.getUserId() || 'N/A';
  const userEmail = user?.getUserEmail() || '';
  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={styles.app}>
      <div className={styles.gradientBg} />
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <span className={styles.brandName}>AuthApp</span>
        </div>
        <Button variant="secondary" onClick={logout}>
          Cerrar sesión
        </Button>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            ¡Bienvenido, {userName}!
          </h1>
          <p className={styles.heroSubtitle}>
            Has iniciado sesión correctamente en tu cuenta segura.
          </p>
        </section>

        <div className={styles.userCard}>
          <div className={styles.userHeader}>
            <div className={styles.avatar}>
              <div className={styles.avatarGlow} />
              <span className={styles.avatarInitials}>{initials}</span>
            </div>
            <div>
              <h2 className={styles.userName}>{userName}</h2>
              <p className={styles.userEmail}>{userEmail}</p>
            </div>
          </div>
          
          <div className={styles.userMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>ID de Usuario</span>
              <code className={styles.metaValue}>{userId}</code>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Estado</span>
              <code className={styles.metaValue}>Autenticado</code>
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            Características de la Aplicación
          </h3>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <div className={styles.featureTitle}>Arquitectura Limpia</div>
                <div className={styles.featureDesc}>Separación clara entre presentación, dominio e infraestructura.</div>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <div className={styles.featureTitle}>Gestión de Estado</div>
                <div className={styles.featureDesc}>Patrón store para manejo centralizado del estado de autenticación.</div>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <div className={styles.featureTitle}>UI Premium</div>
                <div className={styles.featureDesc}>Diseño glassmorphism con efectos de profundidad y luz.</div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.securityCard}>
            <div className={styles.securityHeader}>
              <div className={styles.securityIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className={styles.securityTitle}>Seguridad Implementada</h3>
            </div>
            <div className={styles.securityGrid}>
              <div className={styles.securityItem}>
                <svg className={styles.securityCheck} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                <span className={styles.securityText}>Sesión httpOnly</span>
              </div>
              <div className={styles.securityItem}>
                <svg className={styles.securityCheck} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                <span className={styles.securityText}>Protección CSRF</span>
              </div>
              <div className={styles.securityItem}>
                <svg className={styles.securityCheck} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                <span className={styles.securityText}>Rate Limiting</span>
              </div>
              <div className={styles.securityItem}>
                <svg className={styles.securityCheck} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                <span className={styles.securityText}>Account Lockout</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
