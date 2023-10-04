"use client";
import styled from "@emotion/styled";
import Image from "next/image";
import Quantity from "./Quantity";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSetAtom } from "jotai";
import { deleteItemAtom } from "./Items";

const Container = styled.div`
  width: 100%;
  border-top: 1px solid #000;

  .content {
    display: flex;
    height: 148px;
  }
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;

    input {
      width: 16px;
      height: 16px;
      margin: 0 10px 0 20px;
    }
    .name {
      color: #000;
      font-size: 16px;
      letter-spacing: -0.8px;

      p {
        margin: 6px 0 0;
        color: #000;
      }
    }
    p {
      color: #888;
      margin: 0;
      margin-top: 10px;
      font-size: 14px;
      letter-spacing: -0.7px;
    }
  }

  .pd {
    width: 100%;
    padding: 25px;
    border-left: 1px solid #e5e5e5;
    font-weight: 500;
    letter-spacing: -0.7px;
  }
  .qty {
    max-width: 156px;
  }
  .fee {
    max-width: 133px;
  }
  .price {
    position: relative;
    max-width: 214px;
  }
  .fw {
    margin-top: 24px;
    color: #000;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: -1.2px;

    span {
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.7px;
    }
  }

  .price_bar {
    display: flex;
    justify-content: center;
    gap: 30px;
    padding: 10px 0;
    background: #f9f9f9;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;

    div {
      color: #555;
      font-size: 14px;
      letter-spacing: -0.7px;
    }
    .plus {
      padding: 0 16px;
    }
    .fw {
      padding-left: 6px;
    }
    .fw,
    .order_price {
      color: #000;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: -0.8px;
    }
    .order {
      color: #000;
      padding-right: 10px;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.7px;
    }
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 2px;
  background: #fff;
  border: none;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }
`;

export default function OrderItemCard({ data }: any) {
  const [qty, setQty] = useState(data.quantity);
  const setDelete = useSetAtom(deleteItemAtom);
  const [cookies, setCookie, removeCookie] = useCookies(["sck"]);
  const tk = localStorage.getItem("tk");
  const auth = {
    Authorization: `Bearer ${cookies.sck ? cookies.sck : tk ? tk : ""}`,
  };

  const price =
    (data.product.total_price + data.product_option.add_price) * qty;
  const fee = 3000;

  // console.log(data);

  const deleteItem = async () => {
    const res = await axios.delete(`/v1/carts/${data.sq}`, {
      headers: auth,
    });
    // console.log(res.data);
    setDelete(true);
  };

  return (
    <Container>
      <div className="content">
        <div className="title">
          <input type="checkbox" name="product" />
          <Image
            src={data.product.product_image[0].image_url}
            alt="상품"
            width={110}
            height={110}
          />
          <div>
            <div className="name">
              <div>{data.product.name}</div>
              <p>{data.product_option.name}</p>
            </div>
            <p className="eta">8/19(토) 도착 예정</p>
          </div>
        </div>
        <div className="qty pd">
          <div>수량</div>
          <div>
            <Quantity quantity={qty} setQuantity={setQty} sq={data.sq} />
          </div>
        </div>
        <div className="fee pd">
          <div>배송비</div>
          <div className="fw">
            {fee.toLocaleString()}
            <span>원</span>
          </div>
        </div>
        <div className="price pd">
          <div>상품가격</div>
          <div className="fw">
            {price.toLocaleString()}
            <span>원</span>
          </div>

          <DeleteBtn onClick={deleteItem}>
            <img src="/assets/img/delete.svg" alt="delete" />
          </DeleteBtn>
        </div>
      </div>
      <div className="price_bar">
        <div>
          <span>상품금액</span>
          <span className="fw">{price.toLocaleString()}원</span>
          <span className="plus">+</span>
          <span>배송비</span>
          <span className="fw">{fee.toLocaleString()}원</span>
        </div>

        <div className="order_price">
          <span className="order">주문금액 :</span>
          {(price + fee).toLocaleString()}원
        </div>
      </div>
    </Container>
  );
}
