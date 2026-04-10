import { useState } from 'react';
import { Button } from '../../ui/Button/Button';
import styles from './RegisterForm.module.css';
import { useAuthActions } from '../../../hooks/useAuth';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuthActions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 12) {
      setError('La contraseña debe tener al menos 12 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName.trim() || undefined,
        lastName: formData.lastName.trim() || undefined,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al registrar usuario';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Nombre"
          className={styles.input}
          autoComplete="given-name"
          disabled={isLoading}
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Apellido"
          className={styles.input}
          autoComplete="family-name"
          disabled={isLoading}
        />
      </div>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Correo electrónico"
        className={styles.input}
        required
        autoComplete="email"
        disabled={isLoading}
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Contraseña (mínimo 12 caracteres)"
        className={styles.input}
        required
        autoComplete="new-password"
        minLength={12}
        disabled={isLoading}
      />

      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirmar contraseña"
        className={styles.input}
        required
        autoComplete="new-password"
        disabled={isLoading}
      />

      {error && (
        <div className={styles.error} role="alert">
          <svg className={styles.errorIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <div className={styles.hint}>
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
        </svg>
        Usa al menos 12 caracteres con mayúsculas, minúsculas y números
      </div>

      <Button 
        type="submit" 
        variant="secondary" 
        isLoading={isLoading}
        className={styles.submitBtn}
      >
        Crear cuenta
      </Button>
    </form>
  );
};
