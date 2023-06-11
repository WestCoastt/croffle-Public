import Carousel from "./components/Carousel";
import ItemCard from "./components/ItemCard";
import SectionTitle from "./components/SectionTitle";

const ItemList = [
  {
    name: "양반 진국사골곰탕 500g",
    regular_price: 3390,
    total_price: 1420,
    stars: 3.8,
    reviews: 653,
    src: "https://github.com/westcoast-dev/nextjs-course/assets/117972001/dd0d1733-1d6f-46f4-9985-ff4d3e070d25",
  },
  {
    name: "건강한 생유산균 100억",
    regular_price: 87100,
    total_price: 46870,
    stars: 4.9,
    reviews: 20728,
    src: "https://github.com/westcoast-dev/nextjs-course/assets/117972001/e6a5615c-9962-4e8d-b07d-308af302230b",
  },
  {
    name: "탬버린즈 퍼퓸 솝 비누",
    regular_price: 49290,
    total_price: 30700,
    stars: 3.4,
    reviews: 6178,
    src: "https://github.com/westcoast-dev/nextjs-course/assets/117972001/fde3989f-bc08-4909-8298-ed4322be612d",
  },
  {
    name: "시몽 테르미크 150ml 듀오 세트",
    regular_price: 120000,
    total_price: 98000,
    stars: 4.3,
    reviews: 74,
    src: "https://github.com/westcoast-dev/nextjs-course/assets/117972001/cea03368-c953-4a69-972c-b321dee8d44f",
  },
  {
    name: "아라크네 네츄럴 듀얼쉐이드 콤비블라인드 롤스크린 2p, 주문후 2주내 배송",
    regular_price: 70000,
    total_price: 70000,
    stars: 2.3,
    reviews: 4,
    src: "https://github.com/westcoast-dev/nextjs-course/assets/117972001/bfdb9583-a049-483c-9bf4-adfe0ac653a7",
  },
];

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
        {ItemList.map((item) => (
          <ItemCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
