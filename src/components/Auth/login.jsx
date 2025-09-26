import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from './login.module.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    
    // Simulación de llamada al servidor.
    setTimeout(() => {
        setIsLoading(false);
        console.log('Login attempt:', { email, password });
    }, 2000);
    };

const togglePassword = () => {
    setShowPassword(!showPassword);
};

return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
        {/* Logo/Brand */}
        <div className={styles.header}>
            <h2 className={styles.title}>Bienvenido</h2>
            <p className={styles.subtitle}>Inicia sesión en tu cuenta</p>
        </div>

        {/* Login Form */}
        <div className={styles.card}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
            {/* Email Field */}
            <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                Correo electrónico
                </label>
                <div className={styles.inputContainer}>
                <div className={styles.inputIcon}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    placeholder="larios@email.com"
                />
                </div>
            </div>

            {/* Password Field */}
            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                Contraseña
                </label>
                <div className={styles.inputContainer}>
                    <div className={styles.inputIcon}>
                    <FontAwesomeIcon icon={faLock} />
                    </div>
                    <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${styles.input} ${styles.passwordInput}`}
                    placeholder="••••••••"
                    />
                    <button
                    type="button"
                    onClick={togglePassword}
                    className={styles.passwordToggle}
                    >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                </div>

                {/* Login Button */}
                <button
                type="submit"
                disabled={isLoading}
                className={styles.loginButton}
                >
                {isLoading ? (
                    <div className={styles.spinner}></div>
                ) : (
                    <span>Iniciar Sesión</span>
                )}
                </button>
            </form>
            </div>
        </div>
        </div>
    );
};

export default Login;