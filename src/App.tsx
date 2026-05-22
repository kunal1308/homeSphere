import {
  useState,
} from "react";

import {
  BrowserRouter,
} from "react-router-dom";

import LoginModal from "./components/LoginModal";

import SignupModal from "./components/SignupModal";

import GlobalLoader from "./components/GlobalLoader";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const [
    openLogin,
    setOpenLogin,
  ] = useState(false);

  const [
    openSignup,
    setOpenSignup,
  ] = useState(false);

  return (
    <BrowserRouter>
      <GlobalLoader />

      <LoginModal
        open={openLogin}
        handleClose={() =>
          setOpenLogin(false)
        }
      />

      <SignupModal
        open={openSignup}
        handleClose={() =>
          setOpenSignup(false)
        }
      />

      <AppRoutes
        onLoginClick={() =>
          setOpenLogin(true)
        }
        onSignupClick={() =>
          setOpenSignup(true)
        }
      />
    </BrowserRouter>
  );
}

export default App;