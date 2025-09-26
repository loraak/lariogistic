import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <nav>
      <Link to="/">Inicio</Link> |{" "}
      <Link to="/gestiones">Gestiones</Link>
    </nav>
  );
}

export default Home;
