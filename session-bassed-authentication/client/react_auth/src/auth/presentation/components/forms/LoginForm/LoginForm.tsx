import { useState } from 'react';
import { Button } from '../../ui/Button/Button';
import styles from './LoginForm.module.css';
import { useAuthActions } from '../../../hooks/useAuth';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login({ email, password });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>Iniciar Sesión</h2>
      
      {error && (
        <div className={styles.error} role="alert">
          <svg className={styles.errorIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <div className={styles.inputGroup}>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className={styles.input}
          required
          autoComplete="email"
          disabled={isLoading}
        />
      </div>

      <div className={styles.inputGroup}>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className={styles.input}
          required
          autoComplete="current-password"
          disabled={isLoading}
        />
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        isLoading={isLoading}
        className={styles.submitBtn}
      >
        Iniciar Sesión
      </Button>
    </form>
  );
};
