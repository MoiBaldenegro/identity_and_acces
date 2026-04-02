// LoginPage.tsx
// src/presentation/pages/LoginPage.tsx
import { LoginForm } from '../components/forms/LoginForm/LoginForm';
import styles from './styles/LoginPage.module.css';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Bienvenido</h1>
        <p className={styles.subtitle}>Inicia sesión en tu cuenta</p>
        <LoginForm />
        <p className={styles.link}>
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};