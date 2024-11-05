
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import {JobItem} from "../lib/types";
import { useCurrentIdHook } from "../lib/hooks";


type JobItemProps = {
  jobItems : JobItem[];
  isLoading : boolean;
}
export function JobList({jobItems,isLoading}:JobItemProps) {
  const currentId = useCurrentIdHook();
 
  return <ul className="job-list">
          
            {isLoading && <Spinner/>}
            {!isLoading && jobItems.map((jobItem)=>{
                const isActive = (jobItem.id===currentId);
                return <JobListItem jobItem={jobItem} key={jobItem.id} isActive={isActive}/>
            })}
          
  </ul>;
}

export default JobList;
