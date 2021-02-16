import  { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css';
import { useHistory } from "react-router-dom";

const Register = () => {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [password2,setPassword2] = useState('')
const [message,setMessage] = useState('')

let history = useHistory();

   const onSubmit = (e) => {
        e.preventDefault();
    
        const data = {
            email:email,
            password:password
        };
    
        axios.post('http://localhost:5000/api/auth/register', data)
          .then( async (result) =>  {
          
            history.push("/login");
          })
          .catch((error) => {
            if(error.response.status === 505) {
             setMessage( "adresse email deja utilisé " );
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
          <h2 className="form-signin-heading">creer votre compte</h2>
          <label > addresse Email </label>
          <input type="email" className="form-control" placeholder="Email address" name="username" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          <label >mot de passe </label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
          <label >repeter votre mot de passe </label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={password2} onChange={(e)=>setPassword2(e.target.value)} required/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">creer votre compte</button>
          <p>
            deja un membre ?  <Link to="/login"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> connecter votre compte</Link>
          </p>
        </form>
      </div>

)
        }

export default Register;