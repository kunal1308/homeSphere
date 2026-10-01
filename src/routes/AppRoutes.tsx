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

import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

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

                {/* Tenant-only pages */}
                <Route
                    element={
                        <ProtectedRoute role="tenant" />
                    }
                >
                    <Route
                        path="/properties"
                        element={
                            <Properties />
                        }
                    />

                    <Route
                        path="/property-details/:id"
                        element={
                            <PropertyDetails />
                        }
                    />

                    <Route
                        path="/my-applications"
                        element={
                            <MyApplications />
                        }
                    />
                </Route>

                {/* Owner-only pages */}
                <Route
                    element={
                        <ProtectedRoute role="owner" />
                    }
                >
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
                        path="/applications"
                        element={
                            <OwnerApplications />
                        }
                    />
                </Route>

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
                    path="*"
                    element={
                        <NotFound />
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;