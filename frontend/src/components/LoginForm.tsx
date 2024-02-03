import ResetButton from './ResetButton';
import SubmitButton from './SubmitButton';

const LoginForm = () => {
  return (
    <>
      <form className="flex flex-col gap-4 w-[300px]">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input type="text" spellCheck="false" id="email" placeholder="Email" className=" input" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input type="password" spellCheck="false" id="password" placeholder="Password" className="input" />
        </div>
        <div className="flex justify-center gap-4">
          <SubmitButton />
          <ResetButton />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
