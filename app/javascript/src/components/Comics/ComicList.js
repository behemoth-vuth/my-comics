import React from "react";
import ComicItem from "@/components/Comics/ComicItem";

const ComicList = (props) => {
  const comics = props.list;
  const onComicItemActivated = props.onComicItemActivated;

  return (
    <ul className="d-flex flex-wrap p-0 justify-content-center mb-5">
      {comics.map(item => (
        <ComicItem
          key={item.id}
          comic={item}
          activate={onComicItemActivated}>
        </ComicItem>
      ))}
    </ul>
  )
}

export default ComicList;