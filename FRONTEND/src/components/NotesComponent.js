// Imports from libraries
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
// Internal imports
import useNotes from "../hooks/useNotes";
import CardComponent from "./CardComponent";
import notesContext from "../context/notesContext";


const NotesComponent = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // The logic to handle all the fetching action is in useNotes hook
    const {mainList, secondaryList, query, search} = useNotes({setIsLoading, setIsError});

    const {setNotes} = useContext(notesContext);
    useEffect(() => {
        setNotes(mainList)
    },[mainList, setNotes]);


    // If the data is not yet fetched, we show the loader
    if(isLoading){
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-dots loading-xl"></span>
            </div>
        )
    }

    // If there is some error then we show the error message
    if(isError){
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-4xl text-error px-8">
                    Error getting the Notes. Please refresh the page!
                </p>
            </div>
        )
    }

    // If there are no notes in User's database, then this message is depicted
    if(mainList.length === 0){
        return (
            <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <h1 className="text-3xl font-bold">No Notes Available. Try adding the notes!</h1>
                <Link to = "/addnotes" className="btn btn-accent">Add+</Link>
            </div>
            </div>
        )
    }


    return (
        <div>
            <div className="navbar bg-transparent mb-8">
                <div className="navbar-start">
                    <p className="mr-4">Notes</p>
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" value={query} onChange={search}/>
                </div>
                <div className="navbar-end">
                    <Link to = "/addnotes" className="btn btn-ghost text-xl">ADD+</Link>
                </div>
            </div>
            <div className="flex flex-wrap justify-around">
                {
                    secondaryList.map((res) => {
                        return (
                             <Link to = {`/notes/${res._id}`} key = {res._id}> 
                                <CardComponent data = {
                                    {title : res.title, 
                                    description: res.description,
                                    date: res.createdAt
                                    }} />
                             </Link>
                        )
                    })
                }   
            </div>
        </div>
    )
}

export default NotesComponent;