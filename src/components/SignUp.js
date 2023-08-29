import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"",email: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name ,email, password})
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            localStorage.setItem('token' , json.authtoken);
            navigate("/");  
         // is token is verified successful this will redirect to the home page
         props.showAlert("Account created successfully","success") 
            }
        else{
            props.showAlert("Invalid credential","Error")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp" />

                    <div className="mb-3">

                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />
                    </div>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  onChange={onChange} name="password" id="password" required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control"  onChange={onChange} name="cpassword" id="cpassword" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup