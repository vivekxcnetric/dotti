import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../Redux/Auth/Action";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AccordionWrapper = styled.div`
  width: 100%;
  z-index: 20;
`;

const AccordionItem = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AccordionButton = styled.button`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #f9f9f9;
  border: none;
  padding: 15px 20px;
  text-align: left;
  cursor: pointer;
  outline: none;
  border-radius: 5px 5px 0 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #eaeaea;
  }

  div {
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
`;

const AccordionContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  animation: ${fadeIn} 0.5s ease;
  border-top: 1px solid #f0f0f0;
  border-radius: 0 0 5px 5px;
`;

const NestedLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #333;
  padding: 10px;
  margin-left: 30px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const NestedAccordionContent = styled.div``;

const FrameIcon = styled.img`
  width: 25px;
  flex: 1;
  position: relative;
  max-height: 100%;
`;
const Svg = styled.div`
  width: 25px;
  // border-radius: 10px;
  height: 20px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const CustomAccordion = ({ drawer, setDrawer }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [openIndex1, setOpenIndex1] = useState(null);
  const [data, setData] = useState({ extraData: [] });
  const auth = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://49.206.253.146:2109/childCategories?categoryId=3074457345616679204"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const toggleAccordion1 = (index1) => {
    setOpenIndex1(openIndex1 === index1 ? null : index1);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <AccordionWrapper>
        <AccordionItem>
          <AccordionButton>
            <Link onClick={() => setDrawer(!drawer)} to="/">
              <div style={{ fontSize: "14px", color: "#656060" }}>Home</div>{" "}
            </Link>
          </AccordionButton>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <div
              style={{ display: "flex", fontSize: "14px", color: "#656060" }}
            >
              <FaSearch style={{ marginRight: "10px" }} />
              Search
            </div>
          </AccordionButton>
        </AccordionItem>
        {data.extraData.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton onClick={() => toggleAccordion(index)}>
              <div>{item.name}</div>
              <div>{openIndex === index ? "-" : "+"}</div>
            </AccordionButton>
            <AccordionContent isOpen={openIndex === index}>
              <NestedAccordionContent>
                {item.children?.map((nestedItem, nestedIndex) => (
                  <NestedLink
                    onClick={() => setDrawer(!drawer)}
                    key={nestedIndex}
                  >
                    <Link to={`/${nestedItem.name}`}> {nestedItem.name}</Link>
                  </NestedLink>
                ))}
              </NestedAccordionContent>
            </AccordionContent>
          </AccordionItem>
        ))}

        {/* Static accordian start here */}

        <div style={{ borderBottom: "2px solid black" }}></div>

        {!auth && (
          <AccordionItem>
            <AccordionButton onClick={() => toggleAccordion1(0)}>
              <div>Sign IN</div> <div>{openIndex1 === 0 ? "-" : "+"}</div>
            </AccordionButton>
            <AccordionContent isOpen={openIndex1 === 0}>
              <NestedAccordionContent>
                <NestedLink onClick={() => setDrawer(!drawer)} to="/sign-in">
                  Sign In
                </NestedLink>
                <NestedLink onClick={() => setDrawer(!drawer)} to="/sign-up">
                  Create Account
                </NestedLink>
                <NestedLink
                  onClick={() => setDrawer(!drawer)}
                  to="/account-help"
                >
                  Account Help
                </NestedLink>
              </NestedAccordionContent>
            </AccordionContent>
          </AccordionItem>
        )}
        {auth && (
          <AccordionItem>
            <AccordionButton onClick={() => toggleAccordion1(5)}>
              <div>
                <a href="">MyAccount</a>
              </div>{" "}
              <div>{openIndex1 === 5 ? "-" : "+"}</div>
            </AccordionButton>
            <AccordionContent isOpen={openIndex1 === 5}>
              <NestedAccordionContent>
                <NestedLink onClick={() => setDrawer(!drawer)} to="my-account">
                  My Account
                </NestedLink>
                <NestedLink onClick={() => setDrawer(!drawer)}>
                  Primary Address
                </NestedLink>
                <NestedLink onClick={() => setDrawer(!drawer)}>
                  Address Book
                </NestedLink>
                <NestedLink onClick={() => setDrawer(!drawer)}>
                  Change Password
                </NestedLink>
                <NestedLink onClick={() => setDrawer(!drawer)}>
                  Subscriptions
                </NestedLink>
                <NestedLink onClick={() => setDrawer(!drawer)}>
                  Saved Payments{" "}
                </NestedLink>
                <NestedLink onClick={() => setDrawer(!drawer)}>
                  My Orders{" "}
                </NestedLink>
                <NestedLink onClick={() => setDrawer(!drawer)}>
                  Account Help{" "}
                </NestedLink>
                <NestedLink
                  onClick={() => {
                    return setDrawer(!drawer), dispatch(logout());
                  }}
                >
                  Sign Out{" "}
                </NestedLink>
              </NestedAccordionContent>
            </AccordionContent>
          </AccordionItem>
        )}
        <AccordionItem>
          <AccordionButton onClick={() => toggleAccordion1(1)}>
            <div>
              <a href="">Stores</a>
            </div>{" "}
            <div>{openIndex1 === 1 ? "-" : "+"}</div>
          </AccordionButton>
          <AccordionContent isOpen={openIndex1 === 1}>
            <NestedAccordionContent>
              <NestedLink href="#">Find A Store</NestedLink>
            </NestedAccordionContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={() => toggleAccordion1(2)}>
            <div>
              <a href="">About Us</a>
            </div>{" "}
            <div>{openIndex1 === 2 ? "-" : "+"}</div>
          </AccordionButton>
          <AccordionContent isOpen={openIndex1 === 2}>
            <NestedAccordionContent>
              <NestedLink href="#">About Portmans</NestedLink>
              <NestedLink href="#">Careers</NestedLink>
              <NestedLink href="#">Terms & Conditions</NestedLink>
              <NestedLink href="#">Better Practices</NestedLink>
            </NestedAccordionContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={() => toggleAccordion1(3)}>
            <div>
              <a href="">Help & Information</a>
            </div>{" "}
            <div>{openIndex1 === 3 ? "-" : "+"}</div>
          </AccordionButton>
          <AccordionContent isOpen={openIndex1 === 3}>
            <NestedAccordionContent>
              <NestedLink href="#">Delivery Information</NestedLink>
              <NestedLink href="#">Track Order</NestedLink>
              <NestedLink href="#">Returns & Exchanges</NestedLink>
              <NestedLink href="#">Size Guide</NestedLink>
              <NestedLink href="#">Help & Contact Us</NestedLink>
            </NestedAccordionContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={() => toggleAccordion1(4)}>
            <div>
              <a href="">Gift Cards</a>
            </div>{" "}
            <div>{openIndex1 === 4 ? "-" : "+"}</div>
          </AccordionButton>
          <AccordionContent isOpen={openIndex1 === 4}>
            <NestedAccordionContent>
              <NestedLink href="#">Shop Gift Cards</NestedLink>
              <NestedLink href="#">Balance Enquiry</NestedLink>
              <NestedLink href="#">Gift Card Help</NestedLink>
            </NestedAccordionContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <div style={{ display: "flex" }}>
              <div>
                <Svg>
                  <FrameIcon alt="" src="/frame.svg" />
                </Svg>
              </div>

              <div style={{ fontWeight: "200" }}>
                Delivery Country{" "}
                <a style={{ textDecoration: "underline" }} href="">
                  Australia
                </a>
              </div>
            </div>
          </AccordionButton>
        </AccordionItem>
        {/* Static accordian end here */}
      </AccordionWrapper>
    </div>
  );
};

export default CustomAccordion;
