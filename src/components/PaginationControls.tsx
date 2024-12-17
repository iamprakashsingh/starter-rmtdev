import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { direction } from "../lib/types";

type PaginationControlProps = {
  onClick : (direction :direction)=>void
  currentPage : number;
  lastPage : number;
  
}

export default function Pagination({onClick,currentPage,lastPage}:PaginationControlProps) {
    
  return <section className="pagination">
        
        {
          (currentPage>1) && (
            <>
                <button className="pagination__button pagination__button--previous" onClick={(e)=>{
                  e.currentTarget.blur();
                  onClick("previous")}}>
                  <ArrowLeftIcon/>
                  Page {currentPage-1}
                </button>
                
            </>
          )
        }
        {
          (currentPage<lastPage && currentPage!=1) && (
              <button className="pagination__button pagination__button--next" onClick={()=>onClick("next")}>
                Page {currentPage+1}  
                <ArrowRightIcon/>
            </button>
          )
        }
      {
        (currentPage==1 && lastPage!==0) &&  (
          <button
            className="pagination__button pagination__button--next"
            onClick={() => onClick("next")}
          >
            Page {currentPage + 1}
            <ArrowRightIcon />
          </button>
        )
      }
      
        
  </section>;
}
