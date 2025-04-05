'use client';
import React, { useState } from 'react';
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from '@/assets/assets';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import { useClerk, UserButton } from '@clerk/nextjs';
const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
        {/* Logo & Desktop Search */}
        <div className="flex items-center gap-9 w-full md:w-auto flex-1">
          <Image
            className="cursor-pointer w-14 md:w-16 rounded-md"
            onClick={() => router.push('/')}
            src={assets.logo}
            alt="logo"
          />

          {/* Desktop Search */}
          <div className="hidden md:flex items-center h-12 border border-orange-600 rounded-full overflow-hidden w-full max-w-md">
            <select className="px-4 py-2  border-gray-300 outline-none">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Groceries</option>
            </select>
            <input
              className="flex-grow px-4 outline-none text-sm"
              type="text"
              placeholder="Search for products..."
            />
          </div>
        </div>

        {/* Navigation Links (hidden on mobile) */}
        <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
          <Link href="/" className="hover:text-orange-600 transition">
            হোম
          </Link>
          <Link href="/all-products" className="hover:text-orange-600 transition">
            পণ্যসমূহ
          </Link>
          <Link href="/womens" className="hover:text-orange-600 transition">
            নারীদের পণ্য
          </Link>
          <Link href="/mens" className="hover:text-orange-600 transition">
            পুরুষদের পণ্য
          </Link>
          <Link href="/kids" className="hover:text-orange-600 transition">
            শীশুদের পণ্য
          </Link>
          {isSeller && (
            <button
              onClick={() => router.push('/seller')}
              className="text-xs border px-4 py-1.5 rounded-full hover:bg-orange-600 hover:text-white transition"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Right Side - Desktop */}
        <ul className="hidden md:flex items-center gap-4">
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push('/cart')}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push('/my-orders')}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 hover:text-gray-900 transition"
            >
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          )}
        </ul>

        {/* Right Side - Mobile */}
        <div className="flex items-center md:hidden gap-3">
          {/* Search icon button (mobile) */}

          {isSeller && (
            <button
              onClick={() => router.push('/seller')}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}
          <button onClick={() => setIsSearchOpen(true)}>
            <Image src={assets.search_icon} alt="mobile search icon" className="w-5 h-5" />
          </button>

          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Home"
                  labelIcon={<HomeIcon />}
                  onClick={() => router.push('/')}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Products"
                  labelIcon={<BoxIcon />}
                  onClick={() => router.push('/all-products')}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push('/cart')}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push('/my-orders')}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 hover:text-gray-900 transition"
            >
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85  drop-shadow-lg  px-6 py-6 flex flex-col gap-6"
          onClick={() => setIsSearchOpen(false)}
        >
          {/* Stop propagation for search box itself */}
          <div onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center h-12 border border-orange-600 rounded-full overflow-hidden w-full">
              <select className="px-4 h-full py-2 text-sm border-r outline-none bg-gray-200 text-gray-700 focus:bg-blue-100 focus:ring-2 focus:ring-blue-400">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Groceries</option>
              </select>

              <input
                className="flex-grow px-4 h-full outline-none text-sm"
                type="text"
                placeholder="Search for products..."
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
