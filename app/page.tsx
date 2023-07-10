import Carousel from "./components/Carousel";
import ItemCard from "./components/ItemCard";
import SectionTitle from "./components/SectionTitle";
import Weekly from "./components/Weekly";
import { ItemList } from "./Items";

export default function Home() {
  return (
    <div>
      <Carousel />
      <SectionTitle />
      <Weekly />
      <div style={{ margin: "auto", width: "1200px" }}>
        <img src="/assets/img/middle_banner.svg" alt="middle_banner" />
      </div>
    </div>
  );
}
