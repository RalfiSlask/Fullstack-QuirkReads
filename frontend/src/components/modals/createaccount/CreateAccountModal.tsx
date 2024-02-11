import CreateAccountForm from './CreateAccountForm';
import GoBackButton from './GoBackButton';

const CreateAccountModal = () => {
  return (
    <section className="z-50 fixed left-[50%] -translate-x-1/2 w-[700px] pt-[100px] pb-10 rounded-xl flex justify-center items-center bg-secondary shadow-soft1 mt-[200px]">
      <div className="absolute left-4 top-4">
        <GoBackButton />
      </div>
      <div className="flex flex-col gap-10 w-[600px] items-center">
        <h1 className="text-[#525252] text-4xl font-bold">Create Account</h1>
        <CreateAccountForm />
      </div>
    </section>
  );
};

export default CreateAccountModal;
