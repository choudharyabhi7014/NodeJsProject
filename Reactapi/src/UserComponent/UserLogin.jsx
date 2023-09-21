import axios from "axios";
import { useState } from "react";
import {   useNavigate } from "react-router-dom";

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const register = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/register', { email, password });
      localStorage.setItem('token', response.data.token);
      console.log(response)
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    try {
      const response = await axios.post(`http://localhost:3000/user/login?token=${token}`, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/')
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
  
  const isAuthenticated = localStorage.getItem('token') !== null
  return (
    <>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">

                    <div className="text-center">
                      <img src='lotus.jpg'
                    style={{width:"185px"}} alt="logo"/>
                      <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                    </div>

                    <form>
                      <p>Please login to your account</p>
                      <div className="form-outline mb-4">
                        <input type="email" id="form2Example11" className="form-control"
                          placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" id="form2Example22" className="form-control"placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={handleLogin}>Log
                          in</button>
                        <button onClick={()=>navigate('/forget')}>Forgot password?</button>
                      
                        
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Dont have an account?</p>
                        <button type="button" className="btn btn-outline-danger" onClick={register}>Create new</button>
                      </div>
                      {isAuthenticated ? (
                        <>
                          <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                        </>
                      ) : null}
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserLogin
