"use client";
import { useState } from "react";
import styled from "@emotion/styled";

const Check = styled.input<{ check: boolean }>`
  width: 24px;
  height: 24px;
  margin-right: 6px;
  vertical-align: middle;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;

  &::before {
    width: 24px;
    height: 24px;
    content: "";
    display: block;
    background: url(${(props) =>
        props.check ? "/assets/img/checked.svg" : "/assets/img/unchecked.svg"})
      center no-repeat;
    border: 0;
    background-size: cover;
  }
`;

interface CheckBoxProps {
  label: string;
}

export default function CheckBox({ label }: CheckBoxProps) {
  //if(label === "로그인 상태 유지" && checked) { const [cookies, setCookie, removeCookie] = useCookies()}
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <Check
        id="checkbox"
        type="checkbox"
        check={checked}
        onChange={() => {
          setChecked(!checked);
        }}
      />
      <label
        style={{ verticalAlign: "middle", cursor: "pointer" }}
        htmlFor="checkbox"
      >
        {label}
      </label>
    </div>
  );
}
