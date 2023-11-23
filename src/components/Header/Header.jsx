import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { MdCancel, MdMenu } from "react-icons/md";
import { LogoutBtn, Container, Logo } from "../index";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const { pathName } = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "My Post",
      slug: "/my-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow sticky top-0 z-20 flex items-center h-20 bg-gray-400">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link>
              <Logo width="90px" />
            </Link>
          </div>
          <div onClick={handleMenu} className="ml-auto block lg:hidden">
            {isMenuOpen ? <MdCancel size={26} /> : <MdMenu size={26} />}
          </div>
          <ul
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } lg:flex max-lg:w-full lg:flex-row flex-col items-center ml-auto py-2 lg:py-0 absolute top-20 right-1 lg:static bg-gray-400 shadow-lg rounded lg:shadow-none lg:rounded-none`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="mr-1">
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setIsMenuOpen(false);
                    }}
                    className={`inline-block font-semibold px-6 py-2 duration-300 ${
                      pathName === item.slug ? "bg-[#9ED5CB] text-black" : ""
                    } hover:bg-[#9ED5CB] hover:text-black rounded-full`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
