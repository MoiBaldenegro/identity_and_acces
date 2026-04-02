// LoginForm.tsx
// src/presentation/components/forms/LoginForm/LoginForm.tsx
import { useState } from 'react';
import { Button } from '../../ui/Button/Button';
import styles from './LoginForm.module.css';
import { useAuthActions } from '../../../hooks/useAuth';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      window.location.href = '/dashboard'; // o usar navigate
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Iniciar Sesión</h2>
      
      {error && <p className={styles.error}>{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        className={styles.input}
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        className={styles.input}
        required
      />

      <Button type="submit" variant="primary">
        Iniciar Sesión
      </Button>
    </form>
  );
};