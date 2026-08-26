import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

interface MainLayoutProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
}

const MainLayout = ({
    onLoginClick,
    onSignupClick,
}: MainLayoutProps) => {
    return (
        <>
            <Header
                onLoginClick={onLoginClick}
                onSignupClick={onSignupClick}
            />

            <main
                style={{
                    minHeight: "80vh",
                }}
            >
                <Outlet
                    context={{
                        onLoginClick,
                        onSignupClick,
                    }}
                />
            </main>

            <Footer />
        </>
    );
};

export default MainLayout;