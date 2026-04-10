import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button/Button';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.gradientBg} />
      
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Página no encontrada</h1>
        <p className={styles.description}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
          Vuelve al inicio para continuar navegando.
        </p>
        <div className={styles.actions}>
          <Link to="/">
            <Button variant="primary">Ir al inicio</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary">Iniciar sesión</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
