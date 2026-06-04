// Imports from libraries
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Interal imports
import userContext from "../context/userContext";
import signup from "../util/signup";

const SignupComponent = () => {
    
    const [firstName , setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
 
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState("");
    
    const {setIsAuthenticated} = useContext(userContext);
    const navigate = useNavigate()

    const signUpHandler = () => {
        signup(firstName, lastName, emailId, password, rePassword, setIsAuthenticated, navigate, setIsMessage, setMessage);
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <fieldset className="fieldset bg-accent border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">SignUp</legend>

                <label className="label text-accent-content">Firstname</label>
                <input type="text" className="input" placeholder="Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

                <label className="label text-accent-content">LastName</label>
                <input type="text" className="input" placeholder="LastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>

                <label className="label text-accent-content">Email</label>
                <input type="email" className="input" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>

                <label className="label text-accent-content">Password</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <label className="label text-accent-content">Re-enter Password</label>
                <input type="password" className="input" placeholder="Password" value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>

                {
                    isMessage?
                    <p>
                        {message}
                    </p>:
                    <>
                    </>
                }

                <button className="btn btn-ghost mt-4" onClick={signUpHandler}>SignUp</button>
            </fieldset>
        </div>
    )

}

export default SignupComponent;