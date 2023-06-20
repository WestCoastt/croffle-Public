"use client";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { selectedAtom } from "./TopContents";
import { ChangeEvent } from "react";

const QuantityContainer = styled.div`
  background: #fafafa;
  border-radius: 5px;
  margin-top: 12px;
  padding: 20px 18px;

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
    width: 42px;
    height: 28px;
    text-align: center;
    border: 0;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
  button {
    width: 28px;
    height: 28px;
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
  item: { name: string; price: number; qty: number };
  idx: number;
}

export default function Quantity({ item, idx }: QuantityProps) {
  const [selArr, setSelArr] = useAtom(selectedAtom);

  return (
    <QuantityContainer key={item.name}>
      <div>
        <span className="option_name">{item.name}</span>
        <button
          onClick={() => {
            selArr.splice(idx, 1);
            setSelArr([...selArr]);
          }}
        >
          <img src="/assets/img/close.svg" alt="delete_item" />
        </button>
      </div>
      <div className="QuantityBox">
        <div className="qty">
          <button
            className={item.qty === 1 ? "dec_blocked" : "dec"}
            onClick={() => {
              if (item.qty === 1) return;
              let arr = [...selArr];
              arr[idx].qty--;
              setSelArr(arr);
            }}
          />
          <input
            type="text"
            value={item.qty}
            onInput={(e: any) =>
              (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = Number(e.target.value);
              if (value <= 0) return;
              let arr = [...selArr];
              arr[idx].qty = value;
              setSelArr(arr);
            }}
          />
          <button
            className="inc"
            onClick={() => {
              let arr = [...selArr];
              arr[idx].qty++;
              setSelArr(arr);
            }}
          />
        </div>
        <span>{(item.price * item.qty).toLocaleString()}원</span>
      </div>
    </QuantityContainer>
  );
}
