"use client";
import styled from "@emotion/styled";
import { atom, useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { selectedAtom } from "./TopContents";
import axios from "axios";
import { useParams } from "next/navigation";
import { tabMenuAtom } from "./TabMenu";

const Container = styled.div`
  position: relative;
  width: 1200px;
  margin: auto;
  margin-top: 40px;
`;

const ImageContainer = styled.div<{ hgt: boolean; dp: boolean }>`
  display: ${(props) => !props.dp && "none"};
  width: fit-content;
  height: ${(props) => props.hgt && "3000px"};
  overflow: hidden;
  margin: 0 auto;

  -webkit-mask-image: ${(props) =>
    props.hgt && "linear-gradient(180deg, #000 82%, transparent)"};
`;

const ShowMore = styled.div<{ hgt: boolean }>`
  display: flex;
  justify-content: center;
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

export const detailAtom = atom(0);
export const maskingAtom = atom(false);
export default function DetailContents() {
  const [masking, setMasking] = useAtom(maskingAtom);
  const [detailTop, setDetailTop] = useAtom(detailAtom);
  const [loaded, setLoaded] = useState(false);
  const [image, setImage] = useState("");
  const tabMenu = useAtomValue(tabMenuAtom);
  const imgRef = useRef<HTMLImageElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const selArr = useAtomValue(selectedAtom);

  const params = useParams();

  useEffect(() => {
    tabMenu === "detail" && detailRef.current?.scrollIntoView();
  }, [tabMenu]);

  const getContent = async () => {
    const res = await axios.get(`/v1/products/${params.id}/contents`);
    setImage(res.data.data.list[0].content);
  };

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    if (imgRef.current) {
      setMasking(imgRef.current?.offsetHeight >= 3000);
    }
  }, [loaded]);

  useEffect(() => {
    if (detailRef.current) {
      setDetailTop(detailRef.current?.offsetTop);
    }
  }, [detailRef, selArr]);

  return (
    <Container ref={detailRef}>
      <ImageContainer hgt={masking} dp={loaded}>
        <img
          src={image}
          alt="product_detail"
          ref={imgRef}
          onLoad={() => setLoaded(true)}
        />
      </ImageContainer>
      <ShowMore hgt={masking}>
        <button
          onClick={() => {
            setMasking(!masking);
            masking === false && scrollTo(0, detailTop);
          }}
        >
          <span>{masking ? "상품정보 더보기" : "상품정보 접기"}</span>
          <img
            className={masking ? "" : "up"}
            src="/assets/img/option_arrow.svg"
            alt="show_more"
          />
        </button>
      </ShowMore>
    </Container>
  );
}
