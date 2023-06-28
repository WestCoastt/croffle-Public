import DetailContents from "@/app/components/Products/DetailContents";
import QnAContents from "@/app/components/Products/QnAContents";
import ReviewContents from "@/app/components/Products/ReviewContents";
import TabMenu from "@/app/components/Products/TabMenu";
import TopContents from "@/app/components/Products/TopContents";

export default function Products() {
  return (
    <div style={{ width: "1200px", margin: "auto" }}>
      <TopContents />
      <TabMenu />
      <DetailContents />
      <ReviewContents />
      <QnAContents />
    </div>
  );
}
