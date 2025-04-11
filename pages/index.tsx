
// 🎯 React 前端演示框架（方案 C 起点）
// 多语言登录页 + 桌面选择 + 路珠展示框架（简化数据）

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const tableList = [
  { id: "T001", name: { ko: "1번 테이블", zh: "1号桌", en: "Table 1" } },
  { id: "T002", name: { ko: "2번 테이블", zh: "2号桌", en: "Table 2" } },
];

const translations = {
  login: { ko: "로그인", zh: "登录", en: "Login" },
  user: { ko: "아이디", zh: "用户名", en: "Username" },
  pass: { ko: "비밀번호", zh: "密码", en: "Password" },
  selectTable: { ko: "테이블 선택", zh: "选择桌号", en: "Select Table" },
  currentRoadmap: { ko: "현재 도표", zh: "当前路珠", en: "Current Roadmap" },
  welcome: { ko: "카지노 플랫폼에 오신 것을 환영합니다", zh: "欢迎来到赌场娱乐平台", en: "Welcome to Casino Platform" },
};

export default function CasinoDemo() {
  const [lang, setLang] = useState("zh");
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const t = (key) => translations[key][lang];

  const handleLogin = () => {
    if (username && password) setLoggedIn(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="flex justify-end gap-2 mb-4">
        <Button onClick={() => setLang("zh")} className={lang === "zh" ? "bg-white text-black" : ""}>中文</Button>
        <Button onClick={() => setLang("ko")} className={lang === "ko" ? "bg-white text-black" : ""}>한국어</Button>
        <Button onClick={() => setLang("en")} className={lang === "en" ? "bg-white text-black" : ""}>English</Button>
      </div>

      {!loggedIn ? (
        <Card className="max-w-md mx-auto p-6 bg-gray-800">
          <div className="flex justify-center mb-4">
            <Image src="/royal-logo.jpg" alt="logo" width={120} height={120} />
          </div>
          <h2 className="text-xl font-bold mb-2 text-center">{t("login")}</h2>
          <p className="text-sm text-center mb-4 text-gray-300">{t("welcome")}</p>
          <Input value={username} onChange={e => setUsername(e.target.value)} placeholder={t("user")} className="mb-2" />
          <Input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder={t("pass")} className="mb-4" />
          <Button className="w-full" onClick={handleLogin}>{t("login")}</Button>
        </Card>
      ) : !selectedTable ? (
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">{t("selectTable")}</h2>
          <div className="grid grid-cols-2 gap-4">
            {tableList.map((table) => (
              <Card
                key={table.id}
                onClick={() => setSelectedTable(table)}
                className="cursor-pointer hover:shadow-lg transition bg-gray-700"
              >
                <CardContent className="p-4 text-lg font-semibold">
                  {table.name[lang]}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">
            🎲 {t("currentRoadmap")} – {selectedTable.name[lang]}
          </h2>
          <div className="grid grid-cols-8 gap-1 border p-2 bg-white rounded">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full text-center text-xs leading-6 ${
                  i % 2 === 0 ? "bg-red-500" : "bg-blue-500"
                } text-white`}
              >
                {i % 2 === 0 ? "P" : "B"}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
