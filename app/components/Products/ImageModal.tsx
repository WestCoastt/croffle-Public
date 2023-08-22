"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReviewItem, modalAtom } from "./ReviewContents";
import { useSetAtom } from "jotai";
import Image from "next/image";

const Container = styled.div`
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal {
    width: 710px;
    height: fit-content;
    background-color: #fff;
    border-radius: 12px;
  }
  .contents {
    padding: 16px 0;
  }

  h3 {
    display: flex;
    justify-content: space-between;
    margin: 30px 30px 20px;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: -0.5px;

    img {
      width: 34px;
      padding: 0 8px;
      cursor: pointer;
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;

  div {
    position: relative;
    width: 570px;
    height: 440px;
  }

  .arrow {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
  .left {
    background: url("/assets/img/arrow_left_no_bg.svg") no-repeat center;
  }
  .right {
    background: url("/assets/img/arrow_right_no_bg.svg") no-repeat center;
  }
  .hide {
    visibility: hidden;
  }
`;

const ImageList = styled.div`
  width: 570px;
  margin: auto;
  padding: 24px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 58px);
  gap: 6px;

  div {
    position: relative;
    height: 58px;
    cursor: pointer;
  }
  .selected {
    border: 3px solid #346aff;
  }
`;

interface ImageModalProps {
  images: {
    idx: number;
    items: { image_url: string }[];
  };
}

export default function ImageModal({ images }: ImageModalProps) {
  const setModal = useSetAtom(modalAtom);
  const [index, setIndex] = useState(images.idx);

  const handleClose = () => {
    setModal(false);
  };

  const handleIndex = (i: number) => {
    setIndex(i);
  };

  const handleNavigate = (dir: string) => {
    if (dir === "left") {
      index > 0 && setIndex(index - 1);
    } else {
      index + 1 < images.items.length && setIndex(index + 1);
    }
  };

  return (
    <Container>
      <div className="bg">
        <div className="modal">
          <h3>
            <span>사진 후기</span>
            <img
              src="/assets/img/close.svg"
              alt="close"
              onClick={handleClose}
            />
          </h3>
          <div className="contents">
            <ImageContainer>
              <button
                className={`arrow left ${index === 0 ? "hide" : ""}`}
                onClick={() => {
                  handleNavigate("left");
                }}
              />
              <div>
                <Image
                  src={images.items[index].image_url}
                  alt={`image ${images.idx}`}
                  fill={true}
                />
              </div>
              <button
                className={`arrow right ${
                  index + 1 === images.items.length ? "hide" : ""
                }`}
                onClick={() => {
                  handleNavigate("right");
                }}
              />
            </ImageContainer>

            <ImageList>
              {images.items.map((item: { image_url: string }, i: number) => (
                <div className={`${index === i ? "selected" : ""}`} key={i}>
                  <Image
                    src={item.image_url}
                    alt={`image ${i}`}
                    fill={true}
                    onClick={() => {
                      handleIndex(i);
                    }}
                  />
                </div>
              ))}
            </ImageList>
          </div>
        </div>
      </div>
    </Container>
  );
}
