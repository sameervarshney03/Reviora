// Imports from libraries
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Interanl imports
import notesContext from "../context/notesContext";
import notesPostPatch from "../util/notesPostPatch";
import notesDelete from "../util/notesDelete";

const NotesInfoComponent = () => {

    const {notes} = useContext(notesContext);
    const {notesId} = useParams();


    const reqNote = notes.find((u) => u._id === notesId);

    console.log(reqNote);
    const {title, description, createdAt, updatedAt} = reqNote;


    const [titleState, setTitleState] = useState(title);
    const [descriptionState, setDescriptionState] = useState(description);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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