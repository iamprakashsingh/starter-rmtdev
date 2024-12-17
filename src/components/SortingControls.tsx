import { sortBy } from "../lib/types";

type SortByProps = {
  onclick : (newSortBy: sortBy)=>void;
  sortBy : sortBy;
}

export default function Sorting({onclick,sortBy}:SortByProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button 
        onClick={()=>onclick("relevant")}
        className={`sorting__button sorting__button--relevant ${sortBy==='relevant'?'sorting__button--active':''}`}>
        Relevant
      </button>

      <button onClick={()=>onclick("recent")}
      className={`sorting__button sorting__button--recent ${sortBy==='recent'?'sorting__button--active':''}`}>
        Recent
      </button>
    </section>
  );
}
