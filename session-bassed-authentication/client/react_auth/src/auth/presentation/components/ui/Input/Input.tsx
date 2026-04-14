import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = ({ error, className = '', ...props }: InputProps) => {
  return (
    <div className={styles.inputGroup}>
      <input
        className={`${styles.input} ${error ? styles.errorInput : ''} ${className}`}
        {...props}
      />
    </div>
  );
};
