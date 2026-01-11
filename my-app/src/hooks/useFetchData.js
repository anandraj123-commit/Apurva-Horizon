import React, { useEffect, useState } from 'react'

export default function useFetchData(url) {
  
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    
    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true);
            try{
                const response = await fetch(url);
                const responseData = await response.json();                
                setData(responseData);
            }catch(err){
                setError(err);
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    },[url]);

    return {data,loading,error};
}
