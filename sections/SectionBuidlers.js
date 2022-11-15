import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { Box, Typography, Link } from '@mui/material';

import API from '@/common/API';

import Container from '@/components/Container';
import Button from '@/components/Button';
import StyledTooltip from '@/components/StyledToolTip';
import Tag from '@/components/Tag';
import Skills from '@/components/Skills';

const BuidlerAvatarBox = ({
  key,
  handleBuidlerCardHover,
  handleBuidlerCardLeave,
  buidler,
  active,
  ...rest
}) => {
  return (
    <Box
      key={key}
      sx={{ aspectRatio: '1 / 1' }}
      onMouseOver={handleBuidlerCardHover}
      onMouseLeave={handleBuidlerCardLeave}
      position="relative"
      width={{ sm: '30%', xs: '30%' }}
      {...rest}
    >
      <Box
        width={{ lg: '180px', md: '130px', sm: '100%', xs: '100%' }}
        sx={{ position: 'absolute', top: 0, left: 0, aspectRatio: '1 / 1' }}
        backgroundColor={active ? 'transpent' : 'rgba(0,0,0,0.2)'}
      />
      <Link
        href={`/buidlers/${buidler.address}`}
        target="_blank"
        sx={{
          textDecoration: 'none',
        }}
      >
        <Box
          component="img"
          src={buidler.avatar || '/images/placeholder.jpeg'}
          width={{ lg: '180px', md: '130px', sm: '100%', xs: '100%' }}
          sx={{ aspectRatio: '1 / 1' }}
        />
      </Link>
    </Box>
  );
};

const BudilerTooltip = ({
  buidler,
  key,
  active,
  handleBuidlerCardHover,
  handleBuidlerCardLeave,
  ...rest
}) => {
  const BuidlerDetails = ({ name, description, address, role, skills }) => {
    return (
      <Box>
        <Typography
          color="#000000"
          variant="h5"
          lineHeight="24px"
          fontWeight={500}
          marginBottom={3}
        >
          {name}
        </Typography>
        <Typography
          color="#666F85"
          variant="body1"
          lineHeight="24px"
          fontWeight={400}
          marginBottom="17px"
        >
          {description}
        </Typography>
        {role?.length && (
          <Box display="flex" flexWrap="wrap" marginBottom="25px">
            {role.map((roleItem, index) => {
              return <Tag key={index} text={roleItem} />;
            })}
          </Box>
        )}
        {skills?.length && (
          <>
            <Typography
              variant="body1"
              color="#101828"
              lineHeight="24px"
              fontWeight={500}
              marginBottom="17px"
            >
              Skills
            </Typography>
            <Box display="flex" flexWrap="wrap" marginBottom={3}>
              <Skills skills={skills} />
            </Box>
          </>
        )}
        <Link href={`/buidlers/${address}`} sx={{ textDecoration: 'none' }}>
          <Typography
            color="#101828"
            variant="body1"
            lineHeight="24px"
            fontWeight={500}
            textAlign="right"
          >
            More ->
          </Typography>
        </Link>
      </Box>
    );
  };

  return (
    <Box {...rest}>
      <StyledTooltip
        title={<BuidlerDetails {...buidler} />}
        placement="bottom-start"
      >
        <BuidlerAvatarBox
          key={key}
          handleBuidlerCardHover={handleBuidlerCardHover}
          handleBuidlerCardLeave={handleBuidlerCardLeave}
          buidler={buidler}
          active={active}
        />
      </StyledTooltip>
    </Box>
  );
};

const SectionBuidlers = () => {
  const [buidlers, setBuidlers] = useState([]);
  const [activeBuidlerIndex, setActiveBuidlerIndex] = useState(null);
  const router = useRouter();

  useEffect(async () => {
    try {
      const res = await API.get('/buidler');
      const result = res?.data;
      if (result.status !== 'SUCCESS') {
        // error todo Muxin add common alert, wang teng design
        return;
      }
      setBuidlers(result?.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleBuidlerHover = (index) => {
    setActiveBuidlerIndex(index);
  };

  const handleBuidlerLeave = () => {
    setActiveBuidlerIndex(null);
  };

  return (
    <Box backgroundColor="#000000">
      <Container paddingY={{ md: '112px', xs: 8 }} width="100%">
        <Typography
          variant="h2"
          lineHeight="44px"
          fontWeight="600"
          color="#ffffff"
          marginBottom="31px"
        >
          LXDAO BUIDLERS
        </Typography>
        <Typography
          variant="subtitle1"
          lineHeight="30px"
          fontWeight={400}
          color="#ffffff"
          marginBottom={{ md: '102px', xs: '72px' }}
        >
          Welcome to Join Us, let's buidl more valuable Web3 products together!
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          width={{ sm: 'calc(100% - 40px)', xs: 'calc(100% - 40px)' }}
        >
          {buidlers.map((buidler, index) => {
            return (
              <>
                <BudilerTooltip
                  handleBuidlerCardHover={() => {
                    handleBuidlerHover(index);
                  }}
                  handleBuidlerCardLeave={() => {
                    handleBuidlerLeave(index);
                  }}
                  buidler={buidler}
                  key={index}
                  active={activeBuidlerIndex === index}
                  display={{ md: 'block', xs: 'none' }}
                />
                <BuidlerAvatarBox
                  buidler={buidler}
                  active={activeBuidlerIndex === index}
                  display={{ md: 'none', xs: 'block' }}
                />
              </>
            );
          })}
        </Box>
        <Button
          variant="gradient"
          width="200px"
          marginTop={{ md: '96px', xs: '27px' }}
          onClick={() => {
            router.push('/joinus');
          }}
        >
          Join Us
        </Button>
      </Container>
    </Box>
  );
};

export default SectionBuidlers;
