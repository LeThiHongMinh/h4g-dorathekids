import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

const navigation = [
  { label: 'Product', href: '/product' },
  { label: 'My Account', href: '/account' },
  { label: 'Request', href: '/request' },
];

const Nav = () => {
  const location = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const handleClick = () => {
    if (openNavigation) {
      setOpenNavigation(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-red-50 z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 py-2 space-x-9">
        <div className="flex items-center space-x-9">
          <p className="font-palanquin text-2xl font-bold z-10">
            Web Market - Voucher for you!
          </p>
        </div>
        <nav
          className={`${
            openNavigation ? 'flex' : 'hidden'
          } fixed top-[3rem] left-0 right-0 bottom-9 bg-n-8 lg:static lg:flex lg:bg-transparent`}
        >
          <div className="relative text-black z-10 flex flex-col lg:space-x-10 lg:flex-row lg:space-y-10 items-center m-auto lg:space-y-0">
            {navigation.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={handleClick}
                className={`lg:font-semibold m-auto block shadow-2xl relative font-palanquin font-bold lg:flex lg:mx-auto lg:bg-n-8 leading-normal text-xl transition-colors ${
                  location.pathname === item.href
                    ? 'z-2 lg:text-n-1'
                    : 'lg:text-n-1/50'
                } lg:leading-5 lg:hover:text-n-1 xl:px-8`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
