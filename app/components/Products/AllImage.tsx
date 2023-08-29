"use client";
import axios from "axios";
import { useAtom, useSetAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";
import { allImageAtom } from "./ReviewContents";
import styled from "@emotion/styled";

const Container = styled.div`
  position: fixed;
  z-index: 102;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .close {
    position: fixed;
    z-index: 103;
    width: 44px;
    padding: 0 8px;
    cursor: pointer;

    top: 30px;
    right: 30px;
  }
  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal {
    width: 882px;
    height: 700px;
    padding: 0 16px;
    background-color: #fff;

    h3 {
      font-size: 24px;
      font-weight: 500;
    }
    img {
      cursor: pointer;
    }
  }
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 140px);
  gap: 2px;
`;

export default function AllImage(props: { sq: string; page: number }) {
  const setAllImage = useSetAtom(allImageAtom);
  const [list, setList] = useState([]);

  const getList = async () => {
    const res = await axios.get(
      `/v1/products/${props.sq}/reviews?sort_type=STAR&page=${props.page}&size=50&is_image=true`
    );
    const list = res.data.data.list.map((item: any) =>
      item.review_image.map((el: any) => ({
        id: item.account,
        content: item.content,
        insert_dttm: item.insert_dttm,
        img: el.image_url,
      }))
    );
    setList(list.flat());
    // console.log(res.data.data.list);
  };

  useEffect(() => {
    getList();
  }, []);

  const handleClose = () => {
    setAllImage(false);
  };

  return (
    <Container>
      <img
        className="close"
        src="/assets/img/close.svg"
        alt="close"
        onClick={handleClose}
      />
      <div className="bg">
        <div className="modal">
          <h3>사진 후기 전체보기</h3>
          <ImageContainer>
            {list.map((item: any, i: number) => (
              <Image
                key={item.img + i}
                src={item.img}
                alt="review"
                width={140}
                height={140}
              />
            ))}
          </ImageContainer>
        </div>
      </div>
    </Container>
  );
}
