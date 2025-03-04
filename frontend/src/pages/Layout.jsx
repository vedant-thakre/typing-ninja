import React from 'react'
import Header from '../components/ui/Header'
import Footer from '../components/ui/Footer'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background: "linear-gradient(165deg, #202020 55%, #2c2c2c 55%)",
        minHeight: "120vh",
      }}
    >
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout
