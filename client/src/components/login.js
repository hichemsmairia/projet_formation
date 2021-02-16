import  { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css';
import { useHistory } from "react-router-dom";

const Login = () => {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [message,setMessage] = useState('')

let history = useHistory();

   const onSubmit = (e) => {
        e.preventDefault();
    
        const data = {
            email:email,
            password:password
        };
    
        axios.post('http://localhost:5000/api/auth/login', data)
          .then( async (result) =>  {
           await localStorage.setItem("jwtToken",result.data.token)
            axios.defaults.headers.common['Authorization'] = result.data.token;
            console.log("le token dans le local strogae" + localStorage.getItem('jwtToken'))
            setMessage('')
            history.push("/home");
          })
          .catch((error) => {
            if(error.response.status === 401) {
             setMessage( "email n'existe pas " );
            } else {

            } if (error.response.status === 505) {
              setMessage("email et password sont differentes " )
            }
          });
      }

return(
<div className="container">
        <form className="form-signin" onSubmit={onSubmit}>
          {message !== '' &&
            <div className="alert alert-warning alert-dismissible" role="alert">
              { message }
            </div>
          }
          <h2 className="form-signin-heading">vuillez vous connecter</h2>
          <label className="sr-only"> addresse Email </label>
          <input type="email" className="form-control" placeholder="Email address" name="username" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          <label className="sr-only">mot de passe </label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">connection</button>
          <p>
            Not a member? <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> creer votre compte</Link>
          </p>
        </form>
      </div>

)
        }

export default Login;