import React, {useState, useCallback} from 'react';
import {TextInput, PrimaryButton} from '../atoms/index';

const SignUp = () => {

  const [username, setUserName] = useState<string>(""),
        [email, setEmail] = useState<string>(""),
        [password, setPassword] = useState<string>(""),
        [confirmPassword, setComfirmPassword] = useState<string>("");

  const inputUserName = useCallback((event) => {
    setUserName(event.target.value)
  }, [setUserName]);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword]);

  const inputComfirmPassword = useCallback((event) => {
    setComfirmPassword(event.target.value)
  }, [setComfirmPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
        rows={1} value={username} type={"text"} onChange={inputUserName}
      />
      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <TextInput
        fullWidth={true} label={"パスワード再入力"} multiline={false} required={true}
        rows={1} value={confirmPassword} type={"password"} onChange={inputComfirmPassword}
      />
      <div className="center">
        <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() => console.log("hi!")}
        />
      </div>
    </div>
  )
}

export default SignUp;
