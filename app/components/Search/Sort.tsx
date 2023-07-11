"use client";
import { useSearchParams } from "next/navigation";
import styled from "@emotion/styled";
import SortLink from "./SortLink";

const Container = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin: 25px 0;
  padding: 0;
  font-size: 14px;
  list-style: none;

  a {
    color: #555555;
    text-decoration: none;
  }

  li {
    white-space: nowrap;
    padding: 0 10px;
    cursor: pointer;

    img {
      margin-right: 4px;
      display: none;
    }
  }
  li:not(:first-of-type) {
    border-left: 1px solid #eee;
  }
  li:first-of-type {
    padding-left: 0;
  }
  .focus {
    a {
      color: var(--primary);
    }
    img {
      display: inline;
    }
  }
`;

export default function Sort() {
  const sort_type = useSearchParams().get("sort_type");
  const sorts = [
    { name: "크로플 랭킹순", code: "RANKING" },
    { name: "판매량순", code: "SALE" },
    { name: "낮은 가격순", code: "LOW_PRICE" },
    { name: "높은 가격순", code: "HIGH_PRICE" },
    { name: "리뷰 많은순", code: "REVIEW" },
    { name: "등록일순", code: "DATE" },
  ];

  const selected = sorts.findIndex((el) => el.code === sort_type);
  const index = selected === -1 ? 0 : selected;

  return (
    <Container>
      {sorts.map((item, i) => (
        <li className={index === i ? "focus" : ""} key={item.name}>
          <SortLink name={item.name} sort_type={item.code} />
        </li>
      ))}
    </Container>
  );
}
