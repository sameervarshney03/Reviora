// Imports from libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";


// This component handles adding of the notes
const AddRevisionComponent = () => {

    const [descriptionState, setDescriptionState] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleDescription = (e) => {
        setDescriptionState(e.target.value);
    }

    const postNotes = async () => {

        try{
            const res = await fetch(process.env.REVISION_API, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    material: descriptionState
                })
            })

            if(!res.ok){
                throw new Error("Sorry the notes could not be posted!")
            }

            setIsLoading(false);
            navigate("/revision");
        }
        catch(err){
            console.log(err.message);
            setIsLoading(false);
            setIsError(true);
            setErrorMessage("Error saving the material");
        }
    }


    const handleNotesAdd = () => {
        setIsLoading(true);
        postNotes();
    }

    return (
        <div>
            {/*This div contains the main button*/}
            <div className="navbar bg-transparent">
                <div className="navbar-start">
                    <></>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost text-xl" onClick={handleNotesAdd} disabled = {isLoading}>
                        {
                            isLoading?
                            "Saving...":
                            "Save"
                        }
                    </button>
                </div>
            </div>
            {/*This div is for title and description*/}
            <div className="mt-8 px-16 text-base-content">
                <div>
                    <p className="mb-2 text-2xl">
                        Add material here:
                    </p>
                    <div className="leading-loose">
                    <textarea value={descriptionState} className="w-full bg-transparent h-128 resize-none border border-base-content rounded-sm p-2" onChange={handleDescription}/>
                    </div>
                </div>
            </div>
            {/*This part is to show the error message*/}
            {
                isError?
                (<p className="text-center text-error px-8">
                    {errorMessage}
                </p>):
                (
                    <>
                    </>
                )
            }
        </div>
    )
}

export default AddRevisionComponent;