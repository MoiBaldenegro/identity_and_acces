import styles from '../../pages/styles/Dashboard.module.css';

interface HeroSectionProps {
  userName: string;
}

export const HeroSection = ({ userName }: HeroSectionProps) => {
  return (
    <section className={`${styles.glassCard} ${styles.hero}`}>
      <h1 className={styles.heroTitle}>
        ¡Bienvenido de nuevo, {userName}!
      </h1>
      <p className={styles.heroSubtitle}>
        Tu cuenta está segura. Gestiona tus dispositivos y sesiones desde aquí.
      </p>
    </section>
  );
};
