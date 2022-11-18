import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import { Box, Typography, Link } from '@mui/material';

import SimpleProjectCard from '@/components/SimpleProjectCard';

const WorkDetailItem = ({ title, data, ...rest }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="22px"
      sx={{ backgroundColor: '#ffffff' }}
      borderRadius="6px"
      gap="100px"
      {...rest}
    >
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography
          variant="body1"
          lineHeight="19px"
          fontWeight={600}
          color="#101828"
        >
          {title}
        </Typography>
        <Box display="flex" gap={2}>
          {data.length &&
            data.map((item, index) => (
              <Box display="flex" gap="3px" key={index}>
                <Typography
                  variant="body2"
                  lineHeight="17px"
                  fontWeight={400}
                  color="#666F85"
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  lineHeight="17px"
                  fontWeight={600}
                  color="#36AFF9"
                >
                  {item.number}
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
      <Link href={data.link} target="_blank" sx={{ textDecoration: 'none' }}>
        <Typography
          variant="subtitle1"
          lineHeight="24px"
          fontWeight={600}
          color="#36AFF9"
        >
          →
        </Typography>
      </Link>
    </Box>
  );
};

const WorkDetailSection = ({
  title,
  data,
  bottomButtonText,
  bottomButtonLink,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      marginX={{ lg: 0, md: '20px', xs: '20px' }}
    >
      <Typography
        variant="h5"
        lineHeight="34px"
        fontWeight={800}
        color="#ffffff"
      >
        {title}
      </Typography>
      <Box display="flex" gap={2} flexDirection="column">
        {data.length &&
          data.map((item, index) => (
            <WorkDetailItem key={index} title={item.content} data={item.data} />
          ))}
      </Box>
      <Link
        href={bottomButtonLink}
        target="_blank"
        sx={{ textDecoration: 'none' }}
      >
        <Box
          padding="22px"
          sx={{ backgroundColor: '#ffffff' }}
          borderRadius="6px"
          display="flex"
          justifyContent="center"
          gap={2}
        >
          <Box component={'img'} src={'/icons/add.svg'} />
          <Typography
            variant="subtitle2"
            lineHeight="22px"
            fontWeight={800}
            color="#101828"
          >
            {bottomButtonText}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

const WorkStep = ({
  leftBgColor,
  rightBgColor,
  stepIcon,
  stepTitle,
  stepDes,
  rightSection,
}) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={{ lg: 'row', md: 'column', xs: 'column' }}
      position={{ lg: 'sticky', md: 'relative', xs: 'relative' }}
      top={0}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={{ lg: '50%', md: '100%', xs: '100%' }}
        height="100vh"
        position={{ lg: 'relative', md: 'sticky', xs: 'sticky' }}
        top={0}
        sx={{ backgroundColor: leftBgColor }}
      >
        <Box maxWidth="360px" display="flex" flexDirection="column" gap="20px">
          <Box component={'img'} width="125px" src={stepIcon} />
          <Typography
            variant="h5"
            lineHeight="34px"
            fontWeight={800}
            color="#101828"
          >
            {stepTitle}
          </Typography>
          <Typography
            variant="body1"
            lineHeight="24px"
            fontWeight={400}
            color="#666F85"
          >
            {stepDes}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width={{ lg: '50%', md: '100%', xs: '100%' }}
        position={{ lg: 'relative', md: 'sticky', xs: 'sticky' }}
        top={0}
        sx={{ backgroundColor: rightBgColor }}
      >
        {rightSection}
      </Box>
    </Box>
  );
};

const ideaData = [
  {
    content: 'LXDAO Member NFT PFP idea collect',
    data: [
      {
        name: 'Views',
        number: '0',
      },
      {
        name: 'Repliies',
        number: '0',
      },
      {
        name: 'Activity',
        number: '0',
      },
    ],
    link: '',
  },
  {
    content: 'Invest data site',
    data: [
      {
        name: 'Views',
        number: '0',
      },
      {
        name: 'Repliies',
        number: '0',
      },
      {
        name: 'Activity',
        number: '0',
      },
    ],
    link: '',
  },
  {
    content: 'LXDAO Member NFT PFP idea collect',
    data: [
      {
        name: 'Views',
        number: '0',
      },
      {
        name: 'Repliies',
        number: '0',
      },
      {
        name: 'Activity',
        number: '0',
      },
    ],
    link: '',
  },
];

const voteData = [
  {
    content: 'Investigate voting records',
    data: [
      {
        name: 'For',
        number: '0',
      },
      {
        name: 'Against',
        number: '0',
      },
      {
        name: 'Abstain',
        number: '0',
      },
    ],
    link: '',
  },
  {
    content: 'Invest data site',
    data: [
      {
        name: 'For',
        number: '0',
      },
      {
        name: 'Against',
        number: '0',
      },
      {
        name: 'Abstain',
        number: '0',
      },
    ],
    link: '',
  },
  {
    content: 'LXDAO Member NFT PFP idea collect',
    data: [
      {
        name: 'For',
        number: '0',
      },
      {
        name: 'Against',
        number: '0',
      },
      {
        name: 'Abstain',
        number: '0',
      },
    ],
    link: '',
  },
];

const projectData = [
  {
    number: '000',
    name: 'GCLX',
    description:
      'MyFirstNFT is a non-profit instructional project for Web3 newbies. Get a FREE NFT while learning about Web3',
    logo: '/images/projects/mfnft-logo.png',
    banner: '/images/projects/mfnft-banner.png',
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
  },
  {
    number: '001',
    name: 'My First NFT',
    description:
      'MyFirstNFT is a non-profit instructional project for Web3 newbies. Get a FREE NFT while learning about Web3',
    logo: '/images/projects/mfnft-logo.png',
    banner: '/images/projects/mfnft-banner.png',
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
  },
  {
    number: '002',
    name: 'MetaPavo',
    description:
      'MyFirstNFT is a non-profit instructional project for Web3 newbies. Get a FREE NFT while learning about Web3',
    logo: '/images/projects/mfnft-logo.png',
    banner: '/images/projects/mfnft-banner.png',
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
  },
];

const SectionWorkSteps = () => (
  <Box width="100%">
    <Box
      textAlign="center"
      marginTop={{ md: '112px', sm: '48px', xs: '48px' }}
      marginBottom={{ md: '95px', sm: '48px', xs: '48px' }}
    >
      <Typography
        variant="subtitle1"
        lineHeight="60px"
        fontWeight={500}
        letterSpacing="-0.02em"
        marginBottom={{ md: 0, sm: '20px', xs: '20px' }}
      >
        LXDAO & WORK
      </Typography>
      <Typography
        variant="h2"
        lineHeight={{ md: '68px', sm: '37px', xs: '37px' }}
        fontWeight={800}
      >
        How does LXDAO work?
      </Typography>
    </Box>
    <Box position="relative">
      <WorkStep
        leftBgColor="#F1F3F5"
        rightBgColor="#10D7C4"
        stepIcon="/icons/idea.svg"
        stepTitle="IDEA"
        stepDes="Initiate creative proposals in our community Initiate creative
            proposals in our community.creative proposals in ou,creative
            proposals in ouInitiate creative proposals in our community creative
            proposals"
        rightSection={
          <WorkDetailSection
            title="In progress proposal"
            data={ideaData}
            bottomButtonText="Post an idea"
            bottomButtonLink=""
          />
        }
      />
      <WorkStep
        leftBgColor="#ffffff"
        rightBgColor="#36AFF9"
        stepIcon="/icons/vote.svg"
        stepTitle="VOTE"
        stepDes="Discussion Proposal Vote.Discussion Proposal Vote.Discussion Proposal Vote.Discussion Proposal Vote.Discussion Proposal Vote.Discussion Proposal Vote."
        rightSection={
          <WorkDetailSection
            title="Investigate voting records"
            data={voteData}
            bottomButtonText="Create a vote"
            bottomButtonLink="https://snapshot.org/#/lxdao.eth"
          />
        }
      />
      <WorkStep
        leftBgColor="#F1F3F5"
        rightBgColor="#10D7C4"
        stepIcon="/icons/buidling.svg"
        stepTitle="BUIDLING"
        stepDes="buidling buidling buidling buidling buidling buidling buidling buidling buidling buidling"
        rightSection={
          <Box>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
            >
              {projectData.map((data, index) => {
                return (
                  <SwiperSlide key={index}>
                    <SimpleProjectCard data={data} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        }
      />
      <WorkStep
        leftBgColor="#ffffff"
        rightBgColor="#36AFF9"
        stepIcon="/icons/success.svg"
        stepTitle="Fund allocation"
        stepDes="After the product is perfected, the fund is allocated according to the contribution.After the product is perfected, the fund is allocated according to the contributionAfter the product is perfected, the fund is allocated according to the contribution"
        rightSection={
          <Box
            component="img"
            width={{ sm: '450px', xs: '320px' }}
            src="/images/workstep-success.png"
          />
        }
      />
    </Box>
  </Box>
);

export default SectionWorkSteps;
