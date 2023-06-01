import Nav from "./components/Nav";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata = {
  title: "크로플",
  description:
    "쉽고 빠른 코인 결제 쇼핑 플랫폼 | 지금 바로 크로플로 결제해보세요!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning={true} className={notoSansKr.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
