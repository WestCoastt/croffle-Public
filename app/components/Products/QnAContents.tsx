"use client";
import styled from "@emotion/styled";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { maskingAtom } from "./DetailContents";
import { selectedAtom } from "./TopContents";

const Container = styled.div`
  width: 1200px;
  margin: auto;
  padding: 100px 0 50px;
  margin-bottom: 600px;
`;

export const qnaAtom = atom(0);
export default function QnAContents() {
  const qnaRef = useRef<HTMLDivElement>(null);
  const setqnaTop = useSetAtom(qnaAtom);
  const masking = useAtomValue(maskingAtom);
  const selArr = useAtomValue(selectedAtom);

  useEffect(() => {
    qnaRef.current && setqnaTop(qnaRef.current?.offsetTop - 120);
  }, [qnaRef, masking, selArr]);

  return (
    <Container ref={qnaRef}>
      <h1>상품Q&A</h1>
      <div>상품문의1</div>
      <div>상품문의2</div>
      <div>상품문의3</div>
      <div>상품문의4</div>
      <div>상품문의5</div>
      <div>상품문의6</div>
      <div>상품문의7</div>
      <div>상품문의8</div>
      <div>상품문의9</div>
    </Container>
  );
}
