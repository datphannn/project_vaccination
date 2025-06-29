import Footer from './Footer';
import Header from './Header';
import NavBar from './SideBar';
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