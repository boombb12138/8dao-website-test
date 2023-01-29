/* eslint-disable no-undef */
import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { getDefaultWallets, ConnectButton } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  useAccount,
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
  // chain.mainnet,
  [chain.goerli],
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

  const mint8DAOToken = async (amount) => {
    try {
      // 怎样拿到这个token？
      const tx = await tokenContract.mint(address, amount);

      await tx.wait();
      window.alert('Sucessfully minted 8DAO Tokens');
      await getBalance();
    } catch (err) {
      console.error(err);
    }
  };

  const getBalance = async () => {
    // 这里要得到用户的goerli代币余额
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
      console.log('balance', balance); //这里打印的余额不是用户的goerli代币余额
      // 如果用户的goerli代币余额大于0.5就让他能够访问buidlers页面
      if (isConnected && balance < 200) {
        showMessage({
          type: 'error',
          title: 'You dont have enough 8DAO Token',
          body: (
            <Box>
              In order to view member card, You need at least 200 8DAO Token.
            </Box>
          ),
        });
        // disconnect();
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
                      style={{
                        borderRadius: '10px',
                        padding: '8px',
                        marginTop: '10px',
                        fontWeight: 600,
                      }}
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
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '10px',
                        padding: '8px',
                        marginTop: '10px',
                        fontWeight: 600,
                      }}
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
                    <button
                      onClick={openAccountModal}
                      type="button"
                      style={{
                        borderRadius: '10px',
                        padding: '8px',
                        marginTop: '10px',
                        fontWeight: 600,
                      }}
                    >
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
        <div>
          <button
            onClick={() => {
              mint8DAOToken(300);
            }}
          >
            Mint 8DAO Token
          </button>
          <button
            onClick={handleGetBalance}
            style={{
              borderRadius: '10px',
              padding: '8px',
              marginTop: '10px',
              fontWeight: 600,
            }}
          >
            View member card
          </button>
        </div>
      )}
    </div>
  );
};

export { wagmiClient, chains, ConnectWalletButton };
