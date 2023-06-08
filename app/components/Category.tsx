"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { list } from "../category";

const Container = styled.div<{ hover: boolean }>`
  display: ${(props) => (props.hover ? "block" : "none")};
  position: absolute;
  top: 110px;
  z-index: 10;
  width: 170px;
  padding: 8px 12px 2px;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: -1px 4px 5px rgba(0, 0, 0, 0.3);

  a {
    display: block;
    margin-bottom: 10px;
    text-decoration: none;
    color: initial;

    &:hover {
      color: var(--primary);
    }
  }
`;

interface CategoryProps {
  hover: boolean;
}

export default function Category({ hover }: CategoryProps) {
  return (
    <Container hover={hover}>
      {Object.keys(list).map((item) => (
        <Link href={`${item}`} key={item}>
          {item}
        </Link>
      ))}
    </Container>
  );
}
