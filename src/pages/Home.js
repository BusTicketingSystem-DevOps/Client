import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Col, Row, message } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";
import Bus from "../components/Bus";
import MultiBus from "../components/MultiBus";

function Home() {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const [filters = {}, setFilters] = useState({});
  const [multibuses, SetMultiBuses] = useState([]);
  
  const getBuses = async () => {
    const tempFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-all-buses", { filters: tempFilters }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
        if(response.data.multi){
          SetMultiBuses(response.data.multi);
        console.log("Multi: ",response.data.multi);
        }
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
    finally{
      setFilters({
        from:"",
        to:"",
        journeyDate:"",
      });
    }
  };

  useEffect(() => {
    getBuses();
  }, []);

  return (
    <div>
      <div className="my-3 py-1">
        <Row gutter={10} align="center">
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="From"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="To"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="date"
              placeholder="Date"
              value={filters.journeyDate}
              onChange={(e) =>
                setFilters({ ...filters, journeyDate: e.target.value })
              }
            />
          </Col>
          <Col lg={6} sm={24}>
            <div className="d-flex gap-2">
              <button className="primary-btn" onClick={() => getBuses()}>
                Filter
              </button>
              <button
                className="outlined px-3"
                onClick={async() =>
                  {
                    // await setFilters({
                    //   from:"",
                    //   to:"",
                    //   journeyDate:"",
                    // });
                    console.log("filters:",filters)
                    await getBuses();
                  }
                }
              >
                Clear
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[15, 15]}>
          {buses
            .filter((bus) => bus.status === "Yet To Start")
            .map((bus) => (
              <Col lg={12} xs={24} sm={24}>
                <Bus bus={bus} />
              </Col>
            ))}
        </Row>
        <hr />
        {multibuses.length>0 ? (<div>
          <h1>Travel with One Hop</h1>
        <Row gutter={[15,15]}>
          {
            multibuses.map((multibus) => (
              <Col lg={12} xs={24} sm={24}>
                <MultiBus multibus={multibus} />
              </Col>
            ))
          }
        </Row>
      </div>) : (buses.length>0 ?"":<h1>Sorry! No Buses Found!!</h1>)}
      </div>
    </div>
  );
}

export default Home;
