import React, {useState, useCallback} from 'react';
import {TextInput, PrimaryButton, Links} from '../atoms/index';
import {signIn} from '../../re-ducks/users/index';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import {ReactRoutesPath} from '../../constants/commonConstants';

const SignIn = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>(""),
        [password, setPassword] = useState<string>("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"サインイン"}
          onClick={() => dispatch(signIn(email, password))}
        />
        <div className="module-spacer--extra-small" />
        <Links
          label={"アカウントをお持ちでない方はこちら"}
          onClick={() => dispatch(push(ReactRoutesPath.SIGN_UP))}
        />
      </div>
    </div>
  )
}

export default SignIn;
