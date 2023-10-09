"use client";
import styled from "@emotion/styled";
import OrderItemCard from "./OrderItemCard";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { cartAtom } from "../Nav";

const Container = styled.div`
  width: 1200px;
  margin: auto;
  margin-top: 40px;

  h3 {
    text-align: center;
    margin: 40px 0;
    font-size: 32px;
    font-weight: 500;
    letter-spacing: -1.6px;
  }
`;

const DelContainer = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 18px;
    height: 18px;
    margin: 0 6px 2px 20px;
  }
`;

const DeleteBtn = styled.button`
  margin-left: 14px;
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background: #fff;
  color: #888;
  font-size: 14px;
  letter-spacing: -0.7px;
  cursor: pointer;
`;

const CardContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const TotalContainer = styled.div`
  width: 100%;
  margin-bottom: 70px;
  padding: 20px 0;
  border-radius: 5px;
  border: 2px solid #eee;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

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
  .order_price {
    display: flex;
    align-items: center;
  }
  .order {
    color: #000;
    padding-right: 10px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.7px;
  }
  .red {
    color: #e50000;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: -1.2px;
  }
`;

interface OrderItem {
  sq: number;
  fee: number;
  price: number;
}

export const deleteItemAtom = atom(false);
export const orderListAtom = atom<OrderItem[]>([]);
export default function Items() {
  const [cookies, setCookie, removeCookie] = useCookies(["sck"]);
  const [itemList, setItemList] = useState([]);
  const orderList = useAtomValue(orderListAtom);
  const [deleteItem, setDeleteItem] = useAtom(deleteItemAtom);
  const setCart = useSetAtom(cartAtom);

  const getCartList = async () => {
    const tk = localStorage.getItem("tk");
    const auth = {
      Authorization: `Bearer ${cookies.sck ? cookies.sck : tk ? tk : ""}`,
    };
    const res = await axios.get(`/v1/carts`, {
      headers: auth,
    });
    setCart(res.data.data.list.length);
    setItemList(res.data.data.list);
    setDeleteItem(false);
  };

  useEffect(() => {
    getCartList();
  }, [deleteItem]);

  useEffect(() => {
    console.log(orderList);
  }, [orderList]);

  return (
    <Container>
      <h3>장바구니</h3>

      <DelContainer>
        <input type="checkbox" name="select_all" />
        <label>전체선택(0/{itemList.length})</label>
        <DeleteBtn>선택삭제</DeleteBtn>
      </DelContainer>
      <CardContainer>
        {itemList.map((item, i) => (
          <OrderItemCard key={i} data={item} />
        ))}
      </CardContainer>

      <TotalContainer>
        <div>
          <span>총 상품금액</span>
          <span className="fw">
            {orderList.length > 0
              ? orderList
                  .map((item) => item.price)
                  .reduce((a, b) => a + b)
                  .toLocaleString()
              : 0}
            원
          </span>
          <span className="plus">+</span>
          <span>총 배송비</span>
          <span className="fw">
            {orderList.length > 0
              ? orderList
                  .map((item) => item.fee)
                  .reduce((a, b) => a + b)
                  .toLocaleString()
              : 0}
            원
          </span>
        </div>

        <div className="order_price">
          <span className="order">총 주문금액 :</span>
          <span className="red">
            {orderList.length > 0
              ? orderList
                  .map((item) => item.fee + item.price)
                  .reduce((a, b) => a + b)
                  .toLocaleString()
              : 0}
            원
          </span>
        </div>
      </TotalContainer>
    </Container>
  );
}
