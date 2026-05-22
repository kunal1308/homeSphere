import {
    Routes,
    Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";

import Properties from "../pages/Properties";

import MyListings from "../pages/MyListings";

import EditPropertyScreen from "../pages/EditPropertyScreen";

import PropertyDetails from "../pages/PropertyDetails";

import Sitemap from "../pages/Sitemap";

import AboutUs from "../pages/AboutUs";

import PrivacyPolicy from "../pages/PrivacyPolicy";

import MyApplications from "../pages/MyApplications";

import OwnerApplications from "../pages/OwnerApplications";

interface Props {
    onLoginClick: () => void;

    onSignupClick: () => void;
}

const AppRoutes = ({
    onLoginClick,
    onSignupClick,
}: Props) => {
    return (
        <Routes>
            <Route
                element={
                    <MainLayout
                        onLoginClick={
                            onLoginClick
                        }
                        onSignupClick={
                            onSignupClick
                        }
                    />
                }
            >
                <Route
                    path="/"
                    element={
                        <Home />
                    }
                />

                <Route
                    path="/properties"
                    element={
                        <Properties />
                    }
                />

                <Route
                    path="/my-listings"
                    element={
                        <MyListings />
                    }
                />

                <Route
                    path="/edit-property/:id"
                    element={
                        <EditPropertyScreen />
                    }
                />

                <Route
                    path="/property-details/:id"
                    element={
                        <PropertyDetails />
                    }
                />

                <Route
                    path="/about-us"
                    element={
                        <AboutUs />
                    }
                />

                <Route
                    path="/sitemap"
                    element={
                        <Sitemap />
                    }
                />

                <Route
                    path="/privacy-policy"
                    element={
                        <PrivacyPolicy />
                    }
                />

                <Route
                    path="/my-applications"
                    element={
                        <MyApplications />
                    }
                />

                <Route
                    path="/applications"
                    element={
                        <OwnerApplications />
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;