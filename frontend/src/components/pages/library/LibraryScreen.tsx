import { useContext } from 'react';
import Header from './Header';
import Category from './Category';
import Sidebar from './Sidebar';
import SidebarColor from '../../ui/SidebarColor';
import CartSidebar from './CartSidebar';
import { LoginContext } from '../../../context/LoginContext';
import LightBox from '../../ui/LightBox';
import LoginModal from '../../modals/login/LoginModal';
import CreateAccountModal from '../../modals/createaccount/CreateAccountModal';
import OrderModal from '../../modals/orders/OrderModal';
import { LibraryContext } from '../../../context/LibraryContext';

const LibraryScreen = () => {
  const loginContext = useContext(LoginContext);
  const libraryContext = useContext(LibraryContext);

  if (!loginContext || !libraryContext) {
    return;
  }

  const { loginModals } = loginContext;
  const { categories, books } = libraryContext;

  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <SidebarColor />
      <Sidebar />
      <CartSidebar />
      {loginModals.lightbox && <LightBox />}
      {loginModals.login && <LoginModal />}
      {loginModals.create && <CreateAccountModal />}
      {loginModals.order && <OrderModal />}
      <main className="w-full pl-[400px] pr-[50px] pt-[120px] pb-[100px] flex flex-col">
        <section className="w-full flex justify-between flex-wrap max-w-[1000px]">
          {categories && books ? (
            categories.map(category => {
              const { id, name } = category;
              return <Category key={id} name={name} id={id} books={books} />;
            })
          ) : (
            <p>Loading</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default LibraryScreen;
