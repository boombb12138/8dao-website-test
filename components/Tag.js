import React from 'react';
import { Box } from '@mui/material';

function Tag(props) {
  return (
    <Box
      sx={{
        borderRadius: '2px',
        padding: '2px 6px',
        marginRight: '8px',
        marginBottom: '4px',
        wordBreak: 'break-all',
        background: props.background || 'rgba(255, 255, 255, 0.3)',
        color: props.color || 'rgba(255, 255, 255, 0.7)',
        fontSize: '14px',
      }}
    >
      {props.text}
    </Box>
  );
}

export default Tag;
