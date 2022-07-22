import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Grid, Card } from '@mui/material';

import Container from '@/components/Container';
import Button from '@/components/Button';



const works = [
  {
    banner: '/works/3.png',
    logo: '/works/3-logo.png',
    title: 'MyFirstNFT',
    description:
      'MyFirstNFT is a non-profit instructional project for Web3 newbies. Get a FREE NFT while learning about Web3, underlying values of NFT, and security principles.',
    url: 'https://myfirstnft.info/',
  },
  {
    banner: '/works/1.png',
    logo: '/works/1-logo.png',
    title: 'Marry3',
    description:
      'https://Marry3.love is a dapp help you create Paired Soulbound Marriage Certificate Token, non-sell, non-transfer, forever on chain~~~',
    url: 'https://www.marry3.love/',
  },
  {
    banner: '/works/2.png',
    logo: '/works/2-logo.png',
    title: 'GuoChanLiangXin',
    description:
      'GCLX NFT project is a Performance Art. It is made by 1000 randomly generated NFTs, sold for 0.01 ETH. Using funny content to tell Chinese NFT players what NFTs truly are.',
    url: 'https://gclx.xyz/',
  },
  {
    banner: '/works/4.png',
    logo: '/works/2-logo.png',
    title: 'Web3 in 2032',
    description:
      'In 2032, there are a billion people live on Web3 everyday. This project documents something that will have happened on Web3 in 2032.',
    url: 'https://web3in2032.io/',
  },
];
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {

  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const SectionProjects = () => {

  const router = useRouter();
  const route = router.route;
  const isHomepage = route === '/';
  const projectArray = isHomepage ? shuffle(works).slice(0, 3) : shuffle(works);

  return (<Container
    paddingY={{ md: '96px', xs: 8 }}
    textAlign="center"
    id="Projects-Section"
    maxWidth="1200px"
  >
    <Typography variant="h4">Projects</Typography>
    <Typography fontSize="20px" marginTop={2}>
      We buidl good, valuable, and useful things.
    </Typography>
    <Box marginTop={6}>
      <Grid container spacing={3} alignItems="stretch">
        {projectArray.map((work, index) => {
          return (
            <Grid
              key={index}
              item
              sm={6}
              xs={12}
              md={4}
              display="flex"
              alignItems="stretch"
            >
              <Card
                sx={{
                  position: 'relative',
                  borderRadius: 4,
                  paddingBottom: isHomepage ? 4 : 16,
                }}
              >
                <Box>
                  <img style={{ width: '100%' }} src={work.banner} />
                  <img
                    src={work.logo}
                    style={{
                      width: '30%',
                      height: '30%',
                      marign: '0 auto',
                      marginTop: '-15%',
                    }}
                  />
                </Box>

                <Typography className="work-item-title">
                  {work.title}
                </Typography>
                <Typography margin={2} marginTop={4} color="#666f85" sx={{}}>
                  {work.description}
                </Typography>
                {!isHomepage ?
                  <Button
                    width="150px"
                    position="absolute"
                    bottom="40px"
                    left="calc(50% - 92px)"
                    onClick={() => {
                      window.open(work.url, '_blank');
                    }}
                  >
                    More
                  </Button> : null}
              </Card>

            </Grid>
          );
        })}
      </Grid>
    </Box>
    <Box
      marginTop={{ md: 8, xs: 4 }}
      display="flex"
      justifyContent="center"
      gap={2}
    >
      <Button
        variant="outlined"
        onClick={() => {
          router.push('/projects');
        }}
      >
        View More
      </Button>
    </Box>
  </Container>)
};

export default SectionProjects;
