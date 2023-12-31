export const dynamic = "force-dynamic";
import SearchContent from "../components/Search/SearchContent";
import SearchFilter from "../components/Search/SearchFilter";
import SearchHeader from "../components/Search/SearchHeader";
export default function Search() {
  return (
    <>
      <div style={{ width: "1200px", display: "flex", margin: "auto" }}>
        <SearchFilter />
        <SearchContent />
      </div>
    </>
  );
}
