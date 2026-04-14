import styles from '../../pages/styles/Dashboard.module.css';

interface UserProfileCardProps {
  userName: string;
  userEmail: string;
  userId: string;
  initials: string;
}

export const UserProfileCard = ({ userName, userEmail, userId, initials }: UserProfileCardProps) => {
  return (
    <div className={styles.glassCard}>
      <div className={styles.userHeader}>
        <div className={styles.avatar}>
          <div className={styles.avatarGlow} />
          <span className={styles.avatarInitials}>{initials}</span>
        </div>
        <div>
          <h2 className={styles.userName}>{userName}</h2>
          <p className={styles.userEmail}>{userEmail}</p>
        </div>
      </div>
      
      <div className={styles.userMeta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>ID de Usuario</span>
          <code className={styles.metaValue}>{userId}</code>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Estado</span>
          <code className={styles.metaValue}>Autenticado</code>
        </div>
      </div>
    </div>
  );
};
