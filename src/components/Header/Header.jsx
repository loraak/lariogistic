import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header>
      <nav className={styles.header}>
        <div className={styles.logo}>
          <h1>Lariogistic</h1>
        </div>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.link}>Inicio</Link>
          <Link to="/gestiones" className={styles.link}>Gestiones</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
