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
  const [img, setImg] = useState({data: "", name: ""})

  const dispatch = useDispatch();
  const uploadImage = useCallback((event) => {
    const reader = new FileReader();
    const files = event.target.files;
    if (files) {
     reader.onload = () => {
       setImg({
         data: reader.result as string,
         name: files[0] ? files[0].name : "unknownfile"
       })
     }
     reader.readAsDataURL(files[0])
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
            accept="image/*" onChange={(event) => uploadImage(event)} />
          </label>
        </Button>
      </CardActions>
    </Card>
  )
};

export default AccountProfile;
