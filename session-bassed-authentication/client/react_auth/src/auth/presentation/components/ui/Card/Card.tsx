import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  className?: string;
}

export function Card({ children, hoverable = false, className = '' }: CardProps) {
  return (
    <div className={`${styles.card} ${hoverable ? styles.cardHoverable : ''} ${className}`}>
      {children}
    </div>
  );
}
