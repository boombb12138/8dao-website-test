/* eslint-disable no-undef */
import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { removeEmpty } from '@/utils/utility';

import SkillsField from './SkillsField';
import ContactsField from './ContactsField';
import MultiSelect from './MultiSelect';
import TextInput from './TextInput';
import Avatar from './Avatar';

const interestNames = [
  'UI/UX Design',
  'Project Management',
  'Product Management',
  'FrontEnd',
  'FullStack',
  'BackEnd',
  'Operation',
  'DAO',
  'Solidity',
  'Blockchain',
  'Others',
];

function ProfileForm(props) {
  const values = props.values;

  const addProfileHandler = props.addProfileHandler;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar: '',
      name: '',
      address: '',
      description: '',
      skills: [],
      interests: [],
      control: {},
      ...values,
    },
  });

  const onSubmit = (data) => {
    if (addProfileHandler) {
      addProfileHandler(data);
    }
  };

  function SubmitButton() {
    if (JSON.stringify(errors) !== '{}') {
      return (
        <Button variant="contained" size="large" disabled={true}>
          Add Member
        </Button>
      );
    }

    if (props.updating) {
      return (
        <Button variant="contained" size="large" disabled={true}>
          Adding Member...
        </Button>
      );
    }

    return (
      <Button variant="contained" size="large" onClick={handleSubmit(onSubmit)}>
        Add Member
      </Button>
    );
  }

  //dissey to do change acatar
  return (
    <Box>
      <Box marginBottom={4}>
        <Controller
          name={'avatar'}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <Avatar
                error={errors.avatar}
                width="150px"
                value={value}
                onChange={onChange}
              ></Avatar>
            );
          }}
        />
        {errors.avatar && (
          <Typography
            fontSize="0.75rem"
            color="#d32f2f"
            marginTop={2}
            marginLeft={3}
          >
            Avatar is required
          </Typography>
        )}
      </Box>
      <Box marginBottom={2.5}>
        <Controller
          name={'name'}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                required
                fullWidth
                label="Name"
                placeholder="Nick name"
                onChange={onChange}
                value={value}
                error={!!errors.name}
                helperText={errors.name ? 'Name is required' : ''}
              />
            );
          }}
        />
      </Box>

      <Box marginBottom={2.5}>
        <Controller
          name={'Address'}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                required
                multiline
                rows={1}
                placeholder="0x.."
                fullWidth
                label="Address"
                onChange={onChange}
                value={value}
                error={!!errors.description}
                helperText={errors.description ? 'Address is required' : ''}
              />
            );
          }}
        />
      </Box>

      <Box marginBottom={2.5}>
        <Controller
          name={'description'}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                required
                multiline
                rows={2}
                placeholder="Self introduction"
                fullWidth
                label="Description"
                onChange={onChange}
                value={value}
                error={!!errors.description}
                helperText={errors.description ? 'Description is required' : ''}
              />
            );
          }}
        />
      </Box>
      <Box>
        <Typography
          marginBottom={2}
          sx={{
            fontSize: '20px',
          }}
        >
          Skills
        </Typography>
        <Controller
          name={'skills'}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return <SkillsField value={value || []} onChange={onChange} />;
          }}
        />
        {errors.skills && (
          <Typography
            marginTop={-2}
            fontSize="0.75rem"
            color="#d32f2f"
            marginLeft={2}
          >
            Skills are required
          </Typography>
        )}
      </Box>
      <Box marginBottom={2.5}>
        <Typography
          marginBottom={2}
          sx={{
            fontSize: '20px',
          }}
        >
          Interests
        </Typography>
        <Controller
          name={'interests'}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <MultiSelect
                value={value || []}
                onChange={(values) => {
                  let lastValue = values.pop();
                  if (lastValue === 'Others') {
                    lastValue = window.prompt('Please input the interest');
                  }
                  onChange([...values, lastValue]);
                }}
                dropdown={interestNames}
              />
            );
          }}
        />
        {errors.interests && (
          <Typography
            fontSize="0.75rem"
            color="#d32f2f"
            marginTop={1}
            marginLeft={2}
          >
            Interests are required
          </Typography>
        )}
      </Box>
      <Box>
        <Typography
          marginBottom={2}
          sx={{
            fontSize: '20px',
          }}
        >
          Contacts{' '}
          <span
            style={{
              fontSize: 14,
              display: 'inline',
            }}
          >
            (the following contacts will be publicly available)
          </span>
        </Typography>
        <Controller
          name={'contacts'}
          control={control}
          rules={{
            validate: (value) => {
              return JSON.stringify(removeEmpty(value)) !== '{}';
            },
          }}
          render={({ field: { onChange, value } }) => {
            return <ContactsField value={value || {}} onChange={onChange} />;
          }}
        />
        {errors.contacts && (
          <Typography
            fontSize="0.75rem"
            color="#d32f2f"
            marginTop={1}
            marginLeft={2}
          >
            At least one contacts are required
          </Typography>
        )}
      </Box>
      {JSON.stringify(errors) !== '{}' && (
        <Box marginTop={2}>
          <Alert severity="error">
            Found errors on the form, please check.
          </Alert>
        </Box>
      )}
      <Box marginTop={2}>
        <SubmitButton />
      </Box>
    </Box>
  );
}

export default ProfileForm;
