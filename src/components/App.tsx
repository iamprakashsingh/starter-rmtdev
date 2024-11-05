import {  useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";
import JobList from "./JobList";
import Pagination from "./PaginationControls";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import { useDebounce, useJobItems} from "../lib/hooks"
import { Toaster } from "react-hot-toast";
import { sortBy } from "../lib/types";


function App() {
  const [searchText,setSearchText] = useState("");  
  // when you return data from  a custom hook in array you dont have to have concern about the variable names which you are importing
  //but when you return object you cant change the variable names you have to keep the variable names same as they
  //were in return statement in your hook
  
  const debouncedSearchText = useDebounce(searchText,250);
  const {isLoading,jobItems} = useJobItems(debouncedSearchText);
  const [currentPage,setCurrentPage] = useState(1);
  const [sortBy,setSortBy] = useState<sortBy>("relevant");
  const handleChangeSortBy = (newSortBy: sortBy) => {
    setSortBy(newSortBy);
  }
  const totalSearchresults = jobItems?.length || 0;
  
  const lastPage = (totalSearchresults || 0) / 7;

  const jobItemsSorted = jobItems?.sort((a,b)=>{
    if(sortBy==="relevant"){
      return b.relevanceScore - a.relevanceScore;
    }
    else {
      return a.daysAgo-b.daysAgo;
    }
  })
  let slicedJobItems;
  if(jobItemsSorted){
    slicedJobItems = jobItemsSorted?.slice((currentPage-1)*7+1,currentPage*7+1) || [];
  }
  else{
    slicedJobItems = jobItems?.slice((currentPage-1)*7+1,currentPage*7+1) || [];
  }
 
  const handleChangePage = (direction : "next" | "previous")=>{
    if(direction==='next'){
      setCurrentPage((prev)=>prev+1);
    }
    else if(direction === "previous"){
      setCurrentPage((prev)=>prev-1);
    }
  }

  

  

  return <>
        <Background/>

        <Header >
          <HeaderTop>
            <Logo/>
            <BookmarksButton/>
          </HeaderTop>
            <SearchForm searchText={searchText} setSearchText={setSearchText}/>
        </Header>

        <Container>
          <Sidebar>
            <SidebarTop>
              <ResultsCount totalSearchresults={totalSearchresults}/>
              <Sorting sortBy={sortBy} onclick={handleChangeSortBy}/>
            </SidebarTop>
            <JobList jobItems={slicedJobItems} isLoading={isLoading}/>
            <Pagination onClick = {handleChangePage} currentPage={currentPage} lastPage={lastPage} />
          </Sidebar>
          <JobItemContent/>
        </Container>

        <Footer/>
        <Toaster position="top-right"/>
  </>;
}

export default App;


