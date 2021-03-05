import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import UpcomingModal from "@/components/Upcoming/UpcomingModal";
import ComicModal from "@/components/Comics/ComicModal";

const Author = (props) => {
  const [comic, setComic] = useState({});
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const [showUpcomingModal, setShowUpcomingModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [lastDate, setLastDate] = useState("");

  useEffect(() => {
    getComic();
  }, [props.match.params.id]);

  function getComic() {
    const id = props.match.params.id;

    axios
      .get("/api/comics/" + id)
      .then((response) => {
        setComic(response.data);
        setModalDisplayed(false);
      })
      .catch((error) => alert(error.message));
  }

  async function grabVolume(item) {
    try {
      await axios.post("/api/upcoming/" + item.id + "/grab");
      getComic();
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-md-4">
            <img className="w-100" src={comic.thumbnail?.url} />
          </div>
          <div className="col-md-8">
            <table className="table text-white">
              <tbody>
                <tr>
                  <td className="text-muted">Title</td>
                  <td>
                    {comic.title}
                    <a
                      href="#"
                      className="ml-2 badge badge-warning"
                      onClick={() => setModalDisplayed(true)}
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="text-muted">Original Title</td>
                  <td>{comic.copyright_title}</td>
                </tr>
                <tr>
                  <td className="text-muted">Author</td>
                  <td>{comic.author}</td>
                </tr>
                <tr>
                  <td className="text-muted">Publisher</td>
                  <td>
                    {comic.publisher && (
                      <div>
                        <img
                          width="30"
                          className="mr-1"
                          src={comic.publisher.logo}
                        />
                        {comic.publisher.name}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-muted">Year Start</td>
                  <td>{comic.year_start}</td>
                </tr>
                <tr>
                  <td className="text-muted">Year End</td>
                  <td>{comic.year_end}</td>
                </tr>
                <tr>
                  <td className="text-muted">Original Status</td>
                  <td className="text-capitalize">{comic.original_status}</td>
                </tr>
                <tr>
                  <td className="text-muted">Publishing Status</td>
                  <td className="text-capitalize">{comic.publishing_status}</td>
                </tr>
                <tr>
                  <td className="text-muted">Collected</td>
                  <td>
                    {comic.volumes_collected}/{comic.volumes_total}
                  </td>
                </tr>
                <tr>
                  <td className="text-muted">Paper Size</td>
                  <td>{comic.meta?.paper_size}</td>
                </tr>
                <tr>
                  <td className="text-muted">Age Restriction</td>
                  <td>{comic.meta?.age_restriction}</td>
                </tr>
                <tr>
                  <td className="text-muted">Last Updated At</td>
                  <td>{comic.last_saved_at}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row text-white">
          <div className="col-12">
            <h3>History</h3>
            <table className="table text-white">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Volume</th>
                  <th>Official</th>
                  <th>Collected At</th>
                  <th>
                    <a
                      type="button"
                      className="btn btn-link text-success p-0"
                      onClick={() => {
                        setEditingItem(null);
                        setShowUpcomingModal(true);
                      }}
                    >
                      Add
                    </a>
                  </th>
                </tr>
              </thead>
              {comic.upcomings?.length > 0 && (
                <tbody>
                  {comic.upcomings.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>
                        {item.volume}
                        {item.combo > 1 && (
                          <span>-{item.volume - 1 + item.combo}</span>
                        )}
                      </td>
                      <td>{item.official && "Official"}</td>
                      <td>
                        {item.grabbed_at &&
                          String(item.grabbed_at).split("T").shift()}
                        {!item.grabbed_at && (
                          <a
                            type="button"
                            className="btn btn-link text-success p-0"
                            onClick={() => grabVolume(item)}
                          >
                            Collect
                          </a>
                        )}
                      </td>
                      <td>
                        <a
                          type="button"
                          className="btn btn-link text-primary p-0"
                          onClick={() => {
                            setEditingItem(item);
                            setShowUpcomingModal(true);
                          }}
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>

      {showUpcomingModal && (
        <UpcomingModal
          comic={comic}
          schedule={editingItem}
          isEdit={Boolean(editingItem)}
          timeCustomable={true}
          lastDate={lastDate}
          schedules={comic.upcomings}
          onClose={() => setShowUpcomingModal(false)}
          onSave={(date) => {
            setLastDate(date)
            getComic();
          }}
          onDestroy={() => getComic()}
        ></UpcomingModal>
      )}

      {modalDisplayed && (
        <ComicModal
          comic={comic}
          onSave={getComic}
          onClose={() => setModalDisplayed(false)}
          onCreateSchedule={() => {
            setModalDisplayed(false);
            setShowUpcomingModal(true);
          }}
        ></ComicModal>
      )}
    </Fragment>
  );
};

export default Author;
