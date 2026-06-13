// Imports from library
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

const ProfileComponent = () => {

    const fetchData = async () => {
        try{
            const res = await fetch(process.env.GETPROFILE_API, {
                credentials: "include"
            });

            if(!res.ok){
                throw new Error("Sorry failed to get the profile data!");
            }

            const json = await res.json();

            const {firstName, lastName, emailId} = json;

            setFirstName(firstName);
            setLastName(lastName);
            setEmailId(emailId);

            setIsLoading(false);
        }
        catch(err){  
            console.log(err.message);

            setIsLoading(false);
            setIsError(true);
        }
    }

    useEffect(() => {
        fetchData()
    },[])

    const [firstName, setFirstName]  = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [changeFirstName, setChangeFirstName] = useState(false);
    const [changeLastName, setChangeLastName] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [ispostError, setIsPostError] = useState(false);
    const navigate = useNavigate();

    const handleSave = async () => {
        try{
            console.log(process.env.POSTPROFILE_API);
            const res = await fetch( process.env.POSTPROFILE_API , {
                        method: "PATCH",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            firstName,
                            lastName
                        })
                    })

            if(!res.ok){
                throw new Error("Sorry error saving the profile data!");
            }

            setIsPostError(false);
            navigate("/")

        }
        catch(err){
            console.log(err.message);
            setIsPostError(true);
        }
    }

    if(isLoading){
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-dots loading-xl"></span>
            </div>
        )
    }

    if(isError){
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-4xl text-error px-8">
                    Error getting the profile data. Please refresh the page!
                </p>
            </div>
        )
    }

    

    return (
        <div className="px-8">
            <div className="navbar bg-transparent">
                <div className="navbar-start">
                    <></>
                </div>
                <div className="navbar-end">
                        <button  className="btn btn-ghost text-xl" onClick={handleSave}>Save+</button>
                </div>
            </div>
            <div className="text-3xl">
                First Name
            </div>
            <div className="navbar bg-transparent border-b-2 mb-4">
                <div className="navbar-start">
                    {
                        changeFirstName?
                        (
                            <div> 
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                            </div>
                        ):
                        (
                            <div> 
                                <p>{firstName}</p>
                            </div>
                        )
                    }
                </div>
                <div className="navbar-end">
                        <button  onClick={() => setChangeFirstName(changeFirstName? false: true)}  className="btn btn-ghost text-xl">Edit</button>
                </div>
            </div>
            <div className="text-3xl">
                Last Name
            </div>
            <div className="navbar bg-transparent border-b-2 mb-4">
                <div className="navbar-start">
                    {
                        changeLastName?
                        (
                            <div> 
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        ):
                        (
                            <div> 
                                <p>{lastName}</p>
                            </div>
                        )
                    }
                </div>
                <div className="navbar-end">
                        <button onClick={() => setChangeLastName(changeLastName? false: true)} className="btn btn-ghost text-xl">Edit</button>
                </div>
            </div>
            <div className="text-3xl">
                Email Id
            </div>
            <div className="navbar bg-transparent border-b-2">
                <div className="navbar-start">
                    <p>{emailId}</p>
                </div>
            </div>

            {
                ispostError?
                (<p className="text-center text-error px-8">
                    There was some Error while saving the data!
                </p>):
                (
                    <>
                    </>
                )
            }
            
        </div>
    );
}

export default ProfileComponent;