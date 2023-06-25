"use client";
import styled from "@emotion/styled";
import { atom, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";

const Container = styled.div`
  width: 1200px;
  margin: auto;
  margin-bottom: 1000px;
`;

export const reviewAtom = atom(0);
export default function ReviewContents() {
  const reviewRef = useRef<HTMLDivElement>(null);
  const setReviewTop = useSetAtom(reviewAtom);

  useEffect(() => {
    reviewRef.current && setReviewTop(reviewRef.current?.offsetTop);
  }, [reviewRef]);
  // reviewRef.current && setReviewTop(reviewRef.current?.offsetTop);

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
