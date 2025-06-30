import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import NavBar from '../../Components/SideBar';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className='flex'>
      <NavBar/>
      <main>{children}</main>
      </div>
      <Footer/>
    </div>
  );
}