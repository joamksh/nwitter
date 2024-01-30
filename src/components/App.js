import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase"; // fbase에서 authService를 가져옴
import { getAuth, onAuthStateChanged } from "firebase/auth"; // onAuthStateChanged를 import

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth(); // getAuth 함수를 이용하여 auth 인스턴스를 가져옴

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });

    // Clean-up 함수로서 unsubscribe 함수를 반환하여 컴포넌트가 언마운트되면 리스너를 제거
    return () => unsubscribe();
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
