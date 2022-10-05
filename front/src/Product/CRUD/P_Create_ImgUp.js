// react
import * as React from 'react';
import { styled } from '@mui/material/styles';
// mui
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButtons() {
  return (
    <Stack alignItems="center">
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
          <PhotoCamera />
        </Button>
      </label>
    </Stack>
  );
}