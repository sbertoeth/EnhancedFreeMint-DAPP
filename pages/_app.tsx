import { Chain, ThirdwebProvider, useChain, useChainId } from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chainId your dApp will work on.

function MyApp({ Component, pageProps } : any) {
  return (
    <ThirdwebProvider activeChain={"goerli"}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
