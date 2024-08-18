import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OpenHumburger from "./OpenHumburger";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/Auth/Action";
import logo from "../../../logos/111.svg";
import { IoCartOutline } from "react-icons/io5";
import { Avatar } from "@mui/material";

import { logoutCustomer, getCustomerInfo } from "../../../action/Customer";

// const DROPDOWN_LINKS = [
//   { text: 'Sign In', href: '/sign-in' },
//   { text: 'My Account', href: '/my-account' },
//   { text: 'Create Account', href: '/sign-up' },
//   { text: 'Account Help', href: '#' }
// //  { text: 'Sign Out', href: '' }
// ];

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth.auth);
  const { auth, cart, newUser, cartItems } = useSelector((store) => store);

  const navigate = useNavigate();
  const DROPDOWN_LINKS = [
    { text: "Sign In", href: "/sign-in" },
    // { text: 'My Account', href: '/my-account' },
    { text: "Create Account", href: "/sign-up" },
    { text: "Account Help", href: "#" },
    //  { text: 'Sign Out', href: '' }
  ];
  const DROPDOWN_LINKS_auth = [
    // { text: 'Sign In', href: '/sign-in' },
    { text: "My Profile", href: "/my-account" },
    // { text: 'Create Account', href: '/sign-up' },
    { text: "My Orders", href: "/account/order" },
    { text: "Sign Out", href: "#" },
  ];
  const data = newUser?.newUser?.userId ? DROPDOWN_LINKS_auth : DROPDOWN_LINKS;

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // if (jwt) {
    getCustomerInfo().then((res) => {
      setUserInfo(res);
    });
    // }
  }, []);

  const handleDropdownItemClick = (option) => {
    if (option.text == "Sign Out") {
      dispatch(logoutCustomer());
    } else {
      navigate(option.href);
    }
    setSelectedOption(option);
    setIsDropdownVisible(false); // Close the dropdown after selection
  };

  return (
    <ContainerRoot>
      <HamburgerIcon>
        <div>
          {isOpen ? (
            <Cross onClick={toggleMenu}>X</Cross>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div onClick={toggleMenu}>
                <Line />
                <Line />
                <Line />
              </div>
              <SearchModel onClick={toggleDropdown}>
                <img
                  alt=""
                  src="/icon--search.svg"
                  style={{ height: "20px", width: "20px" }}
                />
              </SearchModel>
            </div>
          )}
        </div>
      </HamburgerIcon>

      {showSearchInput ? (
        <SearchContainer>
          <input
            type="text"
            placeholder="Search"
            style={{
              border: "none",
              padding: "5px",
              margin: "10px",
              borderBottom: "1px solid black",
            }}
          />
          <div>
            <img
              alt=""
              src="/icon--search.svg"
              style={{ height: "20px", width: "20px", cursor: "pointer" }}
              onClick={() => setShowSearchInput(false)}
            />
          </div>
        </SearchContainer>
      ) : (
        <SearchButton
          onClick={() => {
            navigate("/search");
            setShowSearchInput(true);
          }}
        >
          <img
            alt=""
            src="/icon--search.svg"
            style={{ height: "20px", width: "20px" }}
          />
          <SearchButtonText>Search</SearchButtonText>
        </SearchButton>
      )}
      <LogoContainer>
        <Link to="/">
          <img
            alt="dotti"
            src={logo}
            style={{ height: "38px", width: "84.1562px" }}
          />
        </Link>
      </LogoContainer>
      <SvgContainer>
        {newUser?.newUser?.userId ? (
          <Avatar
            className="cursor-pointer hover:bg-gray-900"
            // onClick={handleUserClick}
            onMouseOver={toggleDropdown}
            onClick={toggleDropdown}
            sx={{
              bgcolor: "gray.900",
              color: "white",
              width: 32,
              height: 32,
              "@media screen and (max-width: 1024px)": {
                display: "none",
              },
            }}
          >
            {
              userInfo?.firstName?.charAt(0)
              // +
              //   userInfo?.lastName?.charAt(0)
            }
          </Avatar>
        ) : (
          <PersonImg
            alt="User"
            src="/icon--account.svg"
            onMouseOver={toggleDropdown}
            onClick={toggleDropdown}
          />
        )}

        {isDropdownVisible && (
          <DropdownMenu>
            {data.map((link, index) => (
              <DropdownItem key={index}>
                <Link
                  to={link.href}
                  onClick={() => handleDropdownItemClick(link)}
                >
                  {link.text}
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
        <img alt="fevorite" src="/icon--wishlist.svg" />
        <IoCartOutline
          className="h-7 w-7 flex-shrink-0 text-white group-hover:text-gray-500"
          aria-hidden="true"
          style={{ color: "black" }}
          onClick={() => navigate("/cart")}
        />
        {/* Wrapped the count in a div */}
        <div className="absolute -top-1 -right-2 bg-black rounded-full w-5 h-5 flex items-center justify-center">
          <span className="text-white text-s ">
            {newUser?.newUser?.userId &&
            cartItems?.cartItems?.orderItem?.length > 0
              ? cartItems?.cartItems?.orderItem?.length
              : 0}
          </span>
        </div>
      </SvgContainer>

      <OpenHumburger drawer={isOpen} setDrawer={setIsOpen} />
    </ContainerRoot>
  );
};

export default SearchBar;

const ContainerRoot = styled.header`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px 8px 0px;
  box-sizing: border-box;
  top: 0;
  z-index: 99;
  // position: sticky;
  max-width: 100%;
  text-align: left;
  font-size: 14px;
  color: #333333;
  font-family: "Inter Bold", sans-serif;
`;

const SearchButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 25px;
  margin-left: 10px;
  &:hover {
    opacity: 0.8; /* Reduce opacity on hover */
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const SearchButtonText = styled.p`
  margin-left: 5px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  &:hover {
    opacity: 0.8; /* Reduce opacity on hover */
  }
`;

// const SvgContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-end;
//   gap: 50px;
//   margin-right: 20px;
// `;

// const PersonImg = styled.img`
//   width: 25px;
//   height: 25px;
//   cursor: pointer;
//   @media screen and (max-width: 1024px) {
//     display: none;
//   }
// `;

const HamburgerIcon = styled.div`
  display: none;

  @media screen and (max-width: 1024px) {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
  }
`;
const SearchModel = styled.div`
  display: none;
  @media screen and (max-width: 1024px) {
    display: block;
  }
`;
const Line = styled.div`
  width: 20px;
  height: 2px;
  background-color: #333;
  margin: 4px 0;
`;

const Cross = styled.div`
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 10px;
  padding: 10px;
  &:hover {
    opacity: 0.8; /* Reduce opacity on hover */
  }
  @media screen and (max-width: 1024px) {
    display: none;
    margin-bottom: 10px;
  }
`;

// const DropdownMenu = styled.div`
//   position: absolute;
//   right: 5%;
//   top: 50%;
//   background-color: #fff;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   @media screen and (max-width: 1024px) {
//     display: none;
//   }
// `;

// const DropdownItem = styled.a`
//   display: block;
//   padding: 20px;
//   color: #333;
//   text-decoration: none;
//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;
const DropdownMenu = styled.div`
  position: absolute;
  right: 0; /* Adjust as needed */
  top: calc(100% + 5px); /* Position below the account icon */
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999; /* Ensure it's above other content */
  min-width: 150px; /* Set minimum width as needed */
`;

const DropdownItem = styled.a`
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SvgContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 50px;
  margin-right: 20px;
  position: relative; /* Set position to relative */
  &:hover {
    opacity: 0.8; /* Reduce opacity on hover */
  }
`;

const PersonImg = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
