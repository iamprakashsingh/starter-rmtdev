import toast from "react-hot-toast";

export const errorMessage = (error:unknown) =>{
    let message;
    if(error instanceof Error){
      message = error.message;
    }
    else if(typeof error==="string"){
        message = error;
    }
    else{
      message = "An error occured"
    }
    toast.error(message)
  }