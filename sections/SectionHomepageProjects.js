import React from 'react';
import { Box, Typography, Link } from '@mui/material';

import CustomButton from '@/components/Button';
import ProjectCard from '@/components/ProjectCard';

const SectionHomePageProjects = ({ projects }) => {
  return (
    <Box sx={{ background: 'linear-gradient(#FFF4EA 0%, #FFFFFF 100%)' }}>
      <Box paddingY={{ md: '112px', xs: 8 }}>
        <Typography
          variant="h2"
          lineHeight="44px"
          fontWeight={600}
          letterSpacing="-0.02em" //设置文本字符的间距
          maxWidth="1216px"
          marginX={{ lg: 'auto', md: '20px', xs: '20px' }}
          marginBottom={3}
        >
          PROJECTS
        </Typography>
        <Typography
          variant="subtitle1"
          lineHeight="30px"
          fontWeight={400}
          color="#666F85"
          maxWidth="1216px"
          marginX={{ lg: 'auto', md: '20px', xs: '20px' }}
          marginBottom={8}
        >
          We buidl good, valuable, and useful things. If you have a perfect idea
          want to become true, please write a proposal first.
        </Typography>
        <Box marginTop={6} overflow="scroll">
          <Box
            display="flex"
            flexDirection={{ md: 'row', sm: 'column', xs: 'column' }}
            alignItems="stretch"
            flexWrap="nowrap"
            gap={3}
          >
            {projects.map((project, index) => {
              return (
                <Box
                  width={{
                    md: '500px',
                    sm: 'calc(100% - 40px)',
                    xs: 'calc(100% - 40px)',
                  }}
                  key={index}
                  flexShrink={0}
                  marginLeft={{
                    lg:
                      index === 0 ? 'calc((100vw - Min(1216px, 90vw))/ 2)' : 0,
                    md: index === 0 ? '20px' : 0,
                    sm: 'auto',
                    xs: 'auto',
                  }}
                  marginRight={{
                    lg:
                      index === projects.length - 1
                        ? 'calc((100vw - Min(1216px, 90vw))/ 2)'
                        : 0,
                    md: 0,
                    sm: 'auto',
                    xs: 'auto',
                  }}
                >
                  <ProjectCard project={project} />
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box
          maxWidth="1216px"
          marginX={{ lg: 'auto', md: '20px', xs: '20px' }}
          marginTop="110px"
          display="flex"
        >
          <CustomButton variant="gradient" width="200px">
            <Link
              href="https://www.notion.so/lxdao/How-do-we-work-93038c708217465384cc7d9f377547c5"
              target="_blank"
              sx={{ textDecoration: 'none', color: '#ffffff' }}
            >
              Buidl Your Own
            </Link>
          </CustomButton>
          <CustomButton variant="outlined" width="200px" marginLeft={2}>
            <Link
              href="/projects"
              target="_blank"
              sx={{ textDecoration: 'none' }}
            >
              View all projects
            </Link>
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SectionHomePageProjects;
