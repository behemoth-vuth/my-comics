import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import qs from "qs";
import styled from "styled-components";

import ComicList from "@/components/Comics/ComicList";
import ComicModal from "@/components/Comics/ComicModal";
import LoginModal from "@/components/Shared/LoginModal";

const CheckBox = styled.div`
  #green.custom-control-input:checked ~ .custom-control-label::before {
    border-color: #8bc34a;
    background-color: #8bc34a;
  }

  #orange.custom-control-input:checked ~ .custom-control-label::before {
    border-color: #ff9800;
    background-color: #ff9800;
  }

  #yellow.custom-control-input:checked ~ .custom-control-label::before {
    border-color: #ffc107;
    background-color: #ffc107;
  }

  #red.custom-control-input:checked ~ .custom-control-label::before {
    border-color: #f44336;
    background-color: #f44336;
  }

  #green ~ .custom-control-label::before {
    background-color: #8bc34a;
  }

  #orange ~ .custom-control-label::before {
    background-color: #ff9800;
  }

  #yellow ~ .custom-control-label::before {
    background-color: #ffc107;
  }

  #red ~ .custom-control-label::before {
    background-color: #f44336;
  }
`;

const AddButton = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 2;
  width: 75px;
  height: 75px;
  font-weight: bold;
  padding: 0;
  cursor: pointer;

  &:hover {
    > span {
      color: #9abb82;
      box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.13),
        0 5px 8px rgba(0, 0, 0, 0.35), 0 3px 10px 4px rgba(0, 0, 0, 0.2);
    }
  }

  > span {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    color: #a5a39d;
    font-size: 45px;
    text-align: center;
    line-height: 65px;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    background: #b25244;
    background: linear-gradient(#f7f2f6, #b2ac9e);
    transition: all 0.3s ease-out;
    z-index: -1;
    box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.13),
      0 5px 8px rgba(0, 0, 0, 0.3), 0 10px 10px 4px rgba(0, 0, 0, 0.3);

    &:before {
      content: "";
      position: absolute;
      left: -10px;
      right: -10px;
      top: -10px;
      bottom: -10px;
      z-index: -1;
      border-radius: inherit;
      box-shadow: inset 0 10px 10px rgba(0, 0, 0, 0.13);
      -webkit-filter: blur(1px);
      filter: blur(1px);
    }

    &:after {
      content: "";
      position: absolute;
      left: -10px;
      right: -10px;
      top: -10px;
      bottom: -10px;
      z-index: -2;
      border-radius: inherit;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1),
        0 1px 2px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.15);
    }

    > span:after {
      content: "";
      display: block;
      position: absolute;
      width: 70%;
      height: 70%;
      left: 50%;
      top: 50%;
      z-index: -1;
      margin: -35% 0 0 -35%;
      border-radius: 50%;
      background: #d2cbc3;
      background: linear-gradient(#cbc7bc, #d2cbc3);
      box-shadow: 0 -2px 5px rgba(255, 255, 255, 0.05),
        0 2px 5px rgba(255, 255, 255, 0.1);
      -webkit-filter: blur(1px);
      filter: blur(1px);
    }
  }
`;

const SearchInput = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  .form-control {
    max-width: 670px;
  }
`;

const paramsSerializer = (params = {}) =>
  qs.stringify(params, { arrayFormat: "brackets" });

const fetchComics = async (q) => {
  const params = { q: q };
  return await axios.get("/api/comics.json", {
    params,
    paramsSerializer,
  });
};

const Home = () => {
  const [comics, setComics] = useState([]);
  const [query, setQuery] = useState("");
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const [loginDisplayed, setLoginDisplayed] = useState(false);
  const [editingComic, setEditingComic] = useState({});
  const [status, setStatus] = useState(0);

  useEffect(() => {
    search();
  }, [query, status]);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const search = () => {
    const q = handleConditions();
    fetchComics(q)
      .then((response) => {
        setComics(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleConditions = () => {
    switch (Number(status)) {
      case 1:
        return {
          title_or_copyright_title_or_author_i_cont: query,
          state: "finished",
        };
      case 2:
        return {
          title_or_copyright_title_or_author_i_cont: query,
          state: "collecting",
        };
      case 3:
        return {
          title_or_copyright_title_or_author_i_cont: query,
          state: "ongoing",
        };
      case 4:
        return {
          title_or_copyright_title_or_author_i_cont: query,
          state: "following",
        };
      default:
        return {
          title_or_copyright_title_or_author_i_cont: query,
          volumes_collected_not_eq: 0,
        };
    }
  };

  const onComicItemActivated = (comic) => {
    const loggedIn = window.localStorage.getItem("my-comics-login");

    if (loggedIn) {
      const editingComic = JSON.parse(JSON.stringify(comic));
      editingComic.meta = editingComic.meta || {};
      setModalDisplayed(true);
      setEditingComic(editingComic);
    } else {
      setLoginDisplayed(true);
    }
  };

  const onCreateNewComic = () => {
    const loggedIn = window.localStorage.getItem("my-comics-login");

    if (loggedIn) {
      setModalDisplayed(true);
      setEditingComic({ ongoing: 0, meta: {} });
    } else {
      setLoginDisplayed(true);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="d-flex justify-content-center px-3 my-3">
          <CheckBox className="custom-control custom-radio">
            <input
              type="radio"
              className="custom-control-input"
              id="all"
              name="filter"
              onChange={() => setStatus(0)}
            />
            <label className="custom-control-label" htmlFor="all"></label>
          </CheckBox>
          <CheckBox className="custom-control custom-radio">
            <input
              type="radio"
              className="custom-control-input"
              id="green"
              name="filter"
              onChange={() => setStatus(1)}
            />
            <label className="custom-control-label" htmlFor="green"></label>
          </CheckBox>
          <CheckBox className="custom-control custom-radio">
            <input
              type="radio"
              className="custom-control-input"
              id="orange"
              name="filter"
              onChange={() => setStatus(2)}
            />
            <label className="custom-control-label" htmlFor="orange"></label>
          </CheckBox>
          <CheckBox className="custom-control custom-radio">
            <input
              type="radio"
              className="custom-control-input"
              id="yellow"
              name="filter"
              onChange={() => setStatus(3)}
            />
            <label className="custom-control-label" htmlFor="yellow"></label>
          </CheckBox>
          <CheckBox className="custom-control custom-radio">
            <input
              type="radio"
              className="custom-control-input"
              id="red"
              name="filter"
              onChange={() => setStatus(4)}
            />
            <label className="custom-control-label" htmlFor="red"></label>
          </CheckBox>
        </div>

        <SearchInput>
          <input
            placeholder="Search"
            className="form-control text-center w-100"
            onChange={handleQuery}
          />
        </SearchInput>

        <AddButton onClick={onCreateNewComic}>
          <span>
            <span>&#43;</span>
          </span>
        </AddButton>
      </div>

      <ComicList
        list={comics}
        onComicItemActivated={onComicItemActivated}
      ></ComicList>

      {modalDisplayed && (
        <ComicModal
          comic={editingComic}
          onSave={search}
          onClose={() => setModalDisplayed(false)}
        ></ComicModal>
      )}

      {loginDisplayed && (
        <LoginModal onClose={() => setLoginDisplayed(false)}></LoginModal>
      )}
    </Fragment>
  );
};

export default Home;
