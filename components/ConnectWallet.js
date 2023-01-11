/* eslint-disable no-undef */
import React, { useRef, useEffect, useState } from 'react';
import { Link, Box } from '@mui/material';
import { getDefaultWallets, ConnectButton } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  useAccount,
  useSignMessage,
  useDisconnect,
  useSigner,
  useContract,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
// import { Contract } from 'ethers';

import API, { refreshAPIToken } from '@/common/API';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@/utils/utility';
import showMessage from '@/components/showMessage';

import '@rainbow-me/rainbowkit/styles.css';
import { useRouter } from 'next/router';

// import {
//   TOKEN_CONTRACT_ABI,
//   TOKEN_CONTRACT_ADDRESS,
// } from '../common/constants';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: '8DAO Official Website',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const ConnectWalletButton = () => {
  const { address, isConnected, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: signature, signMessageAsync } = useSignMessage();
  const addressInfo = useRef({ address });
  const [tokenBalance, setTokenBalance] = useState(300);
  const router = useRouter();

  // const { data: signer } = useSigner();

  // const tokenContract = useContract({
  //   address: TOKEN_CONTRACT_ADDRESS,
  //   abi: TOKEN_CONTRACT_ABI,
  //   // signerOrProvider: signature,
  // });

  useEffect(() => {
    (async () => {
      if (isConnected) {
        // const balance = await tokenContract.balanceOf(address);
        // setTokenBalance(parseInt(balance.toString()));
        // console.log(tokenBalance);
        // const currentAccessToken = getLocalStorage('accessToken');
        // if (address && !currentAccessToken) {
        //   await handleNonce(address);
        // }
        // await handleNonce(address);
        // if (tokenBalance < 200) {
        //   showMessage({
        //     type: 'error',
        //     title: 'You dont have enough 8DAO Token',
        //     body: (
        //       <Box>In order to login, You need at least 200 8DAO Token.</Box>
        //     ),
        //   });
        //   disconnect();
        // } else {
        router.push('/buidlers');
        // }
      }
    })();
  }, [isConnected]);

  useEffect(() => {
    (async () => {
      const currentAccessToken = getLocalStorage('accessToken');
      if (signature && !currentAccessToken) {
        await signIn(signature);
      }
    })();
  }, [signature]);

  useEffect(() => {
    const currentAccessToken = getLocalStorage('accessToken');
    if (isDisconnected && currentAccessToken) {
      removeLocalStorage('accessToken');
      refreshAPIToken();
    }
  }, [isDisconnected]);

  useEffect(() => {
    (async () => {
      if (
        addressInfo.current.address &&
        addressInfo.current.address !== address
      ) {
        removeLocalStorage('accessToken');
        refreshAPIToken();
        disconnect();
        addressInfo.current.address = undefined;
        window.location.reload();
      }
    })();
  }, [address]);

  const handleNonce = async () => {
    try {
      console.log(tokenBalance);
      if (tokenBalance < 2) {
        showMessage({
          type: 'error',
          title: 'You dont have enough 8DAO Token',
          body: (
            <Box>
              You need at least 200 8DAO Token. Please get more to login.
            </Box>
          ),
        });
        disconnect();
      } else if (signatureMessage) {
        await signMessageAsync({
          message: signatureMessage,
        });
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to sign-in',
        body: err.message,
      });
      disconnect();
    }
  };

  const signIn = async (signature) => {
    try {
      const signinRes = await API.post(`/auth/signin`, {
        address: address,
        signature: signature,
      });

      const accessToken = signinRes.data?.data?.access_token;
      setLocalStorage('accessToken', accessToken);
      refreshAPIToken();
      addressInfo.current.address = address;
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to sign-in',
        body: err.message,
      });
      disconnect();
    }
  };

  return (
    <div>
      <ConnectButton
        showBalance={false}
        chainStatus="none"
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
      />
    </div>
  );
};

export { wagmiClient, chains, ConnectWalletButton };
