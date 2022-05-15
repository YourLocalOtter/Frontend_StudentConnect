import {useState} from "react";
import dfetch from "../utils/fetch";

import {
    useNavigate,
  } from "react-router-dom";
import { useJWT } from "../hooks/auth";

export default function(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function validateAndSend(ev){
        ev.preventDefault();
        if(!email || !password){
            alert("Please fill out a username and password");
            return false;
        }
       
        dfetch("/users/authenticate", {
            method: "POST",
            bodyJson: {
                email,
                password
            },
            enforce200: true
        }).then(jwt => {
            useJWT()[1](jwt);
            navigate("/");
        }).catch((err) => {
            alert(err);
        });
        
    }
    
    return <div className="container">
        <h2 className="content-title">Signup</h2>
        <form className="w-400 mw-full" onSubmit={validateAndSend}>
            <div className="form-group">
            <label for="email" className="required">Email:</label>
            <input type="text" className="form-control" id="email" placeholder="email@example.com" required="required" onChange={(ev) => setEmail(ev.target.value)}></input>
            </div>
            <div className="form-group">
            <label for="email" className="required">Password:</label>
            <input type="password" className="form-control" id="password"required="required" onChange={(ev) => setPassword(ev.target.value)}></input>
            </div>
            <button className="btn btn-primary" type="submit">Sign in</button>
        </form>
    </div>;
}