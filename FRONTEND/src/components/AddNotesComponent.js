// Imports from libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Interanl imports
import notesPostPatch from "../util/notesPostPatch";

// This component handles adding of the notes
const AddNotesComponent = () => {

    const [titleState, setTitleState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleTitle = (e) => {
        setTitleState(e.target.value);
    }

    const handleDescription = (e) => {
        setDescriptionState(e.target.value);
    }

    const handleNotesAdd = () => {
        const API = process.env.POSTNOTES_API;
        const mtod = "POST";
        setIsLoading(true);
        notesPostPatch({titleState, descriptionState, setIsError, setErrorMessage, navigate, API, mtod, setIsLoading});
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
                <div className="py-4 my-2">
                    <p className="mb-2 text-2xl">
                        Title:
                    </p>
                    <input type="text" value={titleState} className="w-full bg-transparent h-auto border border-base-content rounded-sm p-2" onChange={handleTitle}/>
                </div>
                <div className="border-t-base-content ">
                    <p className="mb-2 text-2xl">
                        Description:
                    </p>
                    <div className="leading-loose">
                    <textarea value={descriptionState} className="w-full bg-transparent h-128 resize-none border border-base-content rounded-sm p-2" onChange={handleDescription}/>
                    </div>
                </div>
            </div>
            {/*This part is to show the error message*/}
            {
                isError?
                (<p className="text-center text-error">
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

export default AddNotesComponent;