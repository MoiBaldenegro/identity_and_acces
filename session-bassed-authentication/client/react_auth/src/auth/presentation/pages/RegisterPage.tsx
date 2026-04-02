// RegisterPage.tsx
// src/presentation/pages/RegisterPage.tsx
import { RegisterForm } from '../components/forms/RegisterForm/RegisterForm';
import styles from './styles/RegisterPger.module.css';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear cuenta</h1>
        <RegisterForm />
        <p className={styles.link}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};