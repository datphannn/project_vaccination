import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import NavBar from '../../Components/SideBar';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='w-full h-full'>
      <Header />
      <div className='sm:flex w-full h-full'>
      <NavBar/>
      <main className='w-full h-full'>{children}</main>
      </div>
      <Footer/>
    </div>
  );
}