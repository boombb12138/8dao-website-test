import React from 'react';
import { Tooltip, Box } from '@mui/material';
import SkillTag from './SkillTag';

function MemberTier({ skills }) {
  return (skills || [])
    .sort((a, b) => {
      if (a.level === 'Senior' && b.level !== 'Senior') {
        return -1;
      }
      if (a.level === 'Intermediate' && b.level === 'Junior') {
        return -1;
      }
      if (a.level === 'Junior' && b.level !== 'Junior') {
        return 1;
      }
      return 0;
    })
    .map((skill) => {
      // mark tooltip要改 只有一个等级
      return (
        <Box key={skill.name} display="flex" flexWrap="wrap">
          <Tooltip title={skill.level} placement="top">
            <Box>
              <SkillTag text={skill.name} level={skill.level} />
            </Box>
          </Tooltip>
        </Box>
      );
    });
}

export default MemberTier;
