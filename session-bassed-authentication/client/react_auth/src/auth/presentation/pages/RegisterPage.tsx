import { RegisterForm } from '../components/forms/RegisterForm/RegisterForm';
import { AuthLayout } from '../components/auth-layout/AuthLayout';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const LogoIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/>
      <line x1="22" y1="11" x2="16" y2="11"/>
    </svg>
  );

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Completa el formulario para registrarte"
      logo={LogoIcon}
      footer={<>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></>}
    >
      <RegisterForm />
    </AuthLayout>
  );
};
