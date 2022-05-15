import { passwordStrength } from 'check-password-strength'
import {useState} from "react";

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

    const [error, setError] = useState("");
    const [passwordCompliant, setPasswordCompliant] = useState(null);
    const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(0);

    // Validate and send
    
    function judgePassword(password){
        const passwordStrengthResults = passwordStrength(password);
        setPasswordStrengthLevel(passwordStrengthResults.id);
        setPasswordCompliant(textByPasswordStrength[passwordStrengthResults.id]);
    }
    
    function validateAndSend(ev){
        const passwordStrengthResults = passwordStrength(password);
        if(passwordStrengthResults.id >= 2){
            
        }else{
            setError("Password is too weak");
        }
    }

    return <div className="homepage container">
        <h2 className="content-title">Signup</h2>
        <form className="w-400 mw-full">
            <div className="form-group">
                <label for="fullname" class="required">Real name:</label>
                <input type="text" class="form-control" id="realname" placeholder="John Doe" required="required" onChange={(ev) => setRealname(ev.target.value)}></input>
            </div>
            <small>Only shown to people inside your instituion. Can be shown to public if you opt in. You may include only a last initial or only your first initial if you wish. </small>
            <div className="form-group">
                <label for="email" class="required">Email Address:</label>
                <input type="email" class="form-control" id="email" placeholder="johndoe+student@gmail.com" required="required" onChange={(ev) => setEmail(ev.target.value)}></input>
            </div>
            <small>
                We promise to <strong>never</strong> spam your inbox. Only nesscary emails will be sent by default but you can opt to be have discussions mailed to you. 
            </small>
            <div className="form-group">
                <label for="username" class="required">Username:</label>
                <input type="text" class="form-control" id="username" placeholder="johndoe" required="required" onChange={setUsername}></input>
            </div>
            <small>
                This is the name everyone will refer to you by when your real name is not displayed. 
            </small>
            <div className="form-group">
                <label for="password" class="required">Password:</label>
                <input type="password" class="form-control" id="password" required="required" onChange={(ev) => {
                    setPassword(ev.target.value);
                    judgePassword(ev.target.value);
                 } }></input>
            </div>
            {passwordCompliant && <small className={classesByPasswordStrength[passwordStrengthLevel]}>
                Password strength is {passwordCompliant}
                </small>}
            <div className="form-group">
                <label for="confirm-password" class="required">Password (again to confirm):</label>
                <input type="password" class={"form-control " + (confirmPassword === password ? "password-matched-input":"password-mismatched-input")} id="confirm-password" required="required" onChange={(ev) => setConfirmPassword(ev.target.value)}  ></input>
            </div>
        </form>
    </div>;
}