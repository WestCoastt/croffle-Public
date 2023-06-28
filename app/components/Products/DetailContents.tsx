"use client";
import styled from "@emotion/styled";
import { atom, useAtom, useSetAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { selectedAtom } from "./TopContents";

const Container = styled.div`
  position: relative;
  width: 1200px;
  margin: auto;
  margin-top: 40px;
  // margin-bottom: 60px;
`;

const ImageContainer = styled.div<{ hgt: boolean }>`
  width: fit-content;
  height: ${(props) => props.hgt && "3000px"};
  overflow: hidden;
  margin: 0 auto;

  -webkit-mask-image: ${(props) =>
    props.hgt && "linear-gradient(180deg, #000 82%, transparent)"};
`;

const ShowMore = styled.div<{ hgt: boolean }>`
  // position: absolute;
  display: flex;
  justify-content: center;
  // bottom: ${(props) => (props.hgt ? "26px" : "-60px")};
  z-index: 20;
  width: 100%;

  button {
    width: 300px;
    height: 50px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #000;
    background: #fff;
    cursor: pointer;
  }
  span {
    margin-right: 8px;
  }
  .up {
    transform: rotate(180deg);
  }
`;

const image =
  "https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/ea577a55-6c8a-4ad6-b4c3-2b59904632fc";

export const detailAtom = atom(0);
export const maskingAtom = atom(false);
export default function DetailContents() {
  const [masking, setMasking] = useAtom(maskingAtom);
  const imgRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const setReviewTop = useSetAtom(detailAtom);
  const selArr = useAtomValue(selectedAtom);

  useEffect(() => {
    detailRef.current && setReviewTop(detailRef.current?.offsetTop);
  }, [detailRef, selArr]);

  useEffect(() => {
    if (imgRef.current && imgRef.current?.offsetHeight >= 3000) {
      setMasking(true);
    }
  }, [imgRef]);

  return (
    <Container ref={detailRef}>
      <ImageContainer hgt={masking} ref={imgRef}>
        <img src={image} alt="product_detail" />
      </ImageContainer>
      <ShowMore hgt={masking}>
        <button
          onClick={() => {
            setMasking(!masking);
          }}
        >
          <span>{masking ? "상품정보 더보기" : "상품정보 접기"}</span>
          <img
            className={masking ? "" : "up"}
            src="/assets/img/option_arrow.svg"
            alt="category-select"
          />
        </button>
      </ShowMore>
    </Container>
  );
}
