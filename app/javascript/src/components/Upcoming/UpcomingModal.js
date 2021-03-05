import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import SelectSearch from "react-select";

const UpcomingModal = ({
  comic,
  onClose = () => {},
  onSave = () => {},
  onDestroy = () => {},
  isEdit = false,
  schedule,
  schedules,
  timeCustomable,
  lastDate,
}) => {
  const [data, setData] = useState(
    isEdit
      ? schedule
      : {
          comic_id: comic.id,
          volume: (comic.volumes_collected || 0) + 1,
          combo: 1,
          official: true,
          date: "",
          grabbed_at: "",
        }
  );

  const [comics, setComics] = useState([]);

  useEffect(() => {
    fetchComics().then((response) =>
      setComics(
        response.data.map((item) => ({
          ...item,
          value: item.id,
          label: item.title + " (" + item.copyright_title + ")",
        }))
      )
    );

    if (!isEdit && schedules) {
      const existed = schedules.filter((item) => item.comic_id == comic.id);
      const maxVolume =
        existed.sort((a, b) => (b.volume < a.volume ? -1 : 1))[0]?.volume || 0;

      setData({
        ...data,
        volume: maxVolume + 1,
        date: lastDate || data.date,
      });
    }
  }, []);

  const fetchComics = async () => {
    const paramsSerializer = (params = {}) =>
      qs.stringify(params, { arrayFormat: "brackets" });

    const params = { q: {} };

    return await axios.get("/api/comics.json", {
      params,
      paramsSerializer,
    });
  };

  async function save(event) {
    event.preventDefault();

    try {
      if (isEdit) {
        await axios.put("/api/upcoming/" + schedule.id, data);
      } else {
        await axios.post("/api/upcoming", data);
      }

      await onSave(data.date);
      onClose();
    } catch (e) {
      alert(e.message);
    }
  }

  async function destroy() {
    try {
      await axios.delete("/api/upcoming/" + schedule.id);
      await onDestroy();
      onClose();
    } catch (e) {
      alert(e.message);
    }
  }

  function onComicChange(option) {
    const existed = schedules.filter((item) => item.comic_id == option.id);
    const maxVolume = existed.sort((a, b) => (b.volume < a.volume ? -1 : 1))[0]
      ?.volume;
    if (maxVolume) {
      setData({
        ...data,
        comic_id: option.id,
        volume: maxVolume + (maxVolume >= option.volumes_total ? 0 : 1),
      });
    } else {
      setData({
        ...data,
        comic_id: option.id,
        volume:
          option.volumes_collected + 1 >= option.volumes_total
            ? option.volumes_total
            : option.volumes_collected + 1,
      });
    }
  }

  return (
    <Fragment>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-scrollable">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Schedule</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {comic.thumbnail && (
                <div className="d-flex">
                  <div className="form-group mr-3">
                    <img
                      src={comic.thumbnail?.url}
                      width="120"
                      height="180"
                      className="d-block mb-3"
                    />
                  </div>
                  <h2>{comic.title}</h2>
                </div>
              )}
              {!timeCustomable && (
                <div className="form-group">
                  <label>Change Comic</label>
                  <SelectSearch
                    options={comics}
                    placeholder="Choose your comic"
                    onChange={onComicChange}
                  />
                </div>
              )}
              <div className="form-group">
                <label>Volume</label>
                <input
                  className="form-control"
                  type="number"
                  required
                  value={data.volume}
                  onChange={(event) =>
                    setData({ ...data, volume: event.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  className="form-control"
                  type="date"
                  required
                  value={data.date}
                  onChange={(event) =>
                    setData({ ...data, date: event.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Combo</label>
                <input
                  className="form-control"
                  type="number"
                  required
                  value={data.combo}
                  onChange={(event) =>
                    setData({ ...data, combo: event.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="official"
                    checked={data.official}
                    onChange={(event) =>
                      setData({ ...data, official: event.target.checked })
                    }
                  />
                  <label className="custom-control-label" htmlFor="official">
                    Official
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Collected at</label>
                <input
                  className="form-control"
                  type="date"
                  value={data.grabbed_at?.split("T").shift()}
                  onChange={(event) =>
                    setData({ ...data, grabbed_at: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              {isEdit && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={destroy}
                >
                  Delete
                </button>
              )}
              <button type="submit" className="btn btn-primary" onClick={save}>
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-backdrop fade show d-block"></div>
    </Fragment>
  );
};

export default UpcomingModal;
