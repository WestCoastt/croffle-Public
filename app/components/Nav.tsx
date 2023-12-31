"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { atom, useAtom, useSetAtom } from "jotai";
import Category from "./Category";
import axios from "axios";
import { useCookies } from "react-cookie";
import { refreshCartAtom } from "./Products/TopContents";

const NavBar = styled.div`
  display: flex;
  align-items: center;
  height: 110px;
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
    font-size: 16px;
    letter-spacing: -1px;
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: -0.5px;

  span {
    position: absolute;
    top: -6px;
    right: 2px;
    min-width: 20px;
    height: 20px;
    padding: 1px 5px;
    border-radius: 10px;
    background: #009c89;
    text-align: center;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.7px;
  }
`;

export const depthAtom = atom([0, 0]);
export const ltkAtom = atom("");
export const sckAtom = atom("");
export const cartAtom = atom(0);
export default function Nav() {
  const router = useRouter();
  const searchParams = useSearchParams().get("keyword");
  const [ltk, setLtk] = useAtom(ltkAtom) as any;
  const [sck, setSck] = useAtom(sckAtom);
  const [dropdown, setDropdown] = useState(false);
  const [hover, setHover] = useState(false);
  const [keyword, setKeyword] = useState(searchParams ? searchParams : "");
  const selectRef = useRef<HTMLDivElement>(null);
  const setDepth = useSetAtom(depthAtom);
  const [cookies, setCookie, removeCookie] = useCookies(["sck"]);
  const [cart, setCart] = useAtom(cartAtom);
  const [refreshCart, setRefreshCart] = useAtom(refreshCartAtom);

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

  useEffect(() => {
    setSck(document.cookie);
    setLtk(localStorage.getItem("tk"));
  }, []);

  const getCartList = async () => {
    const tk = localStorage.getItem("tk");
    if (!sck && !ltk) return;

    const auth = {
      Authorization: `Bearer ${sck ? sck.replace("sck=", "") : tk ? tk : ""}`,
    };
    const res = await axios.get(`/v1/carts`, {
      headers: auth,
    });
    setCart(res.data.data.list.length);
    setRefreshCart(false);
  };

  useEffect(() => {
    getCartList();
  }, [refreshCart, sck, ltk]);

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
            setDepth([0, 0]);
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
          {sck && (
            <BtnBox
              onClick={() => {
                document.cookie = "sck=; expires=Sat, 01 Jan 1972 00:00:00 GMT";
                setSck("");
                // router.refresh;
                location.reload();
              }}
            >
              <img src="/assets/img/logout.svg" alt="logout" />
              <div>로그아웃</div>
            </BtnBox>
          )}

          {ltk && (
            <BtnBox
              onClick={() => {
                localStorage.removeItem("tk");
                setLtk("");
              }}
            >
              <img src="/assets/img/logout.svg" alt="logout" />
              <div>로그아웃</div>
            </BtnBox>
          )}

          {!sck && !ltk && (
            <Link href="/login">
              <BtnBox>
                <img src="/assets/img/login.svg" alt="login" />
                <div>로그인</div>
              </BtnBox>
            </Link>
          )}
          <Link href={sck || ltk ? "/mypage" : "/login"}>
            <BtnBox>
              <img src="/assets/img/person.svg" alt="mypage" />
              <div>마이페이지</div>
            </BtnBox>
          </Link>
          <Link href={sck || ltk ? "/cart" : "/login"}>
            <BtnBox>
              {cart !== 0 && <span>{cart > 99 ? "+99" : cart}</span>}
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
