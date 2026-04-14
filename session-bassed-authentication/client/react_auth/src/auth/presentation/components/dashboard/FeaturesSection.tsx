import styles from '../../pages/styles/Dashboard.module.css';

export const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'Arquitectura Limpia',
      desc: 'Separación clara entre presentación, dominio e infraestructura.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
      title: 'Gestión de Estado',
      desc: 'Patrón store para manejo centralizado del estado de autenticación.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      title: 'Seguridad Avanzada',
      desc: 'Cookies httpOnly, protección CSRF y rate limiting integrados.'
    }
  ];

  return (
    <section className={`${styles.glassCard} ${styles.securityCard}`}>
      <div className={styles.securityHeader}>
        <div className={styles.securityIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h3 className={styles.securityTitle}>Características de la App</h3>
      </div>
      
      <div className={styles.featuresGrid}>
        {features.map((feature, i) => (
          <div key={i} className={styles.featureItem}>
            <div className={styles.featureIcon}>
              {feature.icon}
            </div>
            <div className={styles.featureContent}>
              <div className={styles.featureTitle}>{feature.title}</div>
              <div className={styles.featureDesc}>{feature.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
