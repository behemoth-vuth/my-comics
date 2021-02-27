import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";

const UpcomingPage = (props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/upcoming.json")
      .then((response) => setList(response.data))
      .catch((error) => alert(error.message));
  }, []);

  const formatDate = (input) => {
    
  }

  return (
    <Fragment>
      <div className="container"></div>

      <table className="table text-white table-striped">
        <tbody>
          {list.map(item => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.comic.title}</td>
              <td>{item.volume}</td>
              <td>{item.combo}</td>
              <td>{item.grabbed_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default UpcomingPage;
