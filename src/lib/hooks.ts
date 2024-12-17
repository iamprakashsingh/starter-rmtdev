import { useEffect, useState } from "react";
import {JobItemApiResponse, JobItemsApiResponse } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

import { errorMessage } from "./utils";

// export function useJobItemsCustomHook(searchText:string){
//     const [jobItems,setJobItems] = useState<JobItem[]>([]);
    
//     const [isLoading,setIsLoading] = useState(false);
  
//     useEffect(()=>{
//       if(!searchText) return;
      
//       const fetchData = async ()=> {
//         setIsLoading(true);
//         const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
//         const data = await response.json();
//         setIsLoading(false);
//         setJobItems(data.jobItems);
        
//       }
  
//       fetchData();
  
//     },[searchText])
//     // return {
//     //     isLoading,slicedJobItems
//     // }

//     //we can return array also as const it solves the problem of using same variable name in required place but it creates
//     // a problem as we have to now remember the order of variables and this is not practical to always remember the variable names
//     // also what if we require only one value out of three in that case array cant help us so thatswhy object is more 
//     //preferrabe if we want to use a variable with other name we can just destructure it there  
//     return {isLoading,jobItems};
// }

 

  const fetchJobItemsData = async (searchText:string):Promise<JobItemsApiResponse> => {
    const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
        
    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.description);
    }
    const data = await response.json();
    return data;
  }

  export function useJobItems(searchText:string){
    const {data,isInitialLoading} = useQuery(
      ["job-items",searchText],
  
      ()=> (fetchJobItemsData(searchText)),
      {
        staleTime : 1000*60*60,
        refetchOnWindowFocus : false,
        retry : false,
        enabled : Boolean(searchText),
        //toaster error message
        onError : errorMessage
      }
    );
      console.log(data);
      // const jobItems = data?.jobItems;
      const jobItems = data ? data.jobItems : [];
      const isLoading = isInitialLoading;
      return {jobItems,isLoading} as const;
  }


  export function useCurrentIdHook(){
    const[currentId,setCurrentId] = useState<number | null>(null);
    
    useEffect(()=>{
        const handleHashChange = ()=>{
          // + converted the string to number
          const id = +window.location.hash.slice(1);
          setCurrentId(id);
          
        }
        handleHashChange();
        window.addEventListener("hashchange",handleHashChange);
  
        return () =>{
          window.removeEventListener("hashchange",handleHashChange);
        }
    },[])

    return currentId;
}

// export function useJobItem(id:number|null){
//   const [jobItem,setJobItem] = useState<extendedJobItem | null>(null);
//   const [isLoading,setIsLoading] = useState(false);

//   useEffect(()=>{
//       if(!id) return;
//       setIsLoading(true);
//       const fetchData = async ()=>{
//         const response = await fetch(`${BASE_API_URL}/${id}`);
//         const data = await response.json();
//         setIsLoading(false);
//         setJobItem(data.jobItem);
//       }
//       fetchData();
      
//   },[id])

//   return {jobItem,isLoading} as const;
// }

//via useQuery

const fetchData = async (id:number):Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if(!response.ok){
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json(); 
  return data;
}

export function useJobItem(id:number | null){
  const {data,isInitialLoading} = useQuery(
    ["job-item",id],

    ()=> (id ? fetchData(id):null),
    {
      staleTime : 1000*60*60,
      refetchOnWindowFocus : false,
      retry : false,
      enabled : Boolean(id),
      onError : errorMessage
    }
  );
    const jobItem = data?.jobItem;
    const isLoading = isInitialLoading;
    return {jobItem,isLoading} as const;

}


export function useDebounce<T>(value:T,delay=500):T{
  const [debouncedValue,setDebouncedValue] = useState(value);
  useEffect(()=>{
    const timerid = setTimeout(()=>{setDebouncedValue(value)},delay)
    return ()=>clearTimeout(timerid)
  },[value,delay])

  return debouncedValue;
}


  