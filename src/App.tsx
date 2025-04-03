import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import Main from "./main";
import Footer from "./Component/Footer";
import Mugi from "./Mugi";

function App() {
  // メニューの開閉状態を管理するstate
  const [isOpen, setIsOpen] = useState(false);

  // メニューの開閉状態が変更されたときに実行されるuseEffect
  // ハンバーガーメニューが開いている場合はスクロールを固定し、閉じている場合はスクロールを許可する
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <BrowserRouter>
      <div>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mugi" element={<Mugi />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
