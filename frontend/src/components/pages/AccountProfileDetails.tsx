import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";
import { getUserName, getEmail, userInfoUpdate } from '../../re-ducks/users/index';
import { InitialStateModel } from '../../re-ducks/store/types'

const useStyles = makeStyles({
  "button": {
    backgroundColor: "#58CE91",
    color: "#000",
    fontSize: 16,
    height: 48,
    marginButton: 16,
  }
})

const AccountProfileDetails = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selector = useSelector((state: InitialStateModel) => state);
  const storeUserName = getUserName(selector);
  const storeEmail = getEmail(selector);

  const [username, setUserName] = useState<string>(""),
        [email, setEmail] = useState<string>("");

  const inputUserName = useCallback((event) => {
    setUserName(event.target.value)
  }, [setUserName]);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);

  useEffect(() => {
    setUserName(storeUserName);
    setEmail(storeEmail);
  },[storeUserName, storeEmail]);

  return (
    <form
      autoComplete="off"
      noValidate
    >
      <Card>
        <CardHeader
          subheader="ユーザ情報を変更できます。"
          title="プロフィール"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="ユーザー名"
                name="username"
                onChange={inputUserName}
                required
                value={username}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="メールアドレス"
                name="email"
                onChange={inputEmail}
                required
                value={email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            className={classes.button}
            variant="contained"
            onClick={() => dispatch(userInfoUpdate(username, email))}
          >
            保存
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
