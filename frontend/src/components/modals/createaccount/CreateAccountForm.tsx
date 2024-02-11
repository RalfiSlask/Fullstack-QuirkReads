import CreateResetButton from './CreateResetButton';
import SubmitButton from '../../shared/SubmitButton';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../../context/LoginContext';
import CreateAccountInput from './CreateAccountInput';
import { ICreateAccountFormInputValues } from '../../../utils/types';

const CreateAccountForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState({ email: false, name: false });
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const {
    setCreateAccountErrorMessage,
    createAccountInputValues,
    handleCreateAccountReset,
    createAccountErrorMessage,
  } = loginContext;

  const inputs = [
    { id: 1, type: 'text', text: 'name', inputKey: 'name' as keyof ICreateAccountFormInputValues },
    { id: 2, type: 'text', text: 'email', inputKey: 'email' as keyof ICreateAccountFormInputValues },
    { id: 3, type: 'password', text: 'password', inputKey: 'password' as keyof ICreateAccountFormInputValues },
  ];

  const postInputValues = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createAccountInputValues),
      });
      if (!response.ok) {
        setCreateAccountErrorMessage('user already exists');
        return;
      }
      const jsonData = await response.json();
      if (jsonData) {
        handleCreateAccountReset();
        setCreateAccountErrorMessage('');
        setIsFormValid({ email: false, name: false });
        alert('succesfully created account');
      }
    } catch (err) {
      console.log(err, 'could not post input values');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = createAccountInputValues;
    if (email.trim().length <= 0 || password.trim().length <= 0) {
      setCreateAccountErrorMessage('you have to fill in inputs');
    } else if (!isFormValid.email || !isFormValid.name) {
      setFormSubmitted(true);
    } else {
      console.log('hej goes through');
      setFormSubmitted(true);
      setCreateAccountErrorMessage('');
      await postInputValues();
    }
  };

  return (
    <form
      onSubmit={e => {
        handleSubmit(e);
      }}
      id="formInput"
      className="flex flex-col gap-4 w-[400px] items-center"
    >
      <p className="text-red-500 text-lg">{createAccountErrorMessage}</p>
      {inputs.map(input => {
        const { id, type, text, inputKey } = input;
        return (
          <CreateAccountInput
            key={id}
            type={type}
            text={text}
            inputKey={inputKey}
            formSubmitted={formSubmitted}
            setIsFormValid={setIsFormValid}
            setFormSubmitted={setFormSubmitted}
          />
        );
      })}

      <div className="flex justify-center gap-4">
        <SubmitButton title={'Create Account'} />
        <CreateResetButton />
      </div>
    </form>
  );
};

export default CreateAccountForm;
