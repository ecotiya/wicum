import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { InitialStateModel } from '../../re-ducks/store/types'
import { isSignedInState, listenAuthHeaderLogoClick } from '../../re-ducks/users/index';
import logo from '../../assets/img/icon/logo.png';
import {HeaderMenus} from './index';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuBar: {
      backgroundColor: "#58CE91",
      color: "#444"
    },
    toolBar: {
      margin: '0 auto',
      width: '100%'
    },
    iconButtons: {
      margin : '0 0 0 auto'
    }
  }),
);

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: InitialStateModel) => state);
  const isSignedIn = isSignedInState(selector);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img
            src={logo} alt="Wicum Logo" width="128px"
            onClick={() => dispatch(listenAuthHeaderLogoClick())}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus/>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
