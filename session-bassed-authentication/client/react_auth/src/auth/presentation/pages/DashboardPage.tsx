import { useAuthActions } from '../hooks/useAuth';
import { useAuthCheck } from '../hooks/useAuthCheck';
import { useEffect } from 'react';
import styles from './styles/Dashboard.module.css';

import { Header } from '../components/dashboard/Header';
import { ActiveSessionsList } from '../components/dashboard/ActiveSessionsList';

export const DashboardPage = () => {
  const { user, logout, logoutAll, logoutSingleDevice } = useAuthActions();
  const { sessions, fetchSessions } = useAuthCheck();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const userName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Usuario';
  const userId = user?.id || 'N/A';
  const userEmail = user?.email || '';
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const sessionCount = sessions 
    ? (Array.isArray(sessions) ? sessions.reduce((acc, s) => acc + ((s as { sessions?: unknown[] }).sessions?.length || 1), 0) : ((sessions as { sessions?: unknown[] }).sessions?.length || 0))
    : 0;

  const handleLogoutAll = async () => {
    if (!confirm('¿Cerrar sesión en todos los dispositivos?')) return;
    try {
      await logoutAll();
      await fetchSessions();
    } catch { alert('Error'); }
  };

  const handleLogoutSession = async (sessionId: string) => {
    if (!confirm('¿Cerrar esta sesión?')) return;
    try {
      await logoutSingleDevice(sessionId);
      await fetchSessions();
    } catch { alert('Error'); }
  };

  return (
    <div className={styles.app}>
      <div className={styles.gradientBg} />
      <div className={styles.meshGradient} />
      <div className={`${styles.floatingOrb} ${styles.orb1}`} />
      <div className={`${styles.floatingOrb} ${styles.orb2}`} />
      <div className={`${styles.floatingOrb} ${styles.orb3}`} />
      
      <Header onLogout={logout} />

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Hola, {userName}</h1>
          <p className={styles.pageSubtitle}>Gestiona tus dispositivos y sesiones activas</p>
        </div>

        <div className={styles.sectionsGrid}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Tu cuenta
              </h2>
            </div>
            <div className={styles.sectionBody}>
              <div className={styles.userRow}>
                <div className={styles.userAvatar}>
                  <span className={styles.userAvatarInitials}>{initials}</span>
                </div>
                <div className={styles.userMain}>
                  <div className={styles.userName}>{userName}</div>
                  <div className={styles.userEmail}>{userEmail}</div>
                </div>
              </div>
              <div className={styles.userStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>ID</span>
                  <span className={styles.statValue}>{userId.slice(0, 10)}...</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Dispositivos</span>
                  <span className={styles.statValue}>{sessionCount}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Estado</span>
                  <span className={styles.statValue}>Activo</span>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                Dispositivos conectados
              </h2>
              {sessionCount > 1 && (
                <button onClick={handleLogoutAll} className={styles.closeAllBtn}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Cerrar todas
                </button>
              )}
            </div>
            <div className={styles.sectionBody}>
              <ActiveSessionsList 
                sessions={sessions} 
                isLoading={!sessions} 
                onLogoutSession={handleLogoutSession}
              />
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Seguridad activa
              </h2>
            </div>
            <div className={styles.sectionBody}>
              <div className={styles.featuresGrid}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className={styles.featureText}>Cookies httpOnly</span>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className={styles.featureText}>Protección CSRF</span>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className={styles.featureText}>Rate Limiting</span>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className={styles.featureText}>Account Lockout</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
