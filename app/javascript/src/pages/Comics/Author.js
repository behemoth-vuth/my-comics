import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import qs from "qs";

import ComicList from "@/components/Comics/ComicList";
import ComicModal from "@/components/Comics/ComicModal";

const Author = (props) => {
  const [comics, setComics] = useState([])
  const [modalDisplayed, setModalDisplayed] = useState(false)
  const [editingComic, setEditingComic] = useState({})

  useEffect(() => {
    const params = { q: { author_i_cont: props.match.params.author } };
    const paramsSerializer = (params = {}) => qs.stringify(params, { arrayFormat: "brackets" });

    axios.get("/api/comics.json", {
      params,
      paramsSerializer
    }).then(response => setComics(response.data))
      .catch(error => alert(error.message));
  }, [props.match.params.author]);

  const onComicItemActivated = (comic) => {
    setModalDisplayed(true);
    setEditingComic(comic);
  }

  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center text-white">
          Comics by <span className="text-uppercase">{props.match.params.author}</span>
        </h1>
      </div>

      <ComicList list={comics} onComicItemActivated={onComicItemActivated}></ComicList>

      {modalDisplayed &&
        <ComicModal comic={editingComic} onClose={() => setModalDisplayed(false)}></ComicModal>
      }
    </Fragment>
  )
}

export default Author;