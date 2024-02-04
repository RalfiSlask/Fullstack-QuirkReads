import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';
import { ILoginFormInputValues } from '../../../utils/types';
import { getStringWithcapitalizedFirstLetter } from '../../../utils/helperfunctions';

type CreateAccountProps = {
  text: string;
  inputKey: keyof ILoginFormInputValues;
  type: string;
};

const LoginInput: React.FC<CreateAccountProps> = ({ type, text, inputKey }) => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { loginInputValues, loginErrorMessage, handleLoginInputOnChange } = loginContext;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={text}>{getStringWithcapitalizedFirstLetter(text)}</label>
        <p className="text-red-500">{loginErrorMessage}</p>
      </div>
      <input
        onInput={e => handleLoginInputOnChange(inputKey, e)}
        type={type}
        spellCheck="false"
        id={text}
        placeholder={text}
        className="input"
        value={loginInputValues[inputKey]}
      />
    </div>
  );
};

export default LoginInput;
