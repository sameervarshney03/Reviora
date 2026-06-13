// Imports from libraries
import { useState } from "react";
import { Link } from "react-router-dom";

// Interal imports
import useRevision from "../hooks/useRevision";
import RevisionCardComponent from "./RevisionCardComponent";

const RevisionComponent = () => {


    const[isLoading, setIsLoading] = useState(true);
    const[isError, setIsError] = useState(false);

    const {reqMaterial, isEmpty} = useRevision({setIsLoading, setIsError});



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
                    Error getting the Notes. Please refresh the page!
                </p>
            </div>
        )
    }

    if(isEmpty){
        return (
            <div>
                <div className="navbar bg-transparent mb-8">
                    <div className="navbar-start">
                        <p className="mr-4">Revision</p>
                    </div>
                    <div className="navbar-end">
                        <Link to = "/addrevision" className="btn btn-ghost text-xl">ADD+</Link>
                        <Link to = "/gapchange" className="btn btn-ghost text-xl">CHANGE GAP</Link>
                    </div>
                </div>
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-4xl text-warning px-8">
                        Hurrey No revision for today!
                    </p>
                </div>
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
                    <Link to = "/addrevision" className="btn btn-ghost text-xl">ADD+</Link>
                    <Link to = "/gapchange" className="btn btn-ghost text-xl">CHANGE GAP</Link>
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