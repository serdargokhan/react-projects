import { useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {

  const [isLoginClicked, setIsLoginClicked] = useState();
  const [isLogoutVisible, setIsLogoutVisible] = useState();
  const [isLoggedOut, setIsLoggedOut] = useState();

  function loginState(value) {
    setIsLoginClicked(value);
  }

  function showLogout(value) {
    setIsLogoutVisible(value);
  }

  function loggedOut(value) {
    setIsLoggedOut(value);
  }

  return (
    <div className="p-12">
      <Header showLogout={isLogoutVisible} onLoggedOut={loggedOut} />
      <Main onLogin={loginState} />
      <Form isLogin={isLoginClicked} onApproveLogin={showLogout} loggedOut={isLoggedOut} />
    </div>
  );
}

export default App;
