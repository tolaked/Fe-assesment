import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SiteList = (props) => {
  const [sites, setSites] = useState([]);
  const [tanks, setTanks] = useState([]);
  const [tankInformation, setTankInformation] = useState({});
  const [view, setView] = useState(false);
  //   const [buttonText,setButton]
  const token = localStorage.getItem("token");
  const fetchSites = useCallback(async () => {
    await Axios.get(
      `https://cors-anywhere.herokuapp.com/https://fcs.concept-nova.com/api/v1/sites/?token=${token}`
    )
      .then(({ data }) => {
        setSites(data.message);
        console.log(data.message);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.message === "Invalid access token") {
          toast.error("invalid token, please log in");
          setTimeout(() => {
            props.history.push("/");
          }, 1500);
        }
      });
  }, []);
  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  const fetchTanks = async (site_id) => {
    await Axios.get(
      `https://cors-anywhere.herokuapp.com/https://fcs.concept-nova.com/api/v1/sites/${site_id}?token=${token}`
    )
      .then(({ data }) => {
        if (data.message.length > 0) {
          setTanks(data.message);
        }

        console.log(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const tankInfo = async (site_id, tank_id) => {
    await Axios.get(
      `https://cors-anywhere.herokuapp.com/https://fcs.concept-nova.com/api/v1/sites/${site_id}/${tank_id}?token=${token}`
    )
      .then(({ data }) => {
        console.log(data);
        setView(!view);
        setTankInformation(data.message);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {sites.length > 0 ? (
        sites.map((site) => (
          <SiteContainer>
            <p>Name: {site.site_name}</p>
            <p>Count: {site.site_tank_count}</p>
            <button onClick={() => fetchTanks(site.site_id)}>View tanks</button>

            {tanks.length > 0 ? (
              <div>
                <h5>Tank List</h5>
                <ul>
                  {tanks.map((tank) => (
                    <li>
                      {tank.tank_name}{" "}
                      <button
                        onClick={() => tankInfo(site.site_id, tank.tank_id)}
                      >
                        {!view ? "view details" : "hide details"}
                      </button>
                    </li>
                  ))}
                </ul>

                {view && Object.keys(tankInformation).length > 0 ? (
                  <>
                    <h5>Tank Details</h5>
                    <p>Capacity: {tankInformation.tank_capacity}</p>
                    <p>Volume: {tankInformation.tank_current_volume}</p>
                  </>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </SiteContainer>
        ))
      ) : (
        <p>Loading Sites...</p>
      )}
    </div>
  );
};

export default SiteList;

const SiteContainer = styled.div`
  width: 450px;
  /* height: 00px; */
  background: grey;
  padding-bottom: 30px;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
`;
