import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import qs from "qs";

import ComicList from "@/components/Comics/ComicList";
import ComicModal from "@/components/Comics/ComicModal";

const Publisher = (props) => {
  const [comics, setComics] = useState([])
  const [publisher, setPublisher] = useState({})
  const [modalDisplayed, setModalDisplayed] = useState(false)
  const [editingComic, setEditingComic] = useState({})

  useEffect(() => {
    const paramId = props.match.params.id;

    axios.get("/api/publishers/" + paramId)
      .then(response => setPublisher(response.data))
      .catch(error => alert(error.message));

    fetchComics();
  }, [props.match.params.author]);

  const onComicItemActivated = (comic) => {
    setModalDisplayed(true);
    setEditingComic(comic);
  }

  function fetchComics() {
    const paramId = props.match.params.id;
    const params = { q: { publisher_id_eq: paramId } };
    const paramsSerializer = (params = {}) => qs.stringify(params, { arrayFormat: "brackets" });

    axios.get("/api/comics.json", {
      params,
      paramsSerializer
    }).then(response => setComics(response.data))
      .catch(error => alert(error.message));
  }

  return (
    <Fragment>
      <div className="container">
        <div className="h1 d-flex align-items-center justify-content-center text-white mt-4 my-5">
          <img src={publisher.logo} height="50" className="mx-2" />
          {publisher.name}
        </div>
      </div>

      <ComicList list={comics} onComicItemActivated={onComicItemActivated}></ComicList>

      {modalDisplayed &&
        <ComicModal comic={editingComic} onClose={() => setModalDisplayed(false)} onSave={fetchComics}></ComicModal>
      }
    </Fragment>
  )
}

export default Publisher;