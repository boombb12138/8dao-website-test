/* eslint-disable no-undef */
import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {
  getDefaultWallets,
  ConnectButton,
  useConnectModal,
} from '@rainbow-me/rainbowkit';
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

// import API, { refreshAPIToken } from '@/common/API';
// import {
//   setLocalStorage,
//   getLocalStorage,
//   removeLocalStorage,
// } from '@/utils/utility';
import showMessage from '@/components/showMessage';

import '@rainbow-me/rainbowkit/styles.css';
import { useRouter } from 'next/router';

import {
  TOKEN_CONTRACT_ABI,
  TOKEN_CONTRACT_ADDRESS,
} from '../common/constants';

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
  // const { data: signature, signMessageAsync } = useSignMessage();
  // const addressInfo = useRef({ address });
  const [tokenBalance, setTokenBalance] = useState(0);
  const router = useRouter();

  const { data: signer } = useSigner();

  const tokenContract = useContract({
    addressOrName: TOKEN_CONTRACT_ADDRESS,

    contractInterface: TOKEN_CONTRACT_ABI,
    signerOrProvider: signer,
  });

  const getBalance = async () => {
    let balance = await tokenContract.balanceOf(address);

    if (balance.toNumber() === 0) {
      return 0;
    }
    balance = parseInt(balance.toString());

    console.log('parseInt(balance.toString())', parseInt(balance.toString()));
    return balance;
  };

  // useEffect(() => {
  //   console.log('tokenBalance', tokenBalance);
  //   if (isConnected && tokenBalance < 200) {
  //     showMessage({
  //       type: 'error',
  //       title: 'You dont have enough 8DAO Token',
  //       body: <Box>In order to login, You need at least 200 8DAO Token.</Box>,
  //     });
  //     disconnect();
  //   } else if (isConnected && tokenBalance >= 200) {
  //     router.push('/buidlers');
  //   }
  // }, [tokenBalance]);

  const handleGetBalance = async () => {
    try {
      const balance = await getBalance();
      console.log('balance', balance);
      if (isConnected && balance < 200) {
        showMessage({
          type: 'error',
          title: 'You dont have enough 8DAO Token',
          body: <Box>In order to login, You need at least 200 8DAO Token.</Box>,
        });
        disconnect();
      } else if (isConnected && balance >= 200) {
        router.push('/buidlers');
      }
      setTokenBalance(balance);
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to connect',
        body: err.message,
      });
    }
  };

  return (
    <div>
      {/* <ConnectButton
        showBalance={true}
        chainStatus="none"
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
        onClick={handleGetBalance()}
      /> */}
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={function () {
                        openConnectModal();
                      }}
                      type="button"
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>
                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>

      {isConnected && (
        <button onClick={handleGetBalance}>View member card</button>
      )}
    </div>
  );
};

export { wagmiClient, chains, ConnectWalletButton };
