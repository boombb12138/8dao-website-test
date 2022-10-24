import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Stack,
  Avatar,
  Tooltip,
  Autocomplete,
  TextField,
  Link,
  MenuItem,
  Select,
  Checkbox,
  OutlinedInput,
  ListItemText,
  InputLabel,
  FormControl,
  CardContent,
  Card,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAccount } from 'wagmi';

import API from '@/common/API';
import { getLocalStorage } from '@/utils/utility';
import { AlertContext } from '@/context/AlertContext';

import Button from '@/components/Button';
import Container from '@/components/Container';
import BuidlerCard from '@/components/BuidlerCard';
import Dialog from '@/components/Dialog';

const useStyles = makeStyles({
  tooltip: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0px 4px 10px 3px rgba(0, 0, 0, 0.04)',
    width: '335px',
  },
});

const SectionProjectDetail = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [activeBuidlerList, setActiveBuidlerList] = useState([]);
  const [selectedBuidler, setSelectedBuidler] = useState('');
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const [openJoinTooltip, setOpenJoinTooltip] = useState(false);
  const [showJoinButton, setShowJoinButton] = useState(true);
  const [showInviteButton, setShowInviteButton] = useState(false);
  const [showAcceptButton, setShowAcceptButton] = useState(false);
  const [currentBuidlerOnProjectInfo, setCurrentBuidlerOnProjectInfo] =
    useState({ id: null, ipfsURI: '' });
  const [projectRoleValue, setProjectRoleValue] = useState([]);
  const [inviteBuidlerErrors, setInviteBuidlerErrors] = useState({
    buidler: {
      error: false,
      errorMsg: '',
    },
    role: {
      error: false,
      errorMsg: '',
    },
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 230,
      },
    },
  };

  const projectRoleList = [
    'Project Manager',
    'Developer',
    'Artist',
    'UI/UX Desinger',
    'Operation',
  ];

  const useAlert = () => useContext(AlertContext);
  const { setAlert } = useAlert();
  const { address } = useAccount();
  const classes = useStyles();

  const PROJECT_STATUS = {
    WIP: 'WORK IN PROGRESS',
    LAUNCHED: 'LAUNCHED',
  };

  let projectManagerName = '';
  let projectManagerAddress = '';
  const projectManagerBudilder = project?.buidlersOnProject.find((buidler) =>
    buidler?.projectRole.includes('Project Manager')
  );
  projectManagerName = projectManagerBudilder?.buidler?.name;
  projectManagerAddress = projectManagerBudilder?.buidler?.address;

  const getProjectData = () => {
    API.get(`/project/${projectId}`)
      .then((res) => {
        if (res?.data?.data) {
          setProject(res?.data?.data);
          getBuidlersData(res?.data?.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getProjectData();
  }, [address]);

  const getBuidlersData = (project) => {
    API.get(`/buidler?status=ACTIVE`)
      .then((res) => {
        if (res?.data?.data) {
          const activeBuidlers = [];
          const buidlerIdsOnProject = [];
          project?.buidlersOnProject.forEach((buidlerOnProject) => {
            buidlerIdsOnProject.push(buidlerOnProject?.buidlerId);
          });
          res?.data?.data?.forEach((buidler) => {
            if (!buidlerIdsOnProject.includes(buidler.id)) {
              activeBuidlers.push(buidler);
            }
          });
          setActiveBuidlerList(activeBuidlers);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (address) {
      let showJoinButtonFlag = false;
      let showInviteButtonFlag = false;
      project?.buidlersOnProject.forEach((buidler) => {
        if (buidler?.buidler?.address === address) {
          showJoinButtonFlag = true;
        }
        // if this buidler is on project and status(project) is PENDING, will show accept button
        if (
          buidler?.buidler?.address === address &&
          buidler?.status === 'PENDING'
        ) {
          setShowAcceptButton(true);
          setCurrentBuidlerOnProjectInfo({
            id: buidler?.id,
            ipfsURI: buidler?.buidler?.ipfsURI || '',
          });
        }
        // if this buidler is PM, will show invite button
        if (
          buidler?.projectRole.includes('Project Manager') &&
          buidler?.buidler.address === address
        ) {
          showInviteButtonFlag = true;
        }
      });
      setShowInviteButton(showInviteButtonFlag);
      setShowJoinButton(!showJoinButtonFlag);
    } else {
      setShowJoinButton(true);
      setShowInviteButton(false);
    }
  }, [address, project]);

  const LabelText = ({ label }) => {
    return (
      <Typography
        color="#666F85"
        fontSize="16px"
        textAlign="left"
        marginBottom={1.5}
      >
        {label}
      </Typography>
    );
  };

  const handleDisplayBuidlerTooltip = (data, status) => {
    const cloneProjectData = { ...project };
    cloneProjectData?.buidlersOnProject.forEach((item) => {
      if (item.id === data.id) {
        item.showTooltip = status === 'open';
      }
    });
    setProject(cloneProjectData);
  };

  const handleBuidlerJoin = () => {
    const accessToken = getLocalStorage('accessToken');
    if (accessToken) {
      setOpenJoinDialog(true);
    } else {
      setOpenJoinTooltip(true);
      setTimeout(() => {
        setOpenJoinTooltip(false);
      }, 3000);
    }
  };

  const handleInviteBuidler = () => {
    const cloneInviteBuidlerErrors = { ...inviteBuidlerErrors };
    if (!selectedBuidler) {
      cloneInviteBuidlerErrors['buidler'].error = true;
      cloneInviteBuidlerErrors['buidler'].errorMsg = 'Please select a buidler';
      setInviteBuidlerErrors({
        ...inviteBuidlerErrors,
        ...cloneInviteBuidlerErrors,
      });
      return;
    }
    if (projectRoleValue.length < 1) {
      cloneInviteBuidlerErrors['role'].error = true;
      cloneInviteBuidlerErrors['role'].errorMsg = 'Please select a role';
      setInviteBuidlerErrors({
        ...inviteBuidlerErrors,
        ...cloneInviteBuidlerErrors,
      });
      return;
    }
    if (selectedBuidler && projectRoleValue.length > 0) {
      let selectedBuidlerId = '';
      activeBuidlerList.forEach((buidler) => {
        if (buidler.name === selectedBuidler) {
          selectedBuidlerId = buidler.id;
        }
      });
      API.post(`/buidler/createInvitation`, {
        buidlerId: selectedBuidlerId,
        projectId: project?.id,
        projectRole: projectRoleValue,
      })
        .then((res) => {
          if (res?.data?.status === 'SUCCESS') {
            setAlert(
              'Invite buidler successfully, please wait for the buidler to accept the invitation',
              'success'
            );
          } else {
            setAlert(res?.data?.message, 'error');
          }
        })
        .catch((err) => {
          setAlert('something went wrong', 'error');
        });
    }
  };

  const handleAcceptInvitation = () => {
    API.post(`/buidler/joinProject`, currentBuidlerOnProjectInfo)
      .then((res) => {
        if (res?.data?.status === 'SUCCESS') {
          setAlert(
            'Congratulations on your successful participation in this project!',
            'success'
          );
          getProjectData();
          setShowAcceptButton(false);
        }
      })
      .catch((err) => {
        setAlert('something went wrong', 'error');
      });
  };

  const cardData = [
    {
      title: 'items',
      url: '',
      value: '1.0k',
    },
    {
      title: 'items',
      url: '',
      value: '1.0k',
    },
    {
      title: 'items',
      url: '/icons/eth.svg',
      value: '0.05',
    },
    {
      title: 'items',
      url: '/icons/eth.svg',
      value: '300',
    },
  ];
  const cardItem = (item, isRight) => {
    return (
      <Card
        sx={{
          minWidth: '180px',
          height: '132px',
          background: '#FFFFFF',
          border: '0.5px solid #D0D5DD',
          borderRadius: '6px',
          marginRight: isRight ? 3 : 0,
        }}
      >
        <CardContent>
          <Typography textAlign="left" variant="body1">
            {item.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '32px',
            }}
          >
            <img src={item.url} style={{ height: '100%' }} />
            <Typography sx={{ fontWeight: 600, fontSize: '32px' }}>
              {item.value}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };
  if (!project) return null;
  return (
    <Container
      paddingY={{ md: '96px', xs: 8 }}
      // paddingX={{ md: 32, xs: 8 }}
      textAlign="center"
      id="Project-Detail-Section"
      maxWidth="1200px"
      minHeight="calc(100vh - 280px)"
    >
      <Grid container spacing={4}>
        <Grid item xs={4} display={{ md: 'block', xs: 'none' }}>
          <Box
            sx={{
              background: '#FFFFFF',
              border: '0.5px solid #D0D5DD',
              borderRadius: '6px',
              width: '100%',
              padding: 3,
            }}
          >
            <Link
              href={project?.links.website || ''}
              target="_blank"
              sx={{ position: 'relative' }}
            >
              <img
                style={{
                  width: '100%',
                  boxShadow: '0px 4px 10px 3px rgba(0, 0, 0, 0.04)',
                }}
                src={project.logoLarge}
              />
              <Typography
                sx={{
                  position: 'absolute',
                  left: '1px',
                  bottom: '4px',
                  background: '#36AFF9',
                  borderRadius: '2px',
                  fontSize: '12px',
                  lineHeight: '15px',
                  color: '#fff',
                }}
                width={38}
                height={16}
              >
                {'#' + project.number}
              </Typography>
            </Link>
            <Typography variant="h5">{project.name}</Typography>
            <Box
              sx={{
                width: '100%',
                height: '0px',
                border: '0.5px solid #E5E5E5',
              }}
              marginTop={3}
              marginBottom={3}
            ></Box>
            <Typography align="left">{project.description}</Typography>
            <Box
              align="left"
              display="flex"
              gap="5px"
              flexWrap="wrap"
              minHeight={'26px'}
            >
              {project.type &&
                project.type.map((type, index) => {
                  return (
                    <Chip
                      key={index}
                      size="small"
                      label={type}
                      variant="outlined"
                      sx={{
                        borderRadius: '4px',
                        borderColor: '#000000',
                        fontSize: '12px',
                      }}
                    />
                  );
                })}
            </Box>
            <Box display="flex" gap={4} flexWrap="wrap">
              {project.links &&
                Object.keys(project.links).map((key, index) => {
                  return (
                    <Typography
                      target="_blank"
                      component="a"
                      href={project.links[key]}
                      color="primary"
                      key={index}
                    >
                      <Box
                        width="20px"
                        component={'img'}
                        src={`/icons/${key}.svg`}
                      />
                    </Typography>
                  );
                })}
            </Box>
            <Box
              sx={{
                width: '100%',
                height: '0px',
                border: '0.5px solid #E5E5E5',
              }}
              marginBottom={3}
              marginTop="26px"
            ></Box>
            <Stack direction="column" spacing={2} marginBottom={3}>
              {project.launchDate && (
                <Box align="center" display={'flex'}>
                  <LabelText label="Launch Date" />
                  <Typography
                    fontSize={{ md: '16px', xs: '14px' }}
                    color="#000000"
                  >
                    {format(new Date(project.launchDate), 'yyyy-MM-dd')}
                  </Typography>
                </Box>
              )}
              <Box align="center">
                <Typography
                  fontSize={{ md: '14px', xs: '12px' }}
                  width="97px"
                  height="23.92px"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: '#4DCC9E',
                    background: 'rgba(77, 204, 158, 0.1)',
                    display: 'block',
                  }}
                >
                  {PROJECT_STATUS[project.status]}
                </Typography>
              </Box>
            </Stack>
            {project?.isAbleToJoin && showJoinButton && (
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={() => {
                  setOpenJoinTooltip(false);
                }}
                open={openJoinTooltip}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Make sure you are a LXDAO buidler and connect your wallet first."
                marginTop={3}
              >
                <Box display="flex" width="180px">
                  <Button
                    width="100%"
                    variant="gradient"
                    onClick={handleBuidlerJoin}
                  >
                    Join this project
                  </Button>
                </Box>
              </Tooltip>
            )}
          </Box>
        </Grid>
        <Grid item md={8} justify="flex-start">
          <Stack spacing={3.5}>
            <Box sx={{ display: 'flex' }} marginBottom={3}>
              {cardData.map((card, i) =>
                cardItem(card, i < cardData.length - 1)
              )}
            </Box>
            <Box
              sx={{
                width: '100%',
                height: '146px',
                padding: '22px 32px',
                background: '#FFFFFF',
                border: '0.5px solid #D0D5DD',
                borderRadius: '6px',
              }}
              marginBottom={3}
            >
              <Typography variant="body1" marginBottom={2}>
                Buidlers
              </Typography>
              <Box justify="space-between" alignItems="center"></Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                height: 'auto',
                padding: 4,
                background: '#FFFFFF',
                border: '0.5px solid #D0D5DD',
                borderRadius: '6px',
              }}
            >
              <Typography variant="body1" marginBottom={2}>
                Forum
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Dialog
        open={openJoinDialog}
        title="Want to join this project?"
        content={
          <Box>
            Please contact with the Project Manager:{' '}
            <Link href={`/buidlers/${projectManagerAddress}`} target="_blank">
              {projectManagerName}
            </Link>
            .
          </Box>
        }
        confirmText="OK"
        handleClose={() => {
          setOpenJoinDialog(false);
        }}
        handleConfirm={() => {
          setOpenJoinDialog(false);
        }}
      />
    </Container>
  );
};

export default SectionProjectDetail;
