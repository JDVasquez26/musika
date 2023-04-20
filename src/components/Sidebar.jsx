import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // ->https://reactrouter.com/en/main/components/nav-link
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { logo } from '../assets';
import { links } from '../assets/constants';

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => ( // looping over the links from assets
      <NavLink // this will have the name of each "link styled"
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        // handleClick is coming in through props
        onClick={() => handleClick && handleClick()} // if handle click exists(aka it's a mobile phone), only then call it, this can be done by using the &&
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
     {/* @media (min-width: 768px) */}
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#8b3d8a]">
        {/* <img src={logo} alt="logo" className="w-full h-14 object-contain" /> */}
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />
        ) : (
          <RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>

       {/* Actual Menu, dynamic */}
      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl
       from-white/10 to-[#8b3d8a] backdrop-blur-lg z-10 p-6 
       md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};


export default Sidebar;
