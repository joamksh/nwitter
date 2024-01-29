import { useState } from "react";
import React from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  {/* 다른 컴포넌트나 레이아웃 등 추가 가능 */}
  return (
    <>
    <AppRouter isLoggedIn={isLoggedIn}/>
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
