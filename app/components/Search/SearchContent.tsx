"use client";
import { useSearchParams } from "next/navigation";
import styled from "@emotion/styled";
import Sort from "./Sort";
import { ItemList } from "@/app/Items";
import ItemCard from "../ItemCard";

export const Container = styled.div<{ keyword?: string | null }>`
  width: 960px;
  padding: ${(props) =>
    props.keyword === null ? "0 0 0 20px" : "40px 0 0 20px"};

  span {
    font-weight: 500;
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 230px);
  gap: 30px 6px;
`;

export default function SearchContent() {
  const keyword = useSearchParams().get("keyword");

  return (
    <Container keyword={keyword}>
      {keyword && (
        <div>
          <span>&apos;{keyword}&apos;</span>에 대한 검색결과
        </div>
      )}
      <Sort />
      <CardContainer>
        {ItemList.map((item) => (
          <ItemCard key={item.name} item={item} />
        ))}
      </CardContainer>
    </Container>
  );
}
