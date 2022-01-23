import React, {useState} from 'react';
import "./styles.css"


const API_URL = "http://131.181.190.87:3000";

const Register = () =>  {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // handle the Register condition and POST. 
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(password === confirmPassword) {
        fetch(`${API_URL}/user/register`, {
            method:"POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email, password,confirmPassword})
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.error) {
                alert(res.message)
            } else {
                alert(res.message)
                 window.location.href = "/Login";
            }
        })
    } else {
            alert('Passwords do not match');
        }
    }

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center"
        style={{height: "1000px",
                marginLeft: "auto",
                marginRight: "auto",}}>
            <main className="form-signin">
            <form onSubmit = {handleSubmitClick}>
                <div className="form-group text-left">
                <label >Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       placeholder="Enter email"
                       onChange={e => setEmail(e.target.value)}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label>Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        minlength="1"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                  <div className="form-group text-left">
                    <label>Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        minlength="1"
                        onChange={e => setConfirmPassword(e.target.value)}
                        
                    />
                </div>
                <button 
                    type="submit"
                    className="btn btn-primary btn-block"  
                >
                    Register
                </button>
            </form>
            </main>
        </div>
    )
}
export default Register;