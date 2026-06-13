// Imports from libraries
import { useState } from "react";
import { Link } from "react-router-dom";

// Interal imports
import useRevision from "../hooks/useRevision";
import RevisionCardComponent from "./RevisionCardComponent";

const RevisionComponent = () => {


    const[isLoading, setIsLoading] = useState(true);
    const[isError, setIsError] = useState(false);

    const {gaps, reqMaterial, isEmpty} = useRevision({setIsLoading, setIsError});



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
                <p className="text-4xl text-error">
                    Error getting the Notes. Please refresh the page!
                </p>
            </div>
        )
    }

    if(isEmpty){
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-4xl text-warning">
                    Error getting the Notes. Please refresh the page!
                </p>
            </div>
        )
    }

    return (
        <div>
            <div className="navbar bg-transparent mb-8">
                <div className="navbar-start">
                    <p className="mr-4">Revision</p>
                </div>
                <div className="navbar-end">
                    <Link className="btn btn-ghost text-xl">ADD+</Link>
                    <Link className="btn btn-ghost text-xl">CHANGE GAP</Link>
                </div>
            </div>

            <div className="py-4 px-8">
                {
                    reqMaterial.map((item) => (
                        item.map((rev) => (
                            <Link to = {`/revision/${rev._id}`} key={rev._id}>
                                <RevisionCardComponent createdAt = {rev.createdAt} 
                                material = {rev?rev.material:"Sorry no material for this date!"}
                                />
                            </Link>
                        ))
                    ))
                }
            </div>
        </div>
    )
};

export default RevisionComponent;