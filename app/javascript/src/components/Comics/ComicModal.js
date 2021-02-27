import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { serialize } from "object-to-formdata";

const ComicModal = (props) => {
  const onClose = props.onClose;
  const comic = props.comic;
  const onSave = props.onSave;

  const [publishers, setPublishers] = useState([]);
  const [data, setData] = useState(comic);
  const [file, setFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [updatedNow, setUpdatedNow] = useState(false);

  useEffect(() => {
    document.body.classList.add("modal-open");
    setIsEdit(comic.id !== undefined);

    axios.get("/api/publishers.json")
      .then(response => setPublishers(response.data.map(item => item.attributes)))
      .catch(error => {
        alert(error.message)
        onClose()
      });

    return function cleanup() {
      document.body.classList.remove("modal-open");
    }
  }, []);

  function onFileChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setData({ ...data, thumbnail: { url: e.target.result } });
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  async function save(event) {
    event.preventDefault();

    try {
      const formData = Object.assign({}, data);
      if (file) formData.thumbnail = file;

      formData.publisher_id = formData.publisher_id || 1;
      formData.updated_now = updatedNow;

      const serializedData = serialize(formData);

      const headers = {
        'Content-Type': 'multipart/form-data'
      };

      if (isEdit) {
        serializedData.append("_method", "put");
        await axios.post("/api/comics/" + comic.id, serializedData, headers);
      } else {
        await axios.post("/api/comics", serializedData, headers);
      }

      await onSave();
      onClose();
    } catch (e) {
      alert(e.message);
    }
  }

  async function destroy() {
    try {
      axios.delete("/api/comics/" + comic.id);
      await onSave();
      onClose();
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <Fragment>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-scrollable">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Comic</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Image</label>
                <img src={data.thumbnail?.url} width="120" height="180" className="d-block mb-3" />
                <input type="file" className="form-control" required onChange={onFileChange} />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input className="form-control" required value={data.title} onChange={(event) => setData({ ...data, title: event.target.value })} />
              </div>
              <div className="form-group">
                <label>Copyright Title</label>
                <input className="form-control" required value={data.copyright_title} onChange={(event) => setData({ ...data, copyright_title: event.target.value })} />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input className="form-control" required value={data.author} onChange={(event) => setData({ ...data, author: event.target.value })} />
              </div>
              <div className="form-group">
                <label>Publisher</label>
                <select className="form-control" required value={data.publisher_id} onChange={(event) => setData({ ...data, publisher_id: event.target.value })} >
                  {publishers.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Year</label>
                <div className="input-group">
                  <input
                    type="number"
                    inputMode="numeric"
                    className="form-control"
                    required
                    value={data.year_start}
                    onChange={(event) => setData({ ...data, year_start: event.target.value })}
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    className="form-control"
                    value={data.year_end || ""}
                    onChange={(event) => setData({ ...data, year_end: event.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Volumes</label>
                <div className="input-group">
                  <input
                    type="number"
                    inputMode="numeric"
                    className="form-control"
                    required
                    value={data.volumes_collected}
                    onChange={(event) => setData({ ...data, volumes_collected: event.target.value })}
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    className="form-control"
                    required
                    value={data.volumes_total}
                    onChange={(event) => setData({ ...data, volumes_total: event.target.value })}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="ongoing"
                          checked={data.ongoing}
                          onChange={(event) => setData({ ...data, ongoing: event.target.checked })}
                        />
                        <label className="custom-control-label" htmlFor="ongoing">Ongoing</label>
                      </div>
                    </span>
                    <span className="input-group-text">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="hiatus"
                          checked={data.hiatus}
                          onChange={(event) => setData({ ...data, hiatus: event.target.checked })}
                        />
                        <label className="custom-control-label" htmlFor="hiatus">Hiatus</label>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Paper Size</label>
                <input className="form-control" required value={data.meta.paper_size} onChange={(event) => setData({ ...data, meta: {...data.meta, paper_size: event.target.value} })} />
              </div>
              <div className="form-group">
                <label>Age Restriction</label>
                <input className="form-control" required value={data.meta.age_restriction} onChange={(event) => setData({ ...data, meta: {...data.meta, age_restriction: event.target.value} })} />
              </div>
              <div className="form-group">
                <label>Last Updated</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    required
                    value={data.last_saved_at}
                    disabled={updatedNow}
                    onChange={(event) => setData({ ...data, last_saved_at: event.target.value })}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="last_saved_at"
                          onChange={(event) => setUpdatedNow(event.target.checked)}
                        />
                        <label className="custom-control-label" htmlFor="last_saved_at">Now</label>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={destroy}>Delete</button>
              <button type="submit" className="btn btn-primary" onClick={save}>Save</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}> Close</button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-backdrop fade show d-block"></div>
    </Fragment>
  )
}

export default ComicModal;