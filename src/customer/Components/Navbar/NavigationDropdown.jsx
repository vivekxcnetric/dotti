import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  gap: 30px;
  letter-spacing: 0.5px;
  font-size: 15px;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const MainContainer = styled.div`
  width: 100%;
  margin: auto;
  border-bottom: 1px solid #7c7c7c;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;

  & > div {
    padding: 10px;
  }

  & ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  & ul li {
    text-decoration: none;
    margin-bottom: 5px;
  }
`;

const DropDown = styled.div`
  background-color: white;
  position: absolute;
  padding: 5px 100px;
  box-sizing: border-box;
  width: 100%;
  height: 86vh;
  left: 0;
  display: flex;
  justify-content: space-between;
  z-index: 100;
  .imagecontainer {
    width: 50%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    img {
      width: 60%;
      height: 60%;
      object-fit: cover;
    }
  }
`;

const url =
  "http://106.51.242.196:2109/childCategories?categoryId=3074457345616679205";

const NavigationDropdown = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <MainContainer>
      <Container>
        {data.extraData?.map((el, index) => (
          <div
            onMouseEnter={() =>
              (document.getElementById(`${el.name}`).style.display = "block")
            }
            onMouseLeave={() =>
              (document.getElementById(`${el.name}`).style.display = "none")
            }
            key={index}
          >
            <a
              href=""
              style={{
                textTransform: "uppercase",
                textDecoration: "none",
                color: el.name.toLowerCase() === "sale" ? "red" : "#333",

                fontWeight: "600",
              }}
            >
              {el.name}
            </a>
            <DropDownHover childrenData={el} />
          </div>
        ))}
      </Container>
    </MainContainer>
  );
};

export default NavigationDropdown;

const DropDownHover = ({ childrenData }) => {
  return (
    <DropDown style={{ display: "none" }} id={childrenData.name}>
      <div
        style={{
          display: "flex",
          padding: "50px",
          justifyContent: "center",
        }}
      >
        <ListItem
          style={{
            display: `${childrenData?.image?.[0] ? "block" : "flex"}`,
            gap: `${childrenData?.image?.[0] ? "0px" : "100px"}`,
          }}
        >
          {childrenData?.children?.map((el, index) => (
            <div key={index}>
              <ul>
                <li style={{ cursor: "pointer", fontWeight: "600" }}>
                  {el.name}
                </li>
                <ul>
                  {el.children?.map((child, i) => (
                    <li style={{ cursor: "pointer" }} key={i}>
                      {child.name}
                    </li>
                  ))}
                </ul>
              </ul>
            </div>
          ))}
        </ListItem>
        {childrenData?.image && (
          <div
            style={{
              border: "1px solid #7c7c7c",
              margin: "50px",
              marginLeft: "150px",
            }}
          ></div>
        )}

        {childrenData?.image && (
          <div className="imagecontainer" style={{ cursor: "pointer" }}>
            <img
              src={childrenData?.image?.[0]}
              alt=""
              style={{ height: "300px", width: "200px" }}
            />
            <h5>{childrenData?.name}</h5>
          </div>
        )}
      </div>
    </DropDown>
  );
};
