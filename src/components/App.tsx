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
import { useDebounce, useJobItemsCustomHook} from "../lib/hooks"


function App() {
  const [searchText,setSearchText] = useState("");  
  // when you return data from  a custom hook in array you dont have to have concern about the variable names which you are importing
  //but when you return object you cant change the variable names you have to keep the variable names same as they
  //were in return statement in your hook
  
  const debouncedSearchText = useDebounce(searchText,250);
  const {isLoading,jobItems} = useJobItemsCustomHook(debouncedSearchText);

  const slicedJobItems = jobItems.slice(0,7);
  const totalSearchresults = jobItems.length;
 

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
              <Sorting/>
            </SidebarTop>
            <JobList jobItems={slicedJobItems} isLoading={isLoading}/>
            <Pagination/>
          </Sidebar>
          <JobItemContent/>
        </Container>

        <Footer/>
  </>;
}

export default App;
