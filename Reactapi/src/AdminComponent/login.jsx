
import { useState } from 'react';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //   const register = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await axios.post('http://localhost:3000/admin/register', { email, password });
  //       localStorage.setItem('token', response.data.token);
  //       console.log(response  )
  //     } catch (error) {
  //       console.error(error.response.data.message);
  //     }
  //   };
  const handleLogin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    try {
      const response = await axios.post(`http://localhost:3000/admin/login?token=${token}`, { email, password });
      localStorage.setItem('token', response.data.token);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
    setEmail('')
    setPassword('')
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  }
  const isAuthenticated = localStorage.getItem('token') !== null;
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {/* <button onClick={register}>Register</button> */}
        {/* <button onClick={handleLogout}>Logout</button> */}
        {isAuthenticated ? (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : null}
      </form>
    </div>
  );
};

export default Login;

