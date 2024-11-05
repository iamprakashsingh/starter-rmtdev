type ResultCountProps = {
  totalSearchresults : number;
}
export default function ResultsCount({totalSearchresults}:ResultCountProps) {
  return <p className="count"><span className="u-bold">{totalSearchresults}</span> results</p>;
}
