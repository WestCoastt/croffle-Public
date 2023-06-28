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
  li:not(.no_divider) {
    border-left: 1px solid #eee;
  }
  .no_divider {
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
  const sorted_type = Number(useSearchParams().get("sorted_type"));
  const sort = [
    "크로플 랭킹순",
    "판매량순",
    "낮은 가격순",
    "높은 가격순",
    "리뷰많은순",
    "등록일순",
  ];

  return (
    <Container>
      {sort.map((item, i) => (
        <li
          className={
            (item === "크로플 랭킹순" ? "no_divider " : "") +
            (sorted_type === i ? "focus" : "")
          }
          key={item}
        >
          <SortLink item={item} sorted_type={i} />
        </li>
      ))}
    </Container>
  );
}
