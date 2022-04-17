import "@fontsource/nunito";
import type { AppProps } from "next/app";
// Context
import AuthContextProvider from "context/AuthContext";
// UI
import { ChakraProvider, ScaleFade } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        body: "Nunito, sans-serif",
    },
});

function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <AuthContextProvider>
                <ScaleFade key={router.route} in={true}>
                    <Component {...pageProps} />
                </ScaleFade>
            </AuthContextProvider>
        </ChakraProvider>
    );
}

export default MyApp;
