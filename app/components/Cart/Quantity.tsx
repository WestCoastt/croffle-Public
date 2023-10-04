"use client";
import styled from "@emotion/styled";
import axios from "axios";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";

const QuantityContainer = styled.div`
  // background: #fafafa;
  border-radius: 5px;
  margin-top: 12px;
  // padding: 20px 18px;

  div {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .option_name {
    color: #555555;
    width: 460px;
    max-height: 46px;
    overflow: hidden;
  }

  .QuantityBox {
    margin-top: 24px;

    span {
      font-weight: 700;
    }
  }
  .qty {
    display: flex;
    align-items: center;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
  }
  input {
    width: 40px;
    height: 28px;
    text-align: center;
    border: 0;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
  .quant {
    outline: none;
    cursor: initial;
  }
  button {
    width: 27px;
    height: 27px;
    padding: 0;
    border: none;
    background: initial;
    cursor: pointer;
  }
  .dec {
    background: url("/assets/img/dec.svg");
    background-position: center;
  }
  .dec_blocked {
    background: url("/assets/img/dec_blocked.svg");
    background-position: center;
  }
  .inc {
    background: url("/assets/img/inc.svg");
    background-position: center;
  }
`;

interface QuantityProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  sq?: number;
}

export default function Quantity({ quantity, setQuantity, sq }: QuantityProps) {
  // export default function Quantity({ item, idx }: QuantityProps) {
  const cart = usePathname().includes("cart");
  const [qty, setQty] = useState(1);
  const [cookies, setCookie, removeCookie] = useCookies(["sck"]);
  const tk = localStorage.getItem("tk");
  const auth = {
    Authorization: `Bearer ${cookies.sck ? cookies.sck : tk ? tk : ""}`,
  };

  const updateQty = async (qty: number) => {
    const body = {
      quantity: qty,
    };

    const res = await axios.put(`/v1/carts/${sq}`, body, {
      headers: auth,
    });

    // console.log(res.data);
  };

  return (
    <QuantityContainer>
      {cart ? (
        <div className="QuantityBox">
          <div className="qty">
            <button
              // className="dec_blocked"
              className={quantity === 1 ? "dec_blocked" : "dec"}
              onClick={() => {
                if (quantity === 1) return;
                setQuantity(quantity - 1);
                updateQty(quantity - 1);
              }}
            />
            <input
              className="quant"
              readOnly
              type="text"
              value={quantity}
              // onInput={(e: any) =>
              //   (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              // }
              // onChange={(e: ChangeEvent<HTMLInputElement>) => {
              //   const value = Number(e.target.value);
              //   if (value <= 0) return;
              //   setQuantity(value);
              // }}
            />
            <button
              className="inc"
              onClick={() => {
                setQuantity(quantity + 1);
                updateQty(quantity + 1);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="QuantityBox">
          <div className="qty">
            <button
              // className="dec_blocked"
              className={qty === 1 ? "dec_blocked" : "dec"}
              onClick={() => {
                if (qty === 1) return;
                setQty(qty - 1);
              }}
            />
            <input
              type="text"
              value={qty}
              onInput={(e: any) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const value = Number(e.target.value);
                if (value <= 0) return;
                setQty(value);
              }}
            />
            <button
              className="inc"
              onClick={() => {
                setQty(qty + 1);
              }}
            />
          </div>
        </div>
      )}
    </QuantityContainer>
  );
}
