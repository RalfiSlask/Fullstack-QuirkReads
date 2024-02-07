import { useContext } from 'react';
import Header from './Header';
import uuid from 'react-uuid';
import Sidebar from './Sidebar';
import SidebarColor from '../../ui/SidebarColor';
import CartSidebar from './CartSidebar';
import { LoginContext } from '../../../context/LoginContext';
import LightBox from '../../ui/LightBox';
import LoginModal from '../../modals/login/LoginModal';
import CreateAccountModal from '../../modals/createaccount/CreateAccountModal';
import OrderModal from '../../modals/orders/OrderModal';
import { LibraryContext } from '../../../context/LibraryContext';
import BookComponent from './BookComponent';

const LibraryScreen = () => {
  const loginContext = useContext(LoginContext);
  const libraryContext = useContext(LibraryContext);

  if (!loginContext || !libraryContext) {
    return;
  }

  const { loginModals } = loginContext;
  const { books } = libraryContext;

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
        <section className="w-full flex justify-between flex-wrap max-w-[1000px] gap-x-4 gap-y-6">
          {books ? (
            books?.map(book => {
              return <BookComponent key={uuid()} bookInfo={book} />;
            })
          ) : (
            <h2 className="text-xl">Loading</h2>
          )}
          {books?.length === 0 && <h2 className="text-xl">No products in this category, please add!</h2>}
        </section>
      </main>
    </div>
  );
};

export default LibraryScreen;
