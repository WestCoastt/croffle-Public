import SearchHeader from "@/app/components/Search/SearchHeader";
import SearchContent from "../../components/Search/SearchContent";
import SearchFilter from "../../components/Search/SearchFilter";
export default function Search() {
  return (
    <div style={{ width: "1200px", margin: "auto" }}>
      <SearchHeader />
      <div style={{ display: "flex" }}>
        <SearchFilter />
        <SearchContent />
      </div>
    </div>
  );
}
