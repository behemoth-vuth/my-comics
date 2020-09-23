import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AuthorLink = styled.div`
  font-size: 80%;
  font-weight: 400;
  text-transform: uppercase;

  a {
    color: #131c2e;
  }

  a:not(:last-child) {
    &:after {
      content: ", "; 
    }
  }
`

const ComicItem = (props) => {
  const comic = props.comic;
  const activate = props.activate;

  const year = () => {
    if (!comic.year_end) {
      return comic.year_start + "-";
    }

    if (comic.year_start == comic.year_end) {
      return comic.year_start;
    }

    return comic.year_start + "-" + comic.year_end;
  }

  const status = () => {
    if (comic.finished) return "green";
    if (comic.volumes_collected == 0) return "red";
    if (comic.ongoing) return "yellow";
    return "orange";
  }

  return (
    <li className="comic-item">
      <div className="inner">
        <div className="thumbnail" onClick={() => activate(comic)}>
          <img src={comic.thumbnail.url} onError={(event) => event.target.src = "https://dummyimage.com/113x176/000/ffffff"} />
        </div>

        <div className={"status " + status()}>
          {comic.volumes_collected}/{comic.volumes_total}
          {comic.ongoing && "+"}
        </div>

        <div className="detail">
          <div className="publisher">
            <img src={comic.publisher?.attributes.logo} />
            <span>{year()}</span>
          </div>
          <div className="name">
            <div className="title">{comic.title}</div>
            <div className="small text-uppercase text-secondary">{comic.copyright_title}</div>
            <AuthorLink>
              {comic.author.split(",").map((item, index) => (
                <Link key={index} to={"/author/" + item.trim()}>{item.trim()}</Link>
              ))}
            </AuthorLink>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ComicItem;