import React from 'react';
import { Box, Typography } from '@mui/material';
import { t } from '@lingui/macro';

const Header = () => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    width="100%"
    height="80px"
    borderBottom="1px solid #F2F4F7"
  >
    <Box display="flex" marginLeft="80px">
      <Box width="32px" component={'img'} src={'/icons/logo.svg'} />
      <Typography variant="h5" paddingLeft="10px">{t`LXDAO`}</Typography>
    </Box>
    <Box marginRight="80px">
      <Typography
        target="_blank"
        component="a"
        href="https://twitter.com/LXDAO_Official"
        color="primary"
        marginRight={2}
      >
        <Box width="50px" component={'img'} src={'/icons/twitter.svg'} />
      </Typography>
      <Typography
        target="_blank"
        component="a"
        href="https://discord.gg/UBAmmtBs"
        color="primary"
        marginRight={2}
      >
        <Box width="50px" component={'img'} src={'/icons/discord.svg'} />
      </Typography>
    </Box>
  </Box>
);

export default Header;
