import { useState } from 'react';
import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import { ErrorMessage } from '../../ui/ErrorMessage/ErrorMessage';
import styles from './LoginForm.module.css';
import { useAuthActions } from '../../../hooks/useAuth';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login({ email, password, rememberMe });
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
      
      <ErrorMessage message={error} />

      <Input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        required
        autoComplete="email"
        disabled={isLoading}
      />

      <Input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
        autoComplete="current-password"
        disabled={isLoading}
      />

      <div className={styles.optionsRow}>
        <label className={styles.toggleWrapper}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
            className={styles.toggleInput}
          />
          <div className={styles.toggleTrack}>
            <div className={styles.toggleThumb} />
          </div>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>Recordar sesión</span>
            <span className={styles.toggleDesc}>Mantener sesión activa en este dispositivo</span>
          </div>
        </label>
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        isLoading={isLoading}
        className={styles.fullWidthBtn}
      >
        Iniciar Sesión
      </Button>
    </form>
  );
};
