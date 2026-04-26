import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../helpers/ContextApi';
import { post } from '../helpers/FecthApi';

const Login = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordView, setPasswordView] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await post('login', { nickname, password });
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        navigate('/');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type={passwordView ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
          <button
            type="button"
            onClick={() => setPasswordView(!passwordView)}
            style={{ marginTop: '5px' }}
          >
            {passwordView ? 'Hide' : 'Show'} Password
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
