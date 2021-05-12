import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { serialize } from "object-to-formdata";

const CoverUploadModal = (props) => {
  const onClose = props.onClose;
  const comic = props.comic;
  const onSave = props.onSave;

  const [volume, setVolume] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    document.body.classList.add("modal-open");

    return function cleanup() {
      document.body.classList.remove("modal-open");
    };
  }, []);

  function onFileChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  async function save(event) {
    event.preventDefault();

    try {
      const formData = {
        image: file,
        comic_id: comic.id,
        volume: volume,
      };

      const serializedData = serialize(formData);

      const headers = {
        "Content-Type": "multipart/form-data",
      };

      await axios.post("/api/covers", serializedData, headers);

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
              <h5 className="modal-title">Upload Cover</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Image</label>
                <img
                  src={previewImage}
                  width="120"
                  height="180"
                  className="d-block mb-3"
                />
                <input
                  type="file"
                  className="form-control"
                  required
                  onChange={onFileChange}
                />
              </div>
              <div className="form-group">
                <label>Volumes</label>
                <input
                  type="number"
                  inputMode="numeric"
                  className="form-control"
                  required
                  value={volume}
                  onChange={(event) => setVolume(event.target.value)}
                />
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

export default CoverUploadModal;
