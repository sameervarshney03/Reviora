import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const RevisionInfoComponent = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [revisionMaterial, setRevisionMaterial] = useState({});
    const [isError, setIsError] = useState(false);
    const {revId} = useParams();

    const getRevData = async () => {
        try{
            const res = await fetch(process.env.REVISION_API + `/${revId}`, {
                credentials: "include"
            });

            if(!res.ok){
                throw new Error("Sorry the res data couldn't be fetched!");
            }

            const json = await res.json();

            setRevisionMaterial(json);
            setIsLoading(false);
        }
        catch(err){
            console.log(err.message);
            setIsError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getRevData();
    },[])

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
                    Error getting the Data. Please refresh the page!
                </p>
            </div>
        )
    }

    const {createdAt, material} = revisionMaterial

    return (
            <div className="mt-8 px-16 text-base-content">
                <div className="my-4 text-xl">
                    <p className="mb-2">Date Create: {createdAt.slice(0, 10)}</p>
                </div>
                <div className="border-t border-base-content ">
                    <p className="mb-2 text-2xl">
                        Material:
                    </p>
                    <div className="leading-loose">
                        <div className="w-full bg-transparent h-128 resize-none"> {material} </div>
                    </div>
                </div>
            </div>
        )
}

export default RevisionInfoComponent;