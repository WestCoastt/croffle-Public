"use client";
import { useParams, useSearchParams } from "next/navigation";
import styled from "@emotion/styled";
import Sort from "./Sort";
import ItemCard from "../ItemCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";

export const Container = styled.div<{ keyword?: string | null }>`
  width: 960px;
  padding: ${(props) =>
    props.keyword === null ? "0 0 0 20px" : "40px 0 0 20px"};

  margin-bottom: 100px;

  span {
    font-weight: 500;
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 230px);
  gap: 36px 6px;

  margin-bottom: 80px;
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
  const page = useSearchParams().get("page");
  const categories = useParams();
  const [itemList, setItemList] = useState<List[]>([]);
  const [totalPage, setTotalPage] = useState(1);

  const getSearchList = async () => {
    const res = await axios.get(
      `/v1/products?product_name=${keyword}&page=${
        page ? `${page}` : "1"
      }&size=20${sort_type ? `&sort_type=${sort_type}` : "&sort_type=RANKING"}`
    );
    setItemList(res.data.data.list);
    setTotalPage(Math.ceil(res.data.data.total_count / 20));
  };

  const getCatSearchList = async () => {
    const res = await axios.get(
      `/v1/categories/${categories.id}/products?page=${
        page ? `${page}` : "1"
      }&size=20${sort_type ? `&sort_type=${sort_type}` : "&sort_type=RANKING"}`
    );
    console.log(res.data.data);
    setItemList(res.data.data.list);
    setTotalPage(Math.ceil(res.data.data.total_count / 20));
  };

  useEffect(() => {
    if (keyword) getSearchList();
    else getCatSearchList();
  }, [keyword, sort_type, page]);

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
      {totalPage > 1 && <Pagination total_page={totalPage} />}
    </Container>
  );
}
