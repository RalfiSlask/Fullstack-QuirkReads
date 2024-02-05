import LogoutButton from './LogoutButton';

const Sidebar = () => {
  return (
    <section className="fixed left-0 w-[350px] bg-secondary h-full pt-24 pb-20 pl-28 flex flex-col gap-20">
      <h1 className="font-bold text-3xl">Library</h1>
      <div className="flex flex-col justify-between h-full w-full">
        <ul className="flex flex-col gap-2 text-xl">
          <li>Home</li>
          <li>Search</li>
          <li>My Orders</li>
        </ul>
        <div className="flex flex-col gap-8 items-start">
          <ul className="flex flex-col gap-2 text-lg">
            <li>About</li>
            <li>Support</li>
            <li>Terms & Condition</li>
          </ul>
          <LogoutButton />
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
