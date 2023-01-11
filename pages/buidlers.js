/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Link,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Layout from '@/components/Layout';
import SingleSelect from '@/components/Select';
import DebouncedInput from '@/components/DebouncedInput';
import Container from '@/components/Container';
import API from '@/common/API';
import Tag from '@/components/Tag';
import Skills from '@/components/Skills';
import BuidlerContacts from '@/components/BuidlerContacts';
import Button from '@/components/Button';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { convertIpfsGateway } from '@/utils/utility';
import { makeStyles } from '@mui/styles';
import LXButton from '@/components/Button';
import ProfileForm from '@/components/ProfileForm';
import _ from 'lodash';

import useBuidler from '@/components/useBuidler';
import { useRouter } from 'next/router';
import showMessage from '@/components/showMessage';

const useStyles = makeStyles(() => ({
  searchInputWrapper: {
    cursor: 'pointer',
    color: '#fff',
    '& .searchInput': {
      border: '#fff',
    },
    '& .memberAvatar': {
      width: '80px',
      height: '80px',
      transition: 'width 0.1s, height 0.1s linear',
    },
    '& .memberTwitter': {
      display: 'none',
    },
    '&:hover': {
      '& .memberInfoWrapper': {
        visibility: 'visible',
        opacity: 1,
      },
      '& .memberAvatar': {
        width: '50px',
        height: '50px',
      },
      '& .memberTwitter': {
        display: 'block',
      },
    },
  },
}));

export function BuidlerCard(props) {
  const record = props.record;
  const skills = record.skills ? record.skills : [];
  const simpleMode = props.simpleMode;

  return (
    <Box
      border="0.5px solid #D0D5DD"
      borderRadius="6px"
      padding={3}
      position="relative"
      height="100%"
    >
      <Link
        href={`/buidlers/${record.address}`}
        target="_blank"
        color={'inherit'}
        sx={{
          textDecoration: 'none',
        }}
      >
        <Box display="flex">
          <Box
            flex="0 0 80px"
            width="80px"
            height="80px"
            borderRadius="6px"
            overflow="hidden"
            border="0.5px solid #E5E5E5"
            marginRight={3}
          >
            <img
              style={{ display: 'block', width: 80, height: 80 }}
              src={
                convertIpfsGateway(record.avatar) || '/images/placeholder.jpeg'
              }
              alt=""
            />
          </Box>
          <Box
            flex={1}
            display="flex"
            width="calc(100% - 85px)"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography
              variant="h5"
              sx={{
                lineHeight: '24px',
                fontWeight: '500',
                color: '#000',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {record.name}
            </Typography>
            <Box height={{ sm: '48px', md: '36px' }} overflow="hidden">
              <BuidlerContacts contacts={record.contacts} />
            </Box>
          </Box>
        </Box>
        {!simpleMode && record.description && (
          <Box display="flex" flexWrap="wrap" marginTop={2}>
            <Typography
              variant="body1"
              sx={{
                lineHeight: '24px',
                color: '#666F85',
              }}
            >
              {record.description}
            </Typography>
          </Box>
        )}
        {!simpleMode && record.role.length > 0 ? (
          <Box display="flex" flexWrap="wrap" marginTop={2}>
            {record.role.map((item) => {
              return <Tag key={item} text={item}></Tag>;
            })}
          </Box>
        ) : null}
        {!simpleMode && skills.length > 0 && (
          <Box marginTop={2}>
            <Typography
              color="#fff"
              fontWeight="600"
              marginBottom={1}
              variant="body1"
            >
              Skills
            </Typography>
            <Box display="flex" flexWrap="wrap">
              <Skills skills={skills} />
            </Box>
          </Box>
        )}
        {!simpleMode &&
          record.projects.filter((project) => project.status !== 'PENDING')
            .length > 0 && (
            <Box marginTop={2}>
              <Typography
                color="#fff"
                fontWeight="600"
                marginBottom={2}
                variant="body1"
              >
                Projects
              </Typography>
              <Box
                display="flex"
                gap="10px"
                flexWrap="noWrap"
                justifyContent="flex-start"
                overflow="hidden"
              >
                {record.projects
                  .filter((project) => project.status !== 'PENDING')
                  .map((project, index) => (
                    <Link
                      key={index}
                      href={`/projects/${project?.project?.number}`}
                    >
                      <Box
                        key={project.id}
                        width={60}
                        height={60}
                        sx={{
                          border: '0.5px solid #D0D5DD',
                          borderRadius: '2px',
                        }}
                      >
                        <img
                          style={{ display: 'block', width: '100%' }}
                          src={
                            project.project?.logo || '/images/placeholder.jpeg'
                          }
                          alt=""
                        />
                      </Box>
                    </Link>
                  ))}
              </Box>
            </Box>
          )}
      </Link>
    </Box>
  );
}

const roleNames = [
  'All',
  'Buidler',
  'Core',
  'Project Manager',
  'Investor',
  'Onboarding Committee',
];

let skillNames = [
  'All',
  'UI/UX Design',
  'Project Management',
  'Product Management',
  'FrontEnd',
  'FullStack',
  'BackEnd',
  'Operation',
  'Solidity',
  'Blockchain',
  'Others',
];

export default function Home() {
  const router = useRouter();
  const address = router.query.address;

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [skill, setSkill] = useState('');
  const [current, setCurrent] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [visible, setVisible] = useState(false);
  const [record, error, refresh] = useBuidler(address);

  const searchList = async (
    search = '',
    role = '',
    skill = '',
    currentPage = 0,
    isAddMore = false
  ) => {
    let query = `/buidler?`;
    let params = [];
    const trimmedSearch = search.trim();
    const trimmedRole = role === 'All' ? '' : role.trim();
    const trimmedSkill = skill === 'All' ? '' : skill.trim();
    if (trimmedSearch) {
      params.push('search=' + trimmedSearch);
    }
    if (trimmedRole) {
      params.push('role=' + trimmedRole);
    }
    if (trimmedSkill) {
      params.push('skill=' + trimmedSkill);
    }
    params.push('page=' + (currentPage || current));
    params.push('per_page=9');
    query += params.join('&');
    // 将表单的3个筛选条件推到 params数组中 再转为字符串拼贴到query

    if (!isAddMore) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    try {
      // 发送网络请求
      const res = await API.get(query); //API就是axios 多了默认的baseURL和header
      const result = res.data;
      if (result.status !== 'SUCCESS') {
        // error todo Muxin add common alert, wang teng design
        return;
      }
      const records = result.data;

      let tempList = [];
      records.forEach((record) => {
        tempList.push(record);
      });
      setHasMore(tempList.length === 9);

      isAddMore ? setList([...list, ...tempList]) : setList([...tempList]);
    } catch (err) {
      console.error(err);
    }
    if (!isAddMore) {
      setLoading(false);
    } else {
      setLoadingMore(false);
    }
  };

  const saveProfileHandler = async (newMetaData) => {
    setUpdating(true);
    const userProfile = {
      ...newMetaData,
      role: record.role.length === 0 ? ['Buidler'] : record.role,
      image: `${process.env.NEXT_PUBLIC_LXDAO_BACKEND_API}/buidler/${record.address}/card`,
    };
    try {
      // todo axios的put请求？
      // mark 将Profile Details存储起来
      const response = await API.put(`/buidler/${address}`, {
        metaData: userProfile,
      });
      const result = response?.data;
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      }
      setVisible(false);
      props.refresh();
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to update profile',
        body: err.message,
      });
    }
    setUpdating(false);
  };

  useEffect(() => {
    searchList();
  }, []);
  const styles = useStyles();

  return (
    <Layout title="LXDAO Buidlers | LXDAO">
      <Container paddingY={{ md: 12, xs: 8 }} maxWidth={1216}>
        <Box
          display="flex"
          flexDirection="column"
          gap={6}
          alignItems={{ lg: 'center', xs: 'center' }}
          textAlign={{ lg: 'center', xs: 'center' }}
        >
          <Box textAlign="center" gap={6}>
            <Typography
              fontSize="70px"
              fontWeight={600}
              lineHeight="70px"
              color="#f0f0f0"
            >
              8DAO Members
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={400}
              lineHeight="30px"
              color="#667085"
              marginTop={4}
            >
              Welcome to Join Us!
            </Typography>
          </Box>
          {/* {address === 管理员地址 ?  */}(
          <LXButton
            onClick={() => {
              setVisible(true);
            }}
            varient="outlined"
          >
            Add Member
          </LXButton>
          ){/* : null} */}
        </Box>
        <Grid
          marginTop={10}
          container
          spacing={2}
          className={styles.searchInputWrapper}
        >
          <Grid item xs={4}>
            <DebouncedInput
              value={search}
              onChange={(value) => {
                setCurrent(1);
                setSearch(value);
                searchList(value, role, skill, 1);
              }}
              label="Search"
              placeholder="Search buidlers"
              className="searchInput"
            />
          </Grid>

          <Grid item xs={4}>
            <SingleSelect
              value={role}
              label="Role"
              dropdown={roleNames}
              onChange={(value) => {
                setCurrent(1);
                setRole(value);
                searchList(search, value, skill, 1);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <SingleSelect
              value={skill}
              label="Skill"
              dropdown={skillNames}
              onChange={(value) => {
                setCurrent(1);
                setSkill(value);
                searchList(search, role, value, 1);
              }}
            />
          </Grid>
        </Grid>
        <Box
          marginTop={10}
          display={loading ? 'flex' : 'none'}
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
        <Box marginTop={6.25} display={loading ? 'none' : 'block'}>
          {list.length === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              alignItems="center"
              paddingY={4}
            >
              <img width="80px" src="/icons/no-records.png" />
              <Typography marginTop={4} color="#D0D5DD" fontSize="16px">
                No builders found with the search criteria
              </Typography>
            </Box>
          ) : (
            <Box>
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 0: 1, 600: 2, 900: 3 }}
              >
                <Masonry gutter="16px">
                  {list.map((item) => {
                    return (
                      <Grid key={item.id} item xs={12} sm={6} lg={4}>
                        <BuidlerCard key={item.id} record={item} />
                      </Grid>
                    );
                  })}
                </Masonry>
              </ResponsiveMasonry>

              <Box
                marginTop={{ md: 6, xs: 3 }}
                display="flex"
                justifyContent="center"
                gap={2}
              >
                {loadingMore ? (
                  <Box marginTop={10} display="flex" justifyContent="center">
                    <CircularProgress />
                  </Box>
                ) : hasMore ? (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setCurrent(current + 1);
                      searchList(search, role, skill, current + 1, true);
                    }}
                  >
                    View More
                  </Button>
                ) : null}
              </Box>
            </Box>
          )}
        </Box>
        <Dialog
          fullWidth={true}
          maxWidth={'sm'}
          onClose={(event, reason) => {
            if (reason && reason == 'backdropClick') return;
            setVisible(false);
          }}
          open={visible}
        >
          <Box
            onClick={() => {
              setVisible(false);
            }}
            sx={{ cursor: 'pointer' }}
            position="absolute"
            top="16px"
            right="16px"
          >
            <CloseIcon />
          </Box>
          <DialogTitle>Profile Details</DialogTitle>
          <DialogContent>
            {/* _.cloneDeep(value) 深拷贝value */}
            <ProfileForm
              value={_.cloneDeep(
                //_.pick(object, [props]) 创建一个从 object 中选中的属性的对象。
                _.pick(record, [
                  'avatar',
                  'name',
                  'description',
                  'skills',
                  'interests',
                  'contacts',
                ])
              )}
              saveProfileHandler={saveProfileHandler}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </Layout>
  );
}
