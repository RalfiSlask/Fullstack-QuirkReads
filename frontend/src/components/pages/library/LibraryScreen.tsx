import { useEffect, useState } from 'react';
import Header from './Header';
import { IBookType, ICategoryType } from '../../../utils/types';
import Category from './Category';
import Sidebar from './Sidebar';
import SidebarColor from './SidebarColor';

const LibraryScreen = () => {
  const [books, setBooks] = useState<IBookType[]>();
  const [categories, setCategories] = useState<ICategoryType[]>();

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categories');
      if (!response.ok) {
        return;
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setCategories(jsonData);
    } catch (err) {
      console.log('could not fetch categories');
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) {
        return;
      }

      const jsonData = await response.json();
      setBooks(jsonData);
    } catch (err) {
      console.log('could not fetch products');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategories();
        await fetchBooks();
      } catch (err) {
        console.log(err, 'error fetching data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <SidebarColor />
      <Sidebar />
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
