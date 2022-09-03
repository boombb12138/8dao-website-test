/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from 'react';
import { Typography } from '@mui/material';
import { getDefaultWallets, ConnectButton } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  useAccount,
  useSignMessage,
  useDisconnect,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import API from '@/common/API';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@/utils/utility';
import { AlertContext } from '@/context/AlertContext';

import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.rinkeby],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'LXDAO Official Website',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const ConnectWalletButton = () => {
  const { address, isConnected, isDisconnected } = useAccount();
  const [preAddress, setPreAddress] = useState(address);
  const { disconnect } = useDisconnect();
  const { data, signMessage } = useSignMessage();
  const useAlert = () => useContext(AlertContext);
  const { setAlert } = useAlert();

  useEffect(() => {
    const currentAccessToken = getLocalStorage('accessToken');
    if (address && !currentAccessToken) {
      setPreAddress(address);
      handleSignature(address);
    }
  }, [isConnected]);

  useEffect(() => {
    const currentAccessToken = getLocalStorage('accessToken');
    if (data && !currentAccessToken) {
      signIn(data);
    }
  }, [data]);

  useEffect(() => {
    const currentAccessToken = getLocalStorage('accessToken');
    if (isDisconnected && currentAccessToken) {
      removeLocalStorage('accessToken');
    }
  }, [isDisconnected]);

  useEffect(() => {
    if(preAddress && preAddress !== address) {
      removeLocalStorage('accessToken');
      setPreAddress(address);
      handleSignature(address);
    }
  }, [address])

  const handleSignature = (address) => {
    API.get(`/buidler/${address}/nonce`)
    .then(({ data }) => {
      const signatureMessage = data?.data?.signature_message;
      if (signatureMessage) {
        signMessage({
          message: signatureMessage,
        });
      }
    })
    .catch((err) => {
      if (err) {
        signInErrorHandler();
      }
    });
  }

  const signIn = (signature) => {
    API.post(`/auth/signin`, {
      address: address,
      signature: signature,
    })
      .then(({ data }) => {
        const accessToken = data?.data?.access_token;
        if (accessToken) {
          setLocalStorage('accessToken', accessToken);
        }
      })
      .catch((err) => {
        if (err) {
          signInErrorHandler();
        }
      });
  }

  const signInErrorHandler = () => {
    const DISCONNECT_TIME = 5000;
    setAlert(<SignInErrorMessage />, 'error');
    setTimeout(() => {
      disconnect();
    }, DISCONNECT_TIME);
  };


  const SignInErrorMessage = () => {
    return (
      <Typography>
        Something went wrong when signing into LXDAO. If you are not LXDAO
        buidler, welcome to{' '}
        <Typography component="a" href="/joinus">
          join us
        </Typography>
        . You can also give feedback to us in the community.
      </Typography>
    );
  };

  return (
    <ConnectButton
      showBalance={false}
      chainStatus="none"
      accountStatus={{
        smallScreen: 'avatar',
        largeScreen: 'full',
      }}
    />
  );
};

export { wagmiClient, chains, ConnectWalletButton };
