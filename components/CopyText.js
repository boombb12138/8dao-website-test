import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip, Box } from '@mui/material';

function CopyText({ copyText, copyTextOriginal }) {
  const [copyTip, setCopyTip] = useState('Copy to Clipboard');

  return (
    <CopyToClipboard
      text={copyTextOriginal}
      onCopy={() => {
        setCopyTip('Copied');
        setTimeout(() => {
          setCopyTip('Copy to Clipboard');
        }, 1000);
      }}
    >
      <Tooltip title={copyTip} placement="top">
        <Box
          display="flex"
          sx={{
            cursor: 'pointer',
          }}
        >
          {copyText}
          <Box
            marginLeft={1}
            width="15px"
            component={'img'}
            src={`/icons/copy.svg`}
            sx={{
              display: 'block',
            }}
          />
        </Box>
      </Tooltip>
    </CopyToClipboard>
  );
}

export default CopyText;
