import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  logo: React.ReactNode;
  footer?: React.ReactNode;
}

export const AuthLayout = ({ children, title, subtitle, logo, footer }: AuthLayoutProps) => {
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
              {logo}
            </div>
          </div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        
        {children}
        
        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
