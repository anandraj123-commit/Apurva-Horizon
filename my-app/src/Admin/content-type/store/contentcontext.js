import React, { createContext, useContext, useState, useEffect } from 'react';

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
    const [list, setList] = useState([])

    // const getAllContentTypes = async () => {
    //     try {

    //         const response = await fetch("http://localhost:5000/api/content-type/list", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         })
            
    //         if(response.ok){
    //             const listItems = await response.json();
    //             // console.log(listItems);
                
    //             setList(listItems)
    //         }
            
    //     } catch (error) {
    //         console.log(error);
            
    //     }

    // }

    // useEffect(() => {
    //     // getAllContentTypes()
    // }, []);

    return (
        <ListContext.Provider value={{ list}}>
            {children}
        </ListContext.Provider>
    );
};

export const useList = () => {
    const listContextValue = useContext(ListContext);
    return listContextValue;
};
