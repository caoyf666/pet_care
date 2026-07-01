import "./globals.css";

export const metadata = {
  title: "晴爪宠物洗护 | 温柔洗护与造型",
  description: "晴爪宠物洗护提供猫狗洗澡、毛发修剪、SPA护理、皮毛养护与上门接送服务。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
