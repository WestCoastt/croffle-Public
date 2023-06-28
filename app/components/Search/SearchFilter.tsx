"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import FilterLink from "../Products/FilterLink";
const Container = styled.div`
  width: 240px;
  height: 740px;
  border: 1px solid #eeeeee;
  p {
    font-weight: 500;
    padding: 20px;
  }
`;

const FilterBox = styled.ul`
  margin: 0;
  padding: 20px;
  border-top: 1px solid #eeeeee;
  list-style: none;

  div {
    font-weight: 500;
    margin-bottom: 14px;
  }

  a {
    display: block;
    padding: 6px 0;
    text-decoration: none;
    color: #000;
  }

  .focus > a {
    color: var(--primary);
  }
`;

export default function SearchFilter() {
  const pathname = usePathname();
  const filter_name = useSearchParams().get("filter_name");

  const changeCategory = (filter_name: string) => {
    const URLSearch = new URLSearchParams(location.search);
    URLSearch.set("filter_name", filter_name);

    return pathname + "?" + URLSearch.toString();
  };

  const changeClassName = (ca: string) => {
    return filter_name === ca ? "focus" : "";
  };

  return (
    <Container>
      <p>필터</p>
      <FilterBox>
        <div>카테고리</div>
        <li className={changeClassName("digital")}>
          <FilterLink name="가전/디지털" filter_name="digital" />
        </li>
        <li className={changeClassName("furniture")}>
          <FilterLink name="가구/인테리어" filter_name="furniture" />
        </li>
        <li className={changeClassName("hobby")}>
          <FilterLink name="취미/문구/도서" filter_name="hobby" />
        </li>
      </FilterBox>
      <FilterBox>배송/혜택</FilterBox>
      <FilterBox>가격</FilterBox>
    </Container>
  );
}
