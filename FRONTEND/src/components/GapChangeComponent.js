import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// This component depicts the current gaps schema and and option to change the gaps schema according to you

const GapChangeComponent = () => {
    
    const [gaps, setGaps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isParaError, setIsParaError] = useState(false);
    const [newGap, setNewGap] = useState([]);
    const [query, setQuery] = useState("");
    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();

    const getGaps = async() => {
        try{
            const res = await fetch(process.env.GAP_API, {
                credentials: "include"
            });

            if(!res.ok){
                throw new Error("Error getting the gap data");
            }

            const json = await res.json();

            setGaps(json.gaps);
            setIsLoading(false);
        }
        catch(err){
            console.log(err.message);
            setIsLoading(false);
            setIsError(true);
        }
    }

    useEffect( () => {
        getGaps();
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
                <p className="text-4xl text-error px-*">
                    Error getting the Gap data. Please refresh the page!
                </p>
            </div>
        )
    }

    const updateGaps = async () => {
        try{
            const res = await fetch(process.env.GAP_API, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    gaps: newGap
                })
            })

            if(!res.ok){
                throw new Error("Error changing the gaps!");
            }

            setIsParaError(false);
            navigate("/revision");
        }
        catch(err){ 
            console.log(err.message);
            setUpdating(false);
            setIsParaError(true);
        }
    }

    const changeHandler = (e) => {
        setQuery(e.target.value);
        setNewGap(e.target.value.split(","));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setUpdating(true)
        updateGaps();
    }


    return (
        <form className="flex justify-center items-center min-h-screen" onSubmit={submitHandler}>
            <fieldset onSubmit={submitHandler} className="fieldset bg-accent text-accent-content border-base-300 rounded-box w-full max-w-md border p-4">
                <legend className="fieldset-legend">gaps</legend>

                <label className="label">Current Gap Scheme</label>
                <p className="input w-full">
                    {
                        gaps.join(",")
                    } 
                </p>

                <label className="label">New Gaps Schema</label>
                <input type="text" className="input w-full" placeholder="New Gaps Schema" value = {query} onChange={changeHandler}/>
                <p>Note: please add the gaps in the same format as above!</p>
                {
                    isParaError?
                    (
                        <div>
                            <p className="text-center text-error px-4">
                                Sorry error updating the gaps! Please try again
                            </p>
                        </div>
                    ):
                    (
                        <></>
                    )
                }

                <button type="submit" className="btn btn-ghost mt-4" disabled = {updating}>
                    {
                        updating?
                        "Saving..":
                        "Save"
                    }
                </button>

            </fieldset>
        </form>
    )
}

export default GapChangeComponent;