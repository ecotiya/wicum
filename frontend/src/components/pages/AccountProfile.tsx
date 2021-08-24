import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { InitialStateModel } from '../../re-ducks/store/types'
import { getAvatarUrl , userAvatarUpdate } from '../../re-ducks/users/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    size: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  }),
);

const AccountProfile = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selector = useSelector((state: InitialStateModel) => state);
  const avatarUrl = getAvatarUrl(selector);

  const uploadImage = useCallback((event) => {
    const reader = new FileReader();
    const files = event.target.files;
    if (files) {
     reader.readAsDataURL(files[0])
     const submitData = new FormData()
     submitData.append("avatar", files[0])

     dispatch(userAvatarUpdate(submitData))
   }
  }, [])

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            alt="ユーザ画像"
            color="primary"
            className={classes.size}
            src={avatarUrl}
          />
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          <label>
            画像を変更する
            <input className="u-display-none" type="file" id="image"
            accept="image/,.png,.jpg,.jpeg" onChange={(event) => uploadImage(event)} />
          </label>
        </Button>
      </CardActions>
    </Card>
  )
};

export default AccountProfile;
