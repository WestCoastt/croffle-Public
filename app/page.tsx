import Carousel from "./components/Carousel";
import ItemCard from "./components/ItemCard";
import SectionTitle from "./components/SectionTitle";
import { ItemList } from "./Items";

export default function Home() {
  return (
    <div>
      <Carousel />
      <SectionTitle />
      <div
        style={{
          margin: "auto",
          marginTop: "40px",
          marginBottom: "100px",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {ItemList.splice(0, 5).map((item) => (
          <ItemCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
