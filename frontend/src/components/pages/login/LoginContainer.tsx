import LoginForm from './LoginForm';

const LoginContainer = () => {
  return (
    <section className="w-[700px] flex flex-col gap-10 items-center rounded-xl py-10 bg-secondary shadow-gray-800 mt-[200px]">
      <h1 className="text-3xl">Login</h1>
      <LoginForm />
      <div className="flex items-center gap-4">
        <p className="text-2xl text-grayText">Not Registered Yet?</p>
        <p className="text-2xl cursor-pointer">Create an account</p>
      </div>
    </section>
  );
};

export default LoginContainer;
