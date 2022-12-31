import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Box, Typography, Link } from '@mui/material';

import Button from '@/components/Button';
import Container from '@/components/Container';
import CommunityLinkGroup from '@/components/CommunityLinkGroup';
// import ActivityNotification from '@/components/ActivityNotification';

const textColorGradient = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`;

const HightlightText = styled.span`
  background-size: 400% 400%;
  background-image: linear-gradient(to right, #366eff, #23e5ff, #ff7fdb);
  -webkit-background-clip: text; //将元素的背景限制在文字中
  animation: ${textColorGradient} 10s ease infinite;
  color: transparent;
  font-size: 98px;
  line-height: 100px;
  font-weight: 700;
  /* 响应式布局 当屏幕小于600px时 字体大小为3.5625rem  */
  @media screen and (max-width: 900px) {
    font-size: 4.902rem;
    line-height: 1.02;
  }
  @media screen and (max-width: 600px) {
    font-size: 3.5625rem;
    line-height: 1.02;
  }
`;

const SectionHomepageHero = () => {
  const Title = () => {
    return (
      <Box marginTop="112px">
        <Box>
          <Typography variant="h1">LXDAO is an</Typography>
          <HightlightText>R&amp;D</HightlightText>
          <Typography variant="h1" display="inline">
            -focused DAO
          </Typography>
          <Typography variant="h1">in Web3</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Container
      minHeight={{ md: '800px', xs: '660px' }}
      display="flex"
      flexDirection={{ lg: 'row', xs: 'column' }}
      justifyContent="flex-start"
      alignItems="center"
      textAlign="center"
      gap={{ lg: '120px', xs: '40px' }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={6}
        alignItems="flex-start"
        textAlign="left"
      >
        <Title />
        <Box display={{ md: 'block', sm: 'none', xs: 'none' }}>
          <Typography variant="subtitle1" lineHeight="36px" color="#667085">
            Our Vision & Consensus - The technologies, concepts and ideas of
            Web3
          </Typography>
          <Typography variant="subtitle1" lineHeight="36px" color="#667085">
            will be used by a billion people in a decade.
          </Typography>
        </Box>
        <Box display={{ md: 'none', sm: 'block', xs: 'block' }}>
          <Typography variant="subtitle1" lineHeight="36px" color="#667085">
            Our Vision & Consensus - The technologies, concepts and ideas of
            Web3 will be used by a billion people in a decade.
          </Typography>
        </Box>
        <Button variant="gradient" width="180px" marginBottom={2}>
          <Link
            href={`/joinus`}
            color="#ffffff"
            sx={{
              textDecoration: 'none',
            }}
          >
            JOIN US
          </Link>
        </Button>
        <CommunityLinkGroup />
        {/* <ActivityNotification /> */}
      </Box>
    </Container>
  );
};

export default SectionHomepageHero;
