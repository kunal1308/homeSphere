import {
    createContext,
    useContext,
    useState,
} from "react";

interface LoaderContextType {
    loading: boolean;

    showLoader: () => void;

    hideLoader: () => void;
}

const LoaderContext =
    createContext<
        LoaderContextType
    >({
        loading: false,

        showLoader: () => { },

        hideLoader: () => { },
    });

export const LoaderProvider = ({
    children,
}: any) => {
    const [loading, setLoading] =
        useState(false);

    const showLoader = () =>
        setLoading(true);

    const hideLoader = () =>
        setLoading(false);

    return (
        <LoaderContext.Provider
            value={{
                loading,

                showLoader,

                hideLoader,
            }}
        >
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () =>
    useContext(
        LoaderContext
    );