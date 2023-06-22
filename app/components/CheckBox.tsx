"use client";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { atom, useAtom } from "jotai";

export const checkBoxAtom = atom([false, false, false]);
const Check = styled.input<{ check: boolean; sm?: boolean }>`
  width: ${(props) => (props.sm ? "20px" : "24px")};
  height: ${(props) => (props.sm ? "20px" : "24px")};
  margin-right: 6px;
  vertical-align: middle;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;

  &::before {
    width: ${(props) => (props.sm ? "20px" : "24px")};
    height: ${(props) => (props.sm ? "20px" : "24px")};
    content: "";
    display: block;
    background: url(${(props) =>
        props.check ? "/assets/img/checked.svg" : "/assets/img/unchecked.svg"})
      center no-repeat;
    border: 0;
    background-size: cover;
  }
`;

const Label = styled.label<{ sm?: boolean }>`
  font-size: ${(props) => (props.sm ? "13px" : "14px")};
  vertical-align: middle;
  cursor: pointer;
`;

interface CheckBoxProps {
  label: string;
  sm?: boolean;
  idx?: number;
}

export default function CheckBox({ label, sm, idx }: CheckBoxProps) {
  //if(label === "로그인 상태 유지" && checked) { const [cookies, setCookie, removeCookie] = useCookies()}
  const [checked, setChecked] = useState(false);
  const [check, setCheck] = useAtom(checkBoxAtom);
  const [termCheck, setTermCheck] = useState(idx !== undefined && check[idx]);

  const handleCheck = (idx: number) => {
    let data = [...check];
    data[idx] = termCheck;
    setCheck(data);
  };

  useEffect(() => {
    idx !== undefined && handleCheck(idx);
  }, [termCheck]);

  const handleFullAgreement = () => {
    setChecked(!checked);
    setCheck([!checked, !checked, !checked]);
  };

  const handleChange = () => {
    if (idx !== undefined) {
      setTermCheck(!termCheck);
      return;
    }
    if (idx === undefined && label === "전체 동의합니다.") {
      handleFullAgreement();
      return;
    }
    if (idx === undefined) setChecked(!checked);
  };

  useEffect(() => {
    idx !== undefined && setTermCheck(check[idx]);
    if (
      check.every((value) => value === true) &&
      label === "전체 동의합니다."
    ) {
      setChecked(true);
    }
    if (
      check.some((value) => value === false) &&
      label === "전체 동의합니다."
    ) {
      setChecked(false);
    }
  }, [check]);

  return (
    <div>
      <Check
        id={label}
        type="checkbox"
        check={idx !== undefined ? termCheck : checked}
        sm={sm}
        onChange={handleChange}
      />
      <Label sm={sm} htmlFor={label}>
        {label}
      </Label>
    </div>
  );
}
