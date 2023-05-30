import Nav from "./components/Nav";
import "./globals.css";

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
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
