
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import {JobItem} from "../../lib/JobItems";

type JobItemProps = {
  jobItems : JobItem[];
  isLoading : boolean;
}
export function JobList({jobItems,isLoading}:JobItemProps) {
  return <ul className="job-list">
          
            {isLoading && <Spinner/>}
            {!isLoading && jobItems.map((jobItem)=>{
                return <JobListItem jobItem={jobItem}/>
            })}
          
  </ul>;
}

export default JobList;
