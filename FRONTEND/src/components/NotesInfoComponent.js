// Imports from libraries
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Interanl imports
import notesPostPatch from "../util/notesPostPatch";
import notesDelete from "../util/notesDelete";

const NotesInfoComponent = () => {

    const {notesId} = useParams();

    const fetchData = async () => {
        try{
            console.log(process.env.REQNOTES_API + `${notesId}`);
            const req = await fetch(process.env.REQNOTES_API + `${notesId}`,{
                credentials: "include"
            });

            if(!req.ok){
                throw new Error("Sorry the note data could not be fetched!");
            }

            const json = await req.json();

            const {note} = json;

            setIsLoading(false);
            setReqNotes(note);
            setTitleState(note.title);
            setDescriptionState(note.description);
        }
        catch(err){
            setIsLoading(false)
            setIsMainError(true);
        }
    }

    useEffect(() => {
        fetchData();
    }, [notesId])

    const [titleState, setTitleState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isMainError, setIsMainError] = useState(false);
    const [reqNotes, setReqNotes] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    

    const handleTitle = (e) => {
        setTitleState(e.target.value);
    }

    const handleDescription = (e) => {
        setDescriptionState(e.target.value);
    }

    const handleSave = () => {
        const API = process.env.PATCHNOTES_API + `${notesId}`;
        const mtod = "PATCH";

        console.log(API);
        console.log(mtod);

        notesPostPatch({titleState, descriptionState, setIsError, setErrorMessage, navigate, API, mtod});
    }

    const handleDelete = () => {
        const API = process.env.DELETENOTES_API + `${notesId}`;

        notesDelete({API, setIsError, setErrorMessage, navigate});
    }


    if(isLoading){
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-dots loading-xl"></span>
            </div>
        )
    }

    if(isMainError){
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-4xl text-error">
                    Error getting the Note details. Please refresh the page!
                </p>
            </div>
        )
    }

    const {createdAt, updatedAt} = reqNotes;
    return (
        <div>
            <div className="navbar bg-transparent">
                <div className="navbar-start">
                    <></>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost text-xl" onClick={handleSave}>Save</button>
                    <button className="btn btn-ghost text-xl" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <div className="mt-8 px-16 text-base-content">
                <div className="my-4 text-xl">
                    <p className="mb-2">Date Create: {createdAt.slice(0, 10)}</p>
                    <p className="mt-2">Last Updated: {updatedAt.slice(0, 10)}</p>
                </div>

                <div className="border-t-base-content border-t-2 py-4 my-2">
                    <p className="mb-2 text-2xl">
                        Title:
                    </p>
                    <input type="text" value={titleState} className="w-full bg-transparent h-auto" onChange={handleTitle}/>
                </div>
                <div className="border-t-base-content ">
                    <p className="mb-2 text-2xl">
                        Description:
                    </p>
                    <p className="leading-loose">
                    <textarea value={descriptionState} className="w-full bg-transparent h-128 resize-none" onChange={handleDescription}/>
                    </p>
                </div>
            </div>

            {
                isError?
                (<p>
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

export default NotesInfoComponent;