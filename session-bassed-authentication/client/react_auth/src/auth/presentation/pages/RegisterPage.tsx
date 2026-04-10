import { RegisterForm } from '../components/forms/RegisterForm/RegisterForm';
import styles from './styles/RegisterPger.module.css';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
            </div>
          </div>
          <h1 className={styles.title}>Crear cuenta</h1>
          <p className={styles.subtitle}>Completa el formulario para registrarte</p>
        </div>
        
        <div className={styles.formWrapper}>
          <RegisterForm />
        </div>
        
        <div className={styles.footer}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};
