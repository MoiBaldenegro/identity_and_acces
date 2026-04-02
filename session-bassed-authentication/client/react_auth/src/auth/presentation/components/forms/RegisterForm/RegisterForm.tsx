// RegisterForm.tsx
// src/presentation/components/forms/RegisterForm/RegisterForm.tsx
import { useState } from 'react';
import { Button } from '../../ui/Button/Button';
import styles from './RegisterForm.module.css';
import { useAuthActions } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuthActions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Limpiar error al escribir
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validaciones básicas en frontend
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

      // if(!isAuthenticated ) throw new Error('Error al registrar usuario es este HDP'); 
      
      navigate('/dashboard'); // Redirigir a la página principal después del registro
      
      // El hook de auth ya hace login automático y redirecciona
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Nombre (opcional)"
          className={styles.input}
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Apellido (opcional)"
          className={styles.input}
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
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Contraseña (mínimo 12 caracteres)"
        className={styles.input}
        required
      />

      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirmar contraseña"
        className={styles.input}
        required
      />

      {error && <p className={styles.error}>{error}</p>}

      <Button 
        type="submit" 
        variant="primary" 
        disabled={isLoading}
      >
        {isLoading ? 'Registrando...' : 'Crear cuenta'}
      </Button>
    </form>
  );
};