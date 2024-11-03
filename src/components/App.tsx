import { useState } from "react";
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
import {useJobItemsCustomHook} from "../../lib/hooks"

function App() {
  const [searchText,setSearchText] = useState("");  

  const {isLoading,jobItems} = useJobItemsCustomHook(searchText);

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
              <ResultsCount/>
              <Sorting/>
            </SidebarTop>
            <JobList jobItems={jobItems} isLoading={isLoading}/>
            <Pagination/>
          </Sidebar>
          <JobItemContent/>
        </Container>

        <Footer/>
  </>;
}

export default App;
