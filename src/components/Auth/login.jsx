import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../hooks/useAuth';
import styles from './login.module.css';

const Login = () => {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
    
        const result = await login(email, password);
        
        if (result.success) {
            console.log('Login exitoso:', result.data);
            window.location.href = '/dashboard';
        } else {
            setError(result.error);
        }
        
        setIsLoading(false);
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleLogin = () => {
        console.log('Google login clicked');
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Bienvenido</h2>
                    <p className={styles.subtitle}>Inicia sesión en tu cuenta</p>
                </div>

                {/* Login Form */}
                <div className={styles.card}>
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                        {/* Error Message */}
                        {error && (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        )}

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
                                    placeholder="usuario@lariogistic.com"
                                    disabled={isLoading}
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
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    className={styles.passwordToggle}
                                    disabled={isLoading}
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

                    {/* Divider */}
                    <div className={styles.divider}>
                        <div className={styles.dividerLine}>
                            <div className={styles.dividerBorder}></div>
                        </div>
                        <div className={styles.dividerContent}>
                            <span className={styles.dividerText}>o continúa con</span>
                        </div>
                    </div>

                    {/* Google Login Button */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className={styles.googleButton}
                        disabled={isLoading}
                    >
                        <svg className={styles.googleIcon} viewBox="0 0 24 24">
                            <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className={styles.googleText}>Continuar con Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;