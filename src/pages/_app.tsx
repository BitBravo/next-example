import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider, DehydratedState } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppProps<{ dehydratedState: DehydratedState }>) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
