import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import Paper from '@mui/material/Paper';
import { GiOwl } from 'react-icons/gi';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });
  const [err, setErr] = useState(null);
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate(from, { replace: true });

    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <div className="login">
      <Paper elevation={3} className="card">
        <div className="left">
          <h1>EchoMingle</h1>
          <p>
            EchoMingle is a social media platform that connects people from all around the world. It's a place where users can share their thoughts, ideas, and experiences with others.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input name="username" onChange={handleChange} type="text" placeholder="Username" />
            <input name="password" onChange={handleChange} type="password" placeholder="Password" />
            {err && <small style={{ color: 'red' }}>{err}</small>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
