"use client";
import styled from "@emotion/styled";
import ItemCard from "./ItemCard";
import axios from "axios";
import { useEffect, useState } from "react";

const Container = styled.div`
  margin: auto;
  margin-top: 40px;
  margin-bottom: 70px;
  max-width: 1200px;

  display: grid;
  grid-template-columns: repeat(auto-fill, 230px);
  gap: 30px 12px;
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

export default function Weekly() {
  const [itemList, setItemList] = useState<List[]>([]);
  const getSearchList = async () => {
    const res = await axios.get(`/v1/products?sort_type=WEEKLY&page=1&size=10`);
    setItemList(res.data.data.list);
  };

  useEffect(() => {
    getSearchList();
  }, []);

  return (
    <Container>
      {itemList.length !== 0 &&
        itemList.map((item) => <ItemCard key={item.name} item={item} />)}
    </Container>
  );
}
