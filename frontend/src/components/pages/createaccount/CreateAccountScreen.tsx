import CreateAccountForm from './CreateAccountForm';
import GoBackButton from './GoBackButton';

const CreateAccountScreen = () => {
  return (
    <main className="w-full flex justify-center relative">
      <div className="absolute left-4 top-4">
        <GoBackButton />
      </div>
      <div className="flex flex-col gap-10 mt-[200px] w-[600px] items-center">
        <h1 className="text-[#525252] text-4xl font-bold">Create Account</h1>
        <CreateAccountForm />
      </div>
    </main>
  );
};

export default CreateAccountScreen;
