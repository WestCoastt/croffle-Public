"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { useAtom } from "jotai";
import { list } from "../category";
import { depthAtom } from "./Nav";

const Container = styled.div<{ hover: boolean }>`
  display: ${(props) => (props.hover ? "block" : "none")};
  position: absolute;
  top: 110px;
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

    &:hover {
      color: var(--primary);
      font-weight: bold;
      text-decoration: underline;

      .arrow {
        display: inline-block;
      }
    }
  }
`;

const SecondDepth = styled.ul<{ display?: string }>`
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

const ThirdDepth = styled(SecondDepth)<{ display?: string }>`
  left: 340px;

  .link {
    padding: 5px 0;
  }
`;

interface CategoryProps {
  hover: boolean;
}

interface List {
  [key: string]: {
    [key: string]: string[];
  };
}

export default function Category({ hover }: CategoryProps) {
  const item_list: List = list;
  const [depth, setDepth] = useAtom(depthAtom);

  return (
    <Container hover={hover}>
      <ul>
        {Object.keys(item_list).map((item) => (
          <li
            key={item}
            onMouseOver={() => {
              setDepth([item, ""]);
            }}
          >
            <Link href={`${item}`}>
              {item}
              <i className="arrow" />
            </Link>
          </li>
        ))}
      </ul>
      <SecondDepth display={depth[0]}>
        {depth[0] !== "" &&
          Object.keys(item_list[depth[0]]).map((item) => (
            <li
              key={item}
              onMouseOver={() => {
                let arr = [...depth];
                arr[1] = item;
                setDepth(arr);
              }}
            >
              <Link className="link" href={`${item}`}>
                {item}
                <i className="arrow" />
              </Link>
            </li>
          ))}
      </SecondDepth>
      <ThirdDepth display={depth[1]}>
        {depth[1] !== "" &&
          item_list[depth[0]][depth[1]].map((item) => (
            <li key={item}>
              <Link className="link" href={`${item}`}>
                {item}
              </Link>
            </li>
          ))}
      </ThirdDepth>
    </Container>
  );
}
