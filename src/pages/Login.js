import React, {useState} from 'react';

 const API_URL = "http://131.181.190.87:3000";
 const Login = () =>  {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // handle the Log in condition and POST. 
    const handleSubmitClick = (e) => {
        e.preventDefault();
        fetch(`${API_URL}/user/login`, {
            method:"POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email, password})
        })
        .then((res) => res.json())
        .then((res) => {
               if (res.token != null) {
                    alert('Login Successfully')
                    localStorage.setItem("token", res.token)
                    window.location.href = "/";
                }else{
                 alert(res.message);}
        })
    }

  return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center"
        style={{height: "1000px",
                marginLeft: "auto",
                marginRight: "auto",}}>
            <main className="form-signin">
            <form onSubmit = {handleSubmitClick}>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email"
                        onChange={e => setEmail(e.target.value)}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button 
                    className="btn btn-primary btn-block"  
                >
                    Login
                </button>
            </form>
            </main>
        </div>
    )
}
export default Login;