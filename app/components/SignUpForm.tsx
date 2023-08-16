"use client";
import { atom, useAtom, useSetAtom } from "jotai";
import { Input, Warning } from "../components/Login";
import { ChangeEvent, useEffect, useState } from "react";

interface InputData {
  account_email: string;
  account_password: string;
  account_name: string;
  account_phone: string;
}

export const formAtom = atom(false);
export const inputDataAtom = atom<InputData>({
  account_email: "",
  account_password: "",
  account_name: "",
  account_phone: "",
});
export default function SignUpForm() {
  const [valid, setVaild] = useState({
    account_email: false,
    account_password: false,
    account_name: false,
    account_phone: false,
  });
  const [pwConfirm, setPwConfirm] = useState("");
  const setFormAtom = useSetAtom(formAtom);
  const [inputData, setInputData] = useAtom(inputDataAtom);

  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const pw_regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
  const name_regex = /^[가-힣]+$/;
  const phone_regex = /[0-9]{11}/;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "account_email")
      setVaild({ ...valid, [e.target.name]: regex.test(e.target.value) });
    if (e.target.name === "account_password")
      setVaild({ ...valid, [e.target.name]: pw_regex.test(e.target.value) });
    if (e.target.name === "account_name")
      setVaild({ ...valid, [e.target.name]: name_regex.test(e.target.value) });
    if (e.target.name === "account_phone")
      setVaild({ ...valid, [e.target.name]: phone_regex.test(e.target.value) });

    if (e.target.name === "pw_confirm") {
      setPwConfirm(e.target.value);
    } else {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (
      Object.values(valid).includes(false) ||
      inputData.account_password !== pwConfirm
    )
      setFormAtom(false);
    else setFormAtom(true);
  }, [valid, pwConfirm]);

  return (
    <form action="">
      <Input
        name="account_email"
        placeholder="아이디(이메일)"
        type="email"
        onChange={handleInput}
      />
      {inputData.account_email !== "" && !valid.account_email && (
        <Warning>아이디(이메일)는 이메일 형식으로 입력해 주세요.</Warning>
      )}
      <Input
        name="account_password"
        placeholder="비밀번호"
        type="password"
        onChange={handleInput}
      />
      {inputData.account_password !== "" && !valid.account_password && (
        <Warning>영문,숫자,특수문자를 조합하여 입력해 주세요.(8~20자)</Warning>
      )}
      <Input
        name="pw_confirm"
        placeholder="비밀번호 확인"
        type="password"
        onChange={handleInput}
      />
      {inputData.account_password !== pwConfirm && pwConfirm !== "" && (
        <Warning>비밀번호가 일치하지 않습니다.</Warning>
      )}
      <Input
        name="account_name"
        placeholder="이름"
        type="text"
        onChange={handleInput}
      />
      {inputData.account_name !== "" && !valid.account_name && (
        <Warning>이름을 정확히 입력해 주세요.</Warning>
      )}
      <Input
        onInput={(e: any) =>
          (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
        }
        name="account_phone"
        placeholder="휴대폰번호"
        type="tel"
        onChange={handleInput}
      />
      {inputData.account_phone !== "" && !valid.account_phone && (
        <Warning>휴대폰 번호를 정확히 입력해 주세요.</Warning>
      )}
    </form>
  );
}
