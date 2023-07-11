"use client";
import { useParams, useSearchParams } from "next/navigation";
import styled from "@emotion/styled";
import Sort from "./Sort";
import ItemCard from "../ItemCard";
import axios from "axios";
import { useEffect, useState } from "react";

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

interface List {
  sq: number;
  name: string;
  regular_price: number;
  total_price: number;
  star_average: number;
  review_count: number;
  product_image: [{ image_url: string }];
}

export default function SearchContent() {
  const keyword = useSearchParams().get("keyword");
  const sort_type = useSearchParams().get("sort_type");
  const categories = useParams();
  const [itemList, setItemList] = useState<List[]>([]);

  const getSearchList = async () => {
    const res = await axios.get(
      `/v1/products?product_name=${keyword}&page=1&size=20${
        sort_type ? `&sort_type=${sort_type}` : "&sort_type=RANKING"
      }`
    );
    setItemList(res.data.data.list);
  };

  const getCatSearchList = async () => {
    const res = await axios.get(
      `/v1/categories/${categories.id}/products?page=1&size=20${
        sort_type ? `&sort_type=${sort_type}` : "&sort_type=RANKING"
      }`
    );
    setItemList(res.data.data.list);
  };

  useEffect(() => {
    if (keyword) getSearchList();
    else getCatSearchList();
  }, [keyword, sort_type]);

  return (
    <Container keyword={keyword}>
      {keyword && (
        <div>
          <span>&apos;{keyword}&apos;</span>에 대한 검색결과
        </div>
      )}
      <Sort />
      <CardContainer>
        {itemList.map((item) => (
          <ItemCard key={item.name} item={item} />
        ))}
      </CardContainer>
    </Container>
  );
}
