import dashStyles from '../../pages/styles/Dashboard.module.css';

interface ActiveSessionsListProps {
  sessions: unknown;
  isLoading?: boolean;
  onLogoutSession?: (sessionId: string) => void;
}

const getDeviceIcon = (deviceInfo?: string) => {
  const device = deviceInfo?.toLowerCase() || '';
  
  if (device.includes('mobile') || device.includes('iphone') || device.includes('android') || device.includes('phone')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <line x1="12" y1="18" x2="12" y2="18"/>
      </svg>
    );
  }
  
  if (device.includes('mac') || device.includes('apple') || device.includes('macbook') || device.includes('ipad')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    );
  }
  
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  );
};

const formatDateTime = (dateStr?: string) => {
  if (!dateStr) return 'Fecha unknown';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return `Hoy ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (diffDays === 1) {
    return `Ayer ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (diffDays < 7) {
    return `${diffDays} días`;
  } else {
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  }
};

export const ActiveSessionsList = ({ sessions, isLoading = false, onLogoutSession }: ActiveSessionsListProps) => {
  const sessionList = sessions 
    ? (Array.isArray(sessions) ? sessions.flatMap((s: unknown) => (s as { sessions?: unknown[] }).sessions || s) : ((sessions as { sessions?: unknown[] }).sessions || []))
    : [];

  if (isLoading) {
    return <div className={dashStyles.loading}><div className={dashStyles.spinner} /></div>;
  }

  if (sessionList.length === 0) {
    return <div className={dashStyles.empty}>No hay dispositivos conectados</div>;
  }

  return (
    <div className={dashStyles.sessionList}>
      {sessionList.map((session: unknown, i: number) => {
        const s = session as { sessionId?: string; deviceInfo?: string; ipAddress?: string; createdAt?: string; isCurrent?: boolean };
        const isCurrent = s.isCurrent;
        
        return (
          <div key={s.sessionId || i} className={`${dashStyles.sessionItem} ${isCurrent ? dashStyles.current : ''}`}>
            <div className={dashStyles.sessionIcon}>
              {getDeviceIcon(s.deviceInfo)}
            </div>
            
            <div className={dashStyles.sessionInfo}>
              <div className={dashStyles.sessionDeviceName}>
                <span className={dashStyles.deviceName}>{s.deviceInfo || 'Dispositivo desconocido'}</span>
                {isCurrent && <span className={dashStyles.currentBadge}>Actual</span>}
              </div>
              <div className={dashStyles.sessionMeta}>
                <span className={dashStyles.metaItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span className={dashStyles.ipAddress}>{s.ipAddress || 'Sin IP'}</span>
                </span>
                <span className={dashStyles.metaItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>{formatDateTime(s.createdAt)}</span>
                </span>
              </div>
            </div>

            {!isCurrent && onLogoutSession && (
              <div className={dashStyles.sessionActions}>
                <button onClick={() => onLogoutSession(s.sessionId || '')} className={dashStyles.logoutBtn}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Cerrar
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
