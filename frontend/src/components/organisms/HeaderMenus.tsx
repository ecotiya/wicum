import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {push} from "connected-react-router";
import {
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@material-ui/core';
import {
  AccountCircle,
  ExitToApp
} from '@material-ui/icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { InitialStateModel } from '../../re-ducks/store/types'
import { getAvatarUrl, signOut } from '../../re-ducks/users/index';
import { ReactRoutesPath } from '../../constants/commonConstants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    size: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  }),
);

const HeaderMenus = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const selector = useSelector((state: InitialStateModel) => state);
  const avatarUrl = getAvatarUrl(selector);

  const transition = useCallback((path) => {
    dispatch(push(path))
    setAnchorEl(null);
  }, []);

  return (
    <>
      <div>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar
            className={classes.size}
            src={avatarUrl}
          />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => transition(ReactRoutesPath.ACCOUNT)}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="プロフィール" />
          </MenuItem>
          <MenuItem onClick={() => dispatch(signOut())}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="サインアウト" />
          </MenuItem>
        </Menu>
      </div>
    </>
  )
};

export default HeaderMenus;
