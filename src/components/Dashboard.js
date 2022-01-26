import React, { useState, useEffect } from "react";
import { Header } from "./Partials/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  VIEW_REQUESTS,
  IMG_URL,
  AUTHENTICATE_REQUEST,
} from "./Partials/Constent";

export const Dashboard = () => {
  const [requests, setRequests] = useState(null);

  /**
   *  Get all requests
   */
  const getRequest = () => {
    axios
      .get(VIEW_REQUESTS)
      .then((result) => {
        console.log(result);
        setRequests(result.data.data);
      })
      .catch((err) => console.log(err));
  };
  /**
   *
   * Reject or Authenticate request
   */
  const changeStatus = (item, status, index) => {
    axios
      .put(AUTHENTICATE_REQUEST, { id: item._id, status: status })
      .then((res) => {
        if (status == 2) {
          requests.splice(index, 1);
          setRequests(requests);
        }
        getRequest();
        console.log("updated");
      })
      .catch((err) => console.log(err));
  };
  /**
   *  call getRequest at once
   */
  useEffect(() => {
    getRequest();
  }, []);

  /**
   * render dom using jsx
   */
  return (
    <>
      <Header />

      <div className="main-container">
        <div className="main-heading">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <h1>Manage Requests</h1>
            </div>
          </div>
        </div>

        <div className="customer-page">
          <table className=" table table-striped table-responsive">
            <thead>
              <tr>
                <th>Title</th>
                <th>Request For</th>
                <th>Social thumbnail</th>
                <th>Current Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests != null &&
                requests.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item.requestfor}</td>

                      <td>
                        <img
                          src={IMG_URL + item.thumbnail}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </td>

                      <td>
                        {item.status && item.status == 0 ? (
                          <span className="badge badge-danger">
                            Unauthorised
                          </span>
                        ) : (
                          <span className="badge badge-success ">
                            Authorised
                          </span>
                        )}
                      </td>
                      <td>
                        <Link
                          to="#"
                          className="badge badge-danger"
                          onClick={() => changeStatus(item, 2, index)}
                        >
                          Reject
                        </Link>
                        &nbsp;&nbsp;
                        <Link
                          to="#"
                          className="badge badge-success"
                          onClick={() => changeStatus(item, 1, index)}
                        >
                          Authorize
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
