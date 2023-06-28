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
  // margin-top: 100px;
  margin-bottom: 600px;
`;

export const reviewAtom = atom(0);
export default function ReviewContents() {
  const reviewRef = useRef<HTMLDivElement>(null);
  const setReviewTop = useSetAtom(reviewAtom);
  const masking = useAtomValue(maskingAtom);
  const selArr = useAtomValue(selectedAtom);

  useEffect(() => {
    reviewRef.current && setReviewTop(reviewRef.current?.offsetTop - 120);
  }, [reviewRef, masking, selArr]);

  return (
    <Container ref={reviewRef}>
      <h1>고객리뷰</h1>
      <div>리뷰1</div>
      <div>리뷰2</div>
      <div>리뷰3</div>
      <div>리뷰4</div>
      <div>리뷰5</div>
      <div>리뷰6</div>
      <div>리뷰7</div>
      <div>리뷰8</div>
      <div>리뷰9</div>
    </Container>
  );
}
