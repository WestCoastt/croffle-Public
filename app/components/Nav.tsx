"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Category from "./Category";
import { list } from "../category";

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

  .menu-category {
    cursor: pointer;
    padding: 20px 30px 20px 30px;
  }

  .menu-img {
    width: 42px;
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
  }

  .list {
    position: absolute;
    top: 91px;
    z-index: 10;
    margin: 0;
    width: 118px;
    background: #fff;
    font-size: 14px;
    padding: 10px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);

    li {
      list-style: none;
      padding: 6px 0;

      &:hover {
        color: var(--primary);
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

  a {
    text-decoration: none;
    color: #000;
  }
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
`;

export default function Nav() {
  const category = ["전체", ...Object.keys(list)];
  const [selected, setSelected] = useState(category[0]);
  const [dropdown, setDropdown] = useState(false);
  const [hover, setHover] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

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

  return (
    <NavBar>
      <Container>
        <div
          className="menu-category"
          onMouseOver={() => {
            setHover(true);
          }}
          onMouseOut={() => {
            setHover(false);
          }}
        >
          <img
            className="menu-img"
            src="/assets/img/hamburger.svg"
            alt="menu"
          />
          <Category hover={hover} />
        </div>
        <Link href="/">
          <img src="/assets/img/logo.svg" alt="logo" />
        </Link>
        <SelectBox ref={selectRef}>
          <div className="select">{selected}</div>
          {dropdown && (
            <ul className="list">
              {category.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelected(item);
                    setDropdown(false);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          <img
            className={dropdown ? "up" : ""}
            src="/assets/img/arrow_drop_down.svg"
            alt="category-select"
          />
        </SelectBox>

        <SearchBox>
          <input type="text" placeholder="상품을 검색해보세요!" />
          <img
            style={{ cursor: "pointer" }}
            src="/assets/img/lens.svg"
            alt="search"
          />
        </SearchBox>

        <BtnContainer>
          <Link href="/login">
            <BtnBox>
              <img src="/assets/img/login.svg" alt="login" />
              <div>로그인</div>
            </BtnBox>
          </Link>
          <Link href="/mypage">
            <BtnBox>
              <img src="/assets/img/person.svg" alt="mypage" />
              <div>마이페이지</div>
            </BtnBox>
          </Link>
          <Link href="/cart">
            <BtnBox>
              <img src="/assets/img/bag.svg" alt="cart" />
              <div>장바구니</div>
            </BtnBox>
          </Link>
          <Link href="/support">
            <BtnBox>
              <img src="/assets/img/support.svg" alt="support" />
              <div>고객센터</div>
            </BtnBox>
          </Link>
        </BtnContainer>
      </Container>
    </NavBar>
  );
}
