"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { atom, useSetAtom } from "jotai";
import Category from "./Category";
import { list } from "../category";

const NavBar = styled.div`
  display: flex;
  align-items: center;
  height: 134px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 3px 4px 0px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  margin: auto;

  .menu-category {
    cursor: pointer;
    padding: 20px 0;
  }

  .menu-img {
    width: 42px;
  }
`;

const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 48px;
  margin-left: 20px;
  font-size: 15px;
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
  // width: 400px;
  width: 500px;
  height: 48px;
  margin: 14px;
  border-bottom: 1px solid #000;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  input {
    width: 360px;
    border: 0;
    outline: none;
  }

  button {
    width: 30px;
    height: 30px;
    border: none;
    background: url("/assets/img/lens.svg") no-repeat center;
    background-size: cover;
    cursor: pointer;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin-left: 8px;

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

export const depthAtom = atom(["", ""]);

export default function Nav() {
  const router = useRouter();
  const searchParams = useSearchParams().get("keyword");
  const category = ["전체", ...Object.keys(list)];
  // const [selected, setSelected] = useState(category[0]);
  const [dropdown, setDropdown] = useState(false);
  const [hover, setHover] = useState(false);
  const [keyword, setKeyword] = useState(searchParams ? searchParams : "");
  const selectRef = useRef<HTMLDivElement>(null);
  const setDepth = useSetAtom(depthAtom);

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

  const handleSearch = (keyword: string) => {
    if (keyword) router.push(`/search?keyword=${keyword}`);
  };

  return (
    <NavBar>
      <Container>
        <div
          className="menu-category"
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
            setDepth(["", ""]);
          }}
        >
          <img
            className="menu-img"
            src="/assets/img/hamburger.svg"
            alt="menu"
          />
          <Category hover={hover} />
        </div>
        <Link href={"/"}>
          <img src="/assets/img/logo.svg" alt="logo" />
        </Link>
        {/* <BoxWrapper>
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
        </BoxWrapper> */}

        <SearchBox>
          <form
            action=""
            onSubmit={(e: any) => {
              e.preventDefault();
              handleSearch(keyword);
            }}
          >
            <input
              type="text"
              value={keyword}
              placeholder="상품을 검색해보세요!"
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            <button />
          </form>
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
