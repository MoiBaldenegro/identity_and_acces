// DashboardPage.tsx
// src/presentation/pages/DashboardPage.tsx
import { Button } from '../components/ui/Button/Button';
import { useAuthActions } from '../hooks/useAuth';
import styles from './styles/Dashboard.module.css';

export const DashboardPage = () => {
  const { user, logout } = useAuthActions();
  const userName = user?.getFullName();
  const userId = user?.getUserId();
  // const userEmail = user?.getUserEmail();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <Button variant="secondary" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>
      <div className={styles.content}>
        <p>Bienvenido, <strong>{userName}</strong></p>
        <p>ID de usuario: <code>{userId}</code></p>
        <div className={styles.info}>
          <h2>API en acción</h2>
          <p>✅ Sesión basada en cookies httpOnly</p>
          <p>✅ CSRF protegido</p>
          <p>✅ Account lockout + Rate limit</p>
        </div>
      </div>
    </div>
  );
};
