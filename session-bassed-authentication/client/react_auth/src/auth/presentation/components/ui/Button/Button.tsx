import { useRef } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  onClick, 
  disabled,
  isLoading,
  className = ''
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || isLoading || disabled) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = styles.ripple;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    buttonRef.current.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
    
    onClick?.();
  };

  return (
    <button 
      ref={buttonRef}
      type={type}
      className={`${styles.button} ${styles[variant]} ${isLoading ? styles.isLoading : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {isLoading && <span className={styles.spinner} />}
      {children}
    </button>
  );
};
