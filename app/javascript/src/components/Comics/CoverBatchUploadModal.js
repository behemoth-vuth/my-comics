import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { serialize } from "object-to-formdata";

const CoverBatchUploadModal = (props) => {
  const onClose = props.onClose;
  const comic = props.comic;
  const onSave = props.onSave;

  const [files, setFiles] = useState([]);

  useEffect(() => {
    document.body.classList.add("modal-open");

    return function cleanup() {
      document.body.classList.remove("modal-open");
    };
  }, []);

  function onFileChange(event) {
    const selectedFiles = Array.from(event.target.files).map((file) => ({
      volume: file.name.match(/\d+/gi).shift(),
      image: file,
    }));
    setFiles(selectedFiles);
  }

  async function save(event) {
    event.preventDefault();

    try {
      const formData = {
        covers: files,
        comic_id: comic.id,
      };

      const serializedData = serialize(formData);

      const headers = {
        "Content-Type": "multipart/form-data",
      };

      await axios.post("/api/covers/batch_upload", serializedData, headers);

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
              <h5 className="modal-title">Batch Upload Cover</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Images</label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={onFileChange}
                />
                <div></div>
              </div>
            </div>
            <div className="modal-footer">
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

export default CoverBatchUploadModal;
