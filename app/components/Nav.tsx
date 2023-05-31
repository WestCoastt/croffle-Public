"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const NavBar = styled.div`
  display: flex;
  align-items: center;
  height: 134px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  margin: auto;

  .menu {
    width: 42px;
    margin-right: 48px;
    cursor: pointer;
  }
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 48px;
  font-size: 15px;
  margin-left: 48px;
  border-bottom: 1px solid #000;
  cursor: pointer;

  .select {
    width: 118px;
    // border: 0;
    // appearance: none;
    // outline: none;
    // cursor: pointer;
  }
  .list {
    position: absolute;
    top: 91px;
    z-index: 10;
    background: #fff;
    font-size: 14px;
    padding: 10px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);

    div {
      padding: 6px 0;

      &:hover {
        color: #1d24dd;
        font-weight: 700;
      }
    }
  }
  .up {
    transform: rotate(180deg);
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 48px;
  margin: 14px;
  border-bottom: 1px solid #000;

  input {
    width: 360px;
    border: 0;
    outline: none;
  }
  img {
    width: 30px;
    margin: auto;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin-left: 48px;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
`;

const category = [
  "전체",
  "패션의류",
  "뷰티",
  "출산/유아동",
  "식품",
  "생활/주방",
  "가구/인테리어",
  "가전/디지털",
  "스포츠/레저",
  "자동차용품",
  "문구/도서/취미",
  "반려동물용품",
];

export default function Nav() {
  const [selected, setSelected] = useState(category[0]);
  const [dropdown, setDropdown] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const clickOutside = (e: any) => {
      selectRef.current && !selectRef.current.contains(e.target)
        ? setDropdown(false)
        : setDropdown(!dropdown);
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [selectRef, dropdown]);

  const handleClick = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <NavBar>
      <Container>
        <img className="menu" src="/img/hamburger.svg" alt="menu" />
        <Link href="/">
          <img src="/img/logo.svg" alt="logo" />
        </Link>
        <SelectBox ref={selectRef}>
          {/* transition effect needed */}
          <div className="select">{selected}</div>
          {dropdown && (
            <div className="list">
              {category.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setSelected(item);
                    setDropdown(false);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          <img
            className={dropdown ? "up" : ""}
            src="/img/arrow_drop_down.svg"
            alt="category-select"
          />
        </SelectBox>

        <SearchBox>
          <input type="text" placeholder="상품을 검색해보세요!" />
          <img style={{ cursor: "pointer" }} src="/img/lens.svg" alt="search" />
        </SearchBox>

        <BtnContainer>
          <BtnBox onClick={() => handleClick("login")}>
            <img src="/img/login.svg" alt="login" />
            <div>로그인</div>
          </BtnBox>
          <BtnBox onClick={() => handleClick("mypage")}>
            <img src="/img/person.svg" alt="mypage" />
            <div>마이페이지</div>
          </BtnBox>
          <BtnBox onClick={() => handleClick("cart")}>
            <img src="/img/bag.svg" alt="cart" />
            <div>장바구니</div>
          </BtnBox>
          <BtnBox onClick={() => handleClick("support")}>
            <img src="/img/support.svg" alt="support" />
            <div>고객센터</div>
          </BtnBox>
        </BtnContainer>
      </Container>
    </NavBar>
  );
}
