import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import UpcomingModal from "@/components/Upcoming/UpcomingModal";
import { AddButton, SearchInput } from "../Home";

const UpcomingPage = (props) => {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [item, setItem] = useState(null);
  const [query, setQuery] = useState("");
  const [lastDate, setLastDate] = useState("");

  async function grabComic(item) {
    try {
      await axios.post("/api/upcoming/" + item.id + "/grab");
      fetchSchedules();
    } catch (e) {
      alert(e.message);
    }
  }

  function createSchedule() {
    setItem({ volume: 1, combo: 1, comic: {} });
    setIsEdit(false);
    setModalDisplayed(true);
  }

  function fetchSchedules() {
    axios
      .get("/api/upcoming.json")
      .then((response) => {
        setList(response.data);
        setFiltered(response.data.filter((item) => item.comic));
      })
      .catch((error) => alert(error.message));
  }

  function skipSchedule(item) {
    axios
      .put("/api/upcoming/" + item.id, { ...item, skipped_at: new Date() })
      .then(() => fetchSchedules())
      .catch((error) => alert(error.message));
  }

  function takeSchedule(item) {
    axios
      .put("/api/upcoming/" + item.id, { ...item, grabbed_at: item.date })
      .then(() => fetchSchedules())
      .catch((error) => alert(error.message));
  }

  useEffect(() => {
    fetchSchedules();
  }, []);

  useEffect(() => {
    setFiltered(
      list.filter(
        (item) =>
          item.comic &&
          (item.comic.title.toLowerCase().includes(query) ||
            item.comic.copyright_title.toLowerCase().includes(query) ||
            item.comic.author.toLowerCase().includes(query))
      )
    );
  }, [query]);

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
            {filtered.map((item, index) => (
              <tr key={item.id}>
                <td name="date">
                  {(index == 0 || item.date != filtered[index - 1].date) && (
                    <span>{item.date}</span>
                  )}
                </td>
                <td style={{ verticalAlign: "baseline" }}>
                  <a
                    href={"/comics/" + item.comic.id}
                    className={
                      (item.official ? "text-primary" : "text-secondary") +
                      " d-flex align-items-start"
                    }
                  >
                    <img
                      src={item.cover?.image.url || item.comic.publisher?.logo}
                      width="30"
                      style={{ marginRight: "8px" }}
                    />
                    {item.comic.title}
                    {item.volume <= 1 &&
                      item.combo == item.comic.volumes_total &&
                      item.comic.original_status == "finished" && (
                        <span className="badge badge-danger ml-1">FULL</span>
                      )}
                    {item.volume <= 1 &&
                      item.combo != item.comic.volumes_total && (
                        <span className="badge badge-warning ml-1">NEW</span>
                      )}
                    {item.volume == item.comic.volumes_total &&
                      item.comic.original_status == "finished" && (
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
                    className="btn btn-link text-success p-0 mr-2"
                    onClick={() => grabComic(item)}
                  >
                    Get
                  </a>
                  <a
                    className="btn btn-link text-danger p-0"
                    onClick={() => skipSchedule(item)}
                  >
                    Skip
                  </a>
                  <a
                    className="btn btn-link text-info p-0 ml-2"
                    onClick={() => {
                      setItem(item);
                      setIsEdit(true);
                      setModalDisplayed(true);
                    }}
                  >
                    Edit
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
          lastDate={lastDate}
          onClose={() => setModalDisplayed(false)}
          onSave={(date) => {
            fetchSchedules();
            setLastDate(date);
          }}
          onDestroy={() => fetchSchedules()}
        ></UpcomingModal>
      )}
    </Fragment>
  );
};

export default UpcomingPage;
