import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const data = {
  number: '001',
  name: 'My First NFT',
  description:
    'MyFirstNFT is a non-profit instructional project for Web3 newbies. Get a FREE NFT while learning about Web3...',
  logo: '/projects/mfnft-logo.png',
  banner: '/projects/mfnft-banner.png',
  buidlers: [
    {
      avatar:
        'https://cloudflare-ipfs.com/ipfs/bafkreibswn22ifwqcf246axiwhnrjzgbnvvodaiqntxc3u5xulzesp33fu',
      address: '0x17c57bD297175e5711Ee3Daf045252B588f3162F',
    },
    {
      avatar:
        'https://cloudflare-ipfs.com/ipfs/bafkreic2j7csesqbd5eorfykeim7ejgdsjar4ddd63upisx5sagdfrbfuq',
      address: '0x86DBe1f56dC3053b26522de1B38289E39AFCF884',
    },
  ],
};

const SimpleProjectCard = () => (
  <Box
    width="356px"
    sx={{ background: '#ffffff' }}
    border="0.5px solid #D0D5DD"
    borderRadius="6px"
  >
    <Box height="146px" width="100%" component={'img'} src={data.banner} />
    <Box padding="10px 20px 20px 20px">
      <Box display="flex" alignItems="center" gap={2}>
        <Box height="48px" width="48px" component={'img'} src={data.logo} />
        <Link
          href={`/projects/${data.number}`}
          target="_blank"
          sx={{ textDecoration: 'none' }}
        >
          <Typography variant="subtitle1" lineHeight="25px" fontWeight={600}>
            {data.name}
          </Typography>
        </Link>
      </Box>
      <Typography
        variant="body1"
        lineHeight="30px"
        fontWeight={400}
        color="#666F85"
        marginTop={2}
      >
        {data.description}
      </Typography>
      <Typography
        variant="body1"
        lineHeight="19px"
        fontWeight={600}
        color="#101828"
        marginTop={2}
        marginBottom={1}
      >
        Buidlers
      </Typography>
      <Box display="flex" gap="10px">
        {data.buidlers &&
          data.buidlers.map((buidler, index) => {
            return (
              <Link href={`/buidlers/${buidler.address}`} target="_blank">
                <Box
                  height="60px"
                  width="60px"
                  component={'img'}
                  key={index}
                  src={buidler.avatar}
                  border="0.5px solid #D0D5DD"
                />
              </Link>
            );
          })}
      </Box>
    </Box>
  </Box>
);

export default SimpleProjectCard;
