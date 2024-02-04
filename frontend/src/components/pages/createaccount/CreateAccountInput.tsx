import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';
import { ICreateAccountFormInputValues } from '../../../utils/types';
import { getStringWithcapitalizedFirstLetter } from '../../../utils/helperfunctions';

type CreateAccountProps = {
  text: string;
  inputKey: keyof ICreateAccountFormInputValues;
  type: string;
};

const CreateAccountInput: React.FC<CreateAccountProps> = ({ type, text, inputKey }) => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { createAccountInputValues, createAccountErrorMessage, handleCreateAccountInputOnChange } = loginContext;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={text}>{getStringWithcapitalizedFirstLetter(text)}</label>
        <p className="text-red-500">{createAccountErrorMessage}</p>
      </div>
      <input
        onInput={e => handleCreateAccountInputOnChange(inputKey, e)}
        type={type}
        spellCheck="false"
        id={text}
        placeholder={text}
        className="input"
        value={createAccountInputValues[inputKey]}
      />
    </div>
  );
};

export default CreateAccountInput;
