"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { useAtom } from "jotai";
import { depthAtom } from "./Nav";
import { cat } from "../cateogry";
import { useState } from "react";

const Container = styled.div<{ hover: boolean }>`
  display: ${(props) => (props.hover ? "block" : "none")};
  position: absolute;
  top: 86px;
  z-index: 10;
  font-size: 14px;

  ul {
    width: 170px;
    height: 700px;
    margin: 0;
    padding: 8px 6px 2px 12px;
    list-style: none;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 1px 4px 5px rgba(0, 0, 0, 0.3);
  }

  .focus {
    a {
      color: var(--primary);
      font-weight: bold;
      text-decoration: underline;
    }

    .arrow {
      display: inline-block;
    }
  }

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    text-decoration: none;
    color: initial;

    .arrow {
      display: none;
      width: 12px;
      height: 12px;
      position: relative;
      transform: rotate(270deg);
      filter: invert(18%) sepia(92%) saturate(7475%) hue-rotate(243deg)
        brightness(86%) contrast(102%);
      background: url("/assets/img/arrow_drop_down.svg") no-repeat center;
    }
  }
`;

// const SecondDepth = styled.ul<{ display?: string }>`
const SecondDepth = styled.ul<{ display?: boolean }>`
  display: ${(props) => (props.display ? "block" : "none")};
  position: absolute;
  background: #fff;
  top: 0;
  left: 170px;

  width: 180px;
  margin: 0;
  padding: 8px 6px 2px 12px;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 1px 4px 5px rgba(0, 0, 0, 0.3);

  .link {
    padding: 8px 0;
  }
`;

const ThirdDepth = styled(SecondDepth)<{ display?: boolean }>`
  left: 340px;

  .link {
    padding: 5px 0;

    &:hover {
      color: var(--primary);
      font-weight: bold;
      text-decoration: underline;
    }
  }
`;

interface CategoryProps {
  hover: boolean;
}

interface Child2 {
  name: string;
  id: number;
  child: {
    name: string;
    id: number;
  }[];
}

interface Child3 {
  name: string;
  id: number;
}

export default function Category({ hover }: CategoryProps) {
  const [depth, setDepth] = useAtom(depthAtom);
  const [child2, setChild2] = useState<Child2[]>([]);
  const [child3, setChild3] = useState<Child3[]>([]);

  return (
    <Container hover={hover}>
      <ul>
        {cat.map((item) => (
          <li
            key={item.name}
            className={item.id === depth[0] ? "focus" : ""}
            onMouseOver={() => {
              setDepth([item.id, 0]);
              setChild2(item.child);
            }}
          >
            <Link href={`/categories/${item.id}`}>
              {item.name}
              <i className="arrow" />
            </Link>
          </li>
        ))}
      </ul>
      <SecondDepth display={child2.length > 0}>
        {child2.map((item) => (
          <li
            key={item.name}
            className={item.id === depth[1] ? "focus" : ""}
            onMouseOver={() => {
              let arr = [...depth];
              arr[1] = item.id;
              setDepth(arr);
              setChild3(item.child);
            }}
          >
            <Link
              className="link"
              href={`/categories/${depth[0].toString() + item.id.toString()}`}
            >
              {item.name}
              <i className="arrow" />
            </Link>
          </li>
        ))}
      </SecondDepth>
      <ThirdDepth display={child3.length > 0}>
        {child3.map((item) => (
          <li key={item.name}>
            <Link
              className="link"
              href={`/categories/${
                depth[0].toString() + depth[1].toString() + item.id.toString()
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ThirdDepth>
    </Container>
  );
}
