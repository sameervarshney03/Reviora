import { useState, useEffect } from "react";

const useRevision = ({setIsLoading, setIsError}) => {
    const [gaps, setGaps] = useState([]);
    const [reqMaterial, setReqMaterial] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

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

        }
        catch(err){
            console.log(err.message);
            setIsError(true);
        }
    }

    const getMaterial = async() => {
        try{
            const res = await fetch(process.env.REVISION_API, {
                credentials: "include"
            })

            if(!res.ok){
                throw new Error("Error getting the notes data");
            }

            const json = await res.json();

            setReqMaterial(json.reqMaterial);


            let bool = true;
            for(const i of json.reqMaterial){
                if(i.length > 0){
                    bool = false;
                    break;
                }
            }

            setIsEmpty(bool);
        }
        catch(err){
            console.log(err.message);
            setIsError(true);
        }
    }

    useEffect(() => {
        Promise.all([
            getGaps(),
            getMaterial()
        ]).finally(() => {
        setIsLoading(false);
});
    }, []);

    return {
        gaps,
        reqMaterial,
        isEmpty
    }
    
}

export default useRevision;