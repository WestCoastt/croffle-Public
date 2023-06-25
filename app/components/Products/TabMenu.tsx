"use client";
import styled from "@emotion/styled";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { reviewAtom } from "./ReviewContents";
import { detailAtom } from "./DetailContents";

const Container = styled.ul<{ fixed: boolean }>`
  position: ${(props) => props.fixed && "fixed"};
  top: ${(props) => props.fixed && "0"};
  z-index: ${(props) => props.fixed && "100"};

  display: flex;
  justify-content: space-between;
  width: 1200px;
  padding: 0;
  margin: auto;
  margin-top: ${(props) => !props.fixed && "70px"};
  background: #fff;
  border-bottom: 1px solid #000;
  list-style: none;

  .underline {
    color: #000;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 3px solid #000;
  }

  li {
    position: relative;
    flex: 1;
    text-align: center;
    padding: 15px 0;
    color: #555;
    font-size: 18px;
    cursor: pointer;
  }
  li:not(:last-of-type) {
    &::after {
      content: "";
      position: absolute;
      right: 0;
      width: 1px;
      height: 30px;
      background: #c4c4c4;
    }
  }
`;

export default function TabMenu() {
  const [fixed, setFixed] = useState(false);
  const [tab, setTab] = useState("detail");
  const tabRef = useRef<HTMLUListElement>(null);
  const [defaultTop, setDefaultTop] = useState(0);
  const detailTop = useAtomValue(detailAtom);
  const reviewTop = useAtomValue(reviewAtom);

  const handleScroll = () => {
    if (tabRef.current) {
      tabRef.current?.offsetTop > 0 && setDefaultTop(tabRef.current?.offsetTop);
      window.scrollY > tabRef.current?.offsetTop && setFixed(true);
    }
    if (window.scrollY <= defaultTop) setFixed(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [defaultTop]);

  const handleTab = (top: number) => {
    window.scrollTo(0, top);
  };

  return (
    <Container fixed={fixed} ref={tabRef}>
      <li
        className={tab === "detail" ? "underline" : ""}
        onClick={() => handleTab(detailTop)}
      >
        상품 상세정보
      </li>
      <li
        className={tab === "review" ? "underline" : ""}
        onClick={() => handleTab(reviewTop)}
      >
        리뷰
      </li>
      <li>Q&A</li>
      <li>배송/반품/교환 안내</li>
    </Container>
  );
}
