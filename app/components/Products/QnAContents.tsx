"use client";
import styled from "@emotion/styled";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { maskingAtom } from "./DetailContents";
import { selectedAtom } from "./TopContents";

const Container = styled.div`
  width: 1200px;
  margin: auto;
  padding: 100px 0 50px;

  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: -1.2px;
  }
`;

const QnAHeader = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 20px 0 16px;
  border-bottom: 1px solid #000;
`;

const QnABtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 140px;
  padding: 14px 12px 14px 18px;
  font-size: 14px;
  border: 1px solid #000;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;

  img {
    transform: rotate(270deg);
  }
`;

const TabContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  width: fit-content;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    font-size: 16px;
    letter-spacing: -0.8px;
    color: #888888;
    position: relative;

    white-space: nowrap;
    padding: 0 14px;
    cursor: pointer;
  }
  li:first-of-type {
    padding-left: 0;
  }
  .focus {
    color: #000;
    font-weight: 500;
  }

  li:not(:last-of-type) {
    &::after {
      content: "";
      position: absolute;
      top: 3px;
      right: 0;
      width: 1px;
      height: 18px;
      background: #eeeeee;
    }
  }
`;

const QnACard = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e5e5e5;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;

  .wrapper {
    display: flex;
  }
  .state {
    width: 84px;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.8px;
  }
  .title {
    width: 880px;
    height: 23px;
    font-size: 15px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Info = styled.div`
  span {
    width: 90px;
    padding: 0 12px;
    height: 18px;
    color: #777;
    font-size: 14px;
    text-align: center;
  }
  span:not(:first-of-type) {
    border-left: 1px solid #eeeeee;
  }
`;

const Contents = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;

  .container {
    width: 1068px;
  }
  .contents {
    width: 880px;
    padding: 20px 0;
  }
  .answer_wrapper {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    border-top: 1px solid #e5e5e5;
  }
  .answer {
    width: 880px;
  }
`;

export const qnaAtom = atom(0);
export default function QnAContents() {
  const qnaRef = useRef<HTMLDivElement>(null);
  const setqnaTop = useSetAtom(qnaAtom);
  const masking = useAtomValue(maskingAtom);
  const selArr = useAtomValue(selectedAtom);
  const [focus, setFocus] = useState("total");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    qnaRef.current && setqnaTop(qnaRef.current?.offsetTop - 120);
  }, [qnaRef, masking, selArr]);

  const handleDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0].replaceAll("-", ".");
  };

  const qna = [
    {
      sq: 1,
      state: "completed",
      user_id: "westcoast",
      timestamp: "Thu Jul 06 2023 10:23:29 GMT+0900",
      title: "교환신청했는데요.",
      contents: "안녕하세요. 오늘 교환신청을 했는데요. 언제 처리될까요?",
      ans: "안녕하세요 고객님.",
      ans_time: "Thu Jul 06 2023 10:23:29 GMT+0900",
    },
    {
      sq: 2,
      state: "no_ans",
      user_id: "abcd1234",
      timestamp: "Sat Dec 28 2022 10:23:29 GMT+0900",
      title: "상품 문의드립니다. 1111",
      contents:
        "상품 문의드립니다. 1111상품 문의드립니다. 1111상품 문의드립니다. 1111상품 문의드립니다. 1111",
    },
    {
      sq: 3,
      state: "completed",
      user_id: "croffle1111",
      timestamp: "Mon Jul 03 2023 10:23:29 GMT+0900",
      title: "빠른 배송 부탁드립니다.",
      contents: "오늘 출고되나요? 오늘 출고 부탁드립니다!",
      ans: "네 고객님~ 당일 3시 이전 주문완료 하신 상품은 당일 출고 됩니다. 이후건은 공휴일 제외 다음날 발송됩니다. 발송 후 택배사의 사정에 따라 약 1~4일 이후 수령이 가능하십니다. 혹시라도 품절 등으로 인해 당일발송이 어려운 경우 문자안내 드리겠습니다. 감사합니다.",
      ans_time: "Mon Jul 03 2023 13:23:29 GMT+0900",
    },
    {
      sq: 4,
      state: "completed",
      user_id: "testtest",
      timestamp: "Thu Jul 06 2023 23:23:29 GMT+0900",
      title: "상품 문의드립니다. abcd",
      contents: "szdlkfslkmascszdlkfslkmascszdlkfslkmascszdlkfslkmasc",
      ans: "안녕하세요 고객님.",
      ans_time: "Fri Jul 07 2023 09:23:29 GMT+0900",
    },
    {
      sq: 5,
      state: "completed",
      user_id: "abcdefg",
      timestamp: "Wed Jul 05 2023 10:23:29 GMT+0900",
      title: "상품 문의드립니다. zzzz",
      contents:
        "szdlkfslkmascszdlkfslkmascszdlkfslkmascszdlkfslkmascszdlkfslkmascszdlkfslkmascszdlkfslkmascszdlkfslkmascszdlkfslkmascszdlkfslkmasc",
      ans: "안녕하세요 고객님.",
      ans_time: "Wed Jul 05 2023 10:23:29 GMT+0900",
    },
    {
      sq: 6,
      state: "completed",
      user_id: "helloworld",
      timestamp: "Tue Jul 04 2023 10:23:29 GMT+0900",
      title: "상품 문의드립니다.",
      contents: "asd",
      ans: "안녕하세요 고객님.",
      ans_time: "Tue Jul 04 2023 10:23:29 GMT+0900",
    },
    {
      sq: 7,
      state: "completed",
      user_id: "croffle",
      timestamp: "Thu Jul 06 2023 10:23:29 GMT+0900",
      title: "상품 문의드립니다.",
      contents: "asd",
      ans: "안녕하세요 고객님.",
      ans_time: "Thu Jul 06 2023 10:23:29 GMT+0900",
    },
    {
      sq: 8,
      state: "completed",
      user_id: "test",
      timestamp: "Tue Jul 04 2023 10:23:29 GMT+0900",
      title: "취소신청한거 언제처리되나요?",
      contents:
        "안녕하세요. 오늘 취소신청을 했는데요. 안녕하세요. 오늘 취소신청을 했는데요. 안녕하세요. 오늘 취소신청을 했는데요. 안녕하세요. 오늘 취소신청을 했는데요. 안녕하세요. 오늘 취소신청을 했는데요. 안녕하세요. 오늘 취소신청을 했는데요. 안녕하세요. 오늘 취소신청을 했는데요. 안녕하세요. 오늘 취소신청을 했는데요. 안녕하세요. 오늘 취소신청을 했는데요. 안녕하세요. 오늘 취소신청을 했는데요. 안녕하세요. 오늘 취소신청을 했는데요. 안녕하세요. 오늘 취소신청을 했는데요.",
      ans: "안녕하세요. 고객님 취소처리 도와드렸습니다. 불편을 드려 죄송합니다. ",
      ans_time: "Tue Jul 04 2023 10:23:29 GMT+0900",
    },
    {
      sq: 9,
      state: "completed",
      user_id: "randomId",
      timestamp: "Sat Jul 01 2023 18:23:29 GMT+0900",
      title: "빠른 환불 부탁드립니다.",
      contents: "asd",
      ans: "안녕하세요 고객님.",
      ans_time: "Mon Jul 03 2023 10:23:29 GMT+0900",
    },
    {
      sq: 10,
      state: "no_ans",
      user_id: "hater",
      timestamp: "Sun Jul 02 2023 10:23:29 GMT+0900",
      title: "배송문의",
      contents: "배송문의요 szdlkfslkmascszdlkf",
      ans_time: "Mon Jul 03 2023 10:23:29 GMT+0900",
    },
  ];

  return (
    <Container ref={qnaRef}>
      <h1>상품Q&A</h1>
      <QnAHeader>
        <TabContainer>
          <li
            className={focus === "total" ? "focus" : ""}
            onClick={() => setFocus("total")}
          >
            전체(59)
          </li>
          <li
            className={focus === "completed" ? "focus" : ""}
            onClick={() => setFocus("completed")}
          >
            답변완료(59)
          </li>
          <li
            className={focus === "wating" ? "focus" : ""}
            onClick={() => setFocus("wating")}
          >
            답변대기(0)
          </li>
        </TabContainer>
        <QnABtn>
          문의하기
          <img src="/assets/img/option_arrow.svg" alt="qna_arrow" />
        </QnABtn>
      </QnAHeader>
      {qna.map((item) => (
        <QnACard key={item.sq}>
          <CardHeader>
            <div className="wrapper">
              <div className="state">
                {item.state === "completed" ? "답변완료" : "답변대기"}
              </div>
              <div
                className="title"
                onClick={() =>
                  display === item.sq ? setDisplay(0) : setDisplay(item.sq)
                }
              >
                {item.title}
              </div>
            </div>
            <Info>
              <span>{item.user_id.slice(0, 4)}*****</span>
              <span>{handleDate(item.timestamp)}</span>
            </Info>
          </CardHeader>
          {display === item.sq && (
            <Contents>
              <div className="container">
                <div className="contents">{item.contents}</div>
                {item.ans && (
                  <div className="answer_wrapper">
                    <div className="answer">{item.ans}</div>
                    <Info>
                      <span>판매자</span>
                      <span>{handleDate(item.ans_time)}</span>
                    </Info>
                  </div>
                )}
              </div>
            </Contents>
          )}
        </QnACard>
      ))}
    </Container>
  );
}
