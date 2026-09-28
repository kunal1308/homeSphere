import {
  useState,
} from "react";

import {
  BrowserRouter,
} from "react-router-dom";

import LoginModal, { type SignupPrefill } from "./components/LoginModal";

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

  // Login details carried into Signup when the user didn't exist.
  const [
    signupPrefill,
    setSignupPrefill,
  ] = useState<SignupPrefill | null>(null);

  const closeSignup = () => {
    setOpenSignup(false);
    setSignupPrefill(null);
  };

  return (
    <BrowserRouter>
      <GlobalLoader />

      <LoginModal
        open={openLogin}
        handleClose={() =>
          setOpenLogin(false)
        }
        onSwitchToSignup={(prefill) => {
          setSignupPrefill(prefill ?? null);
          setOpenLogin(false);
          setOpenSignup(true);
        }}
      />

      <SignupModal
        open={openSignup}
        handleClose={closeSignup}
        onSwitchToLogin={() => {
          closeSignup();
          setOpenLogin(true);
        }}
        prefill={signupPrefill}
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