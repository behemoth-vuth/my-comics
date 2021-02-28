import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import UpcomingModal from "@/components/Upcoming/UpcomingModal";
import { AddButton, SearchInput } from "../Home";

const UpcomingPage = (props) => {
  const [list, setList] = useState([]);
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [item, setItem] = useState(null);
  const [query, setQuery] = useState("");

  async function grabComic(item) {
    try {
      await axios.post("/api/upcoming/" + item.id + "/grab");
      window.location.reload();
    } catch (e) {
      alert(e.message);
    }
  }

  function createSchedule() {
    setItem({ volume: 1, combo: 1, comic: {} });
    setIsEdit(false);
    setModalDisplayed(true);
  }

  useEffect(() => {
    axios
      .get("/api/upcoming.json")
      .then((response) => setList(response.data))
      .catch((error) => alert(error.message));
  }, []);

  return (
    <Fragment>
      <div className="container v-container">
        <AddButton onClick={createSchedule}>
          <span>
            <span>&#43;</span>
          </span>
        </AddButton>
        <SearchInput className="mb-3">
          <input
            placeholder="Search"
            className="form-control text-center w-100"
            onChange={(event) => setQuery(event.target.value)}
          />
        </SearchInput>
        <table className="table table-flex">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list
              .filter(
                (item) =>
                  item.comic.title.toLowerCase().includes(query) ||
                  item.comic.copyright_title.toLowerCase().includes(query) ||
                  item.comic.author.toLowerCase().includes(query)
              )
              .map((item, index) => (
                <tr key={item.id}>
                  <td name="date">
                    {(index == 0 || item.date != list[index - 1].date) && (
                      <span>{item.date}</span>
                    )}
                  </td>
                  <td style={{ verticalAlign: "baseline" }}>
                    <a
                      href="#"
                      className={
                        (item.official ? "text-primary" : "text-secondary") +
                        " d-flex align-items-start"
                      }
                      onClick={() => {
                        setItem(item);
                        setIsEdit(true);
                        setModalDisplayed(true);
                      }}
                    >
                      <img
                        src={item.comic.publisher?.attributes?.logo}
                        width="30"
                        style={{ marginRight: "8px" }}
                      />
                      {item.comic.title}
                      {item.volume == 1 && (
                        <span className="badge badge-warning ml-1">NEW</span>
                      )}
                      {item.volume == item.comic.volumes_total && (
                        <span className="badge badge-success ml-1">END</span>
                      )}
                    </a>
                  </td>
                  <td>
                    {item.volume}
                    {item.combo > 1 && (
                      <span>-{item.volume - 1 + item.combo}</span>
                    )}
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-success"
                      onClick={() => grabComic(item)}
                    >
                      Get
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modalDisplayed && (
        <UpcomingModal
          comic={item.comic}
          isEdit={isEdit}
          schedule={item}
          schedules={list}
          onClose={() => setModalDisplayed(false)}
          onSave={() => window.location.reload()}
          onDestroy={() => window.location.reload()}
        ></UpcomingModal>
      )}
    </Fragment>
  );
};

export default UpcomingPage;
