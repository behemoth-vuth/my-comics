import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { serialize } from "object-to-formdata";

const LoginModal = (props) => {
  const onClose = props.onClose;
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.classList.add("modal-open");

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

  async function login(event) {
    event.preventDefault();
    if (user === "vutaka") {
      window.localStorage.setItem("my-comics-login", true);
      window.location.reload();
    } else {
      alert("Login failed!");
    }
  }

  return (
    <Fragment>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-scrollable">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Username</label>
                <input className="form-control" required value={user} onChange={(event) => setUser(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}> Close</button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-backdrop fade show d-block"></div>
    </Fragment>
  )
}

export default LoginModal;