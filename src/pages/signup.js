import { passwordStrength } from 'check-password-strength'
import {useState} from "react";

import dfetch from "../utils/fetch";

const classesByPasswordStrength = ["pwd-tooweak","pwd-weak","pwd-medium","pwd-strong"];
const textByPasswordStrength = ["Too Weak","Weak","Medium","Strong"];

export default function Home(props){
    // Check if user is logged in, if they are direct them to the "AuthenticatedHomepage"
    
    // State
    const [username, setUsername] = useState("");
    const [realname, setRealname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    // TODO: Use error instead of alert prompts
    const [error, setError] = useState("");
    const [passwordCompliant, setPasswordCompliant] = useState(null);
    const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(0);

    // Validate and send
    
    function judgePassword(password){
        const passwordStrengthResults = passwordStrength(password);
        setPasswordStrengthLevel(passwordStrengthResults.id);
        setPasswordCompliant(textByPasswordStrength[passwordStrengthResults.id]);
    }
    
    // TODO: Follow DRY principles and have less repeating code

    async function validateAndSend(ev){
        const passwordStrengthResults = passwordStrength(password);
        if(passwordStrengthResults.id >= 2){
            // OK now let's verify everything else
            if(!username || !password){
                alert("Please fill out a username and password");
                ev.preventDefault();
                return;
            }else if(password === confirmPassword){
                alert("Passwords do not match");
                ev.preventDefault();
                return;
            }else if(!realname){
                alert("Please fill in a real name");
                ev.preventDefault();
                return;
            }else if(!email){
                alert("Please fill in an email");
                ev.preventDefault();
                return false;
            }
            // Send
            try{
                const response = await dfetch("/api/signup", {
                    method: "POST",
                    bodyJson: {
                        username,
                        password,
                        realname,
                        email
                    },
                    raw: true
                });
                if(response.status === 200){
                    window.location.href = "/"; // Force reload!
                }else{
                    alert("ERROR: " + await response.text());
                }
            }catch(ex){
                alert("Error: " + ex + " please contact maintainers with the details in this box.");
                setError(ex);
            }
        }else{
            alert("Password is too weak");
            return;
        }
    }

    return <div className="homepage container">
        <h2 className="content-title">Signup</h2>
        <form className="w-400 mw-full" onSubmit={validateAndSend}>
            <div className="form-group">
                <label for="fullname" className="required">Real name:</label>
                <input type="text" className="form-control" id="realname" placeholder="John Doe" required="required" onChange={(ev) => setRealname(ev.target.value)}></input>
            </div>
            <small>Only shown to people inside your instituion. Can be shown to public if you opt in. You may include only a last initial or only your first initial if you wish. </small>
            <div className="form-group">
                <label for="email" className="required">Email Address:</label>
                <input type="email" className="form-control" id="email" placeholder="johndoe+student@gmail.com" required="required" onChange={(ev) => setEmail(ev.target.value)}></input>
            </div>
            <small>
                We promise to <strong>never</strong> spam your inbox. Only necessary emails will be sent by default but you can opt to be have discussions mailed to you. 
            </small>
            <div className="form-group">
                <label for="username" className="required">Username:</label>
                <input type="text" className="form-control" id="username" placeholder="johndoe" required="required" nChange={(ev) => setUsername(ev.target.value)}></input>
            </div>
            <small>
                This is the name everyone will refer to you by when your real name is not displayed. 
            </small>
            <div className="form-group">
                <label for="password" className="required">Password:</label>
                <input type="password" className="form-control" id="password" required="required" onChange={(ev) => {
                    setPassword(ev.target.value);
                    judgePassword(ev.target.value);
                 } }></input>
            </div>
            {passwordCompliant && <small className={classesByPasswordStrength[passwordStrengthLevel]}>
                Password strength is {passwordCompliant}
                </small>}
            <div className="form-group">
                <label for="confirm-password" className="required">Password (again to confirm):</label>
                <input type="password" class={"form-control " + (confirmPassword === password ? "password-matched-input":"password-mismatched-input")} id="confirm-password" required="required" onChange={(ev) => setConfirmPassword(ev.target.value)}  ></input>
            </div>
            <button type="submit" className="btn btn-primary">Signup!</button>
        </form>
    </div>;
}