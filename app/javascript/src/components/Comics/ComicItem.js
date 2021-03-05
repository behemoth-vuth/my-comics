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
`;

const ComicCard = styled.li`
  width: 187.5px;
  overflow: hidden;
  padding: 7px;
  font-size: 12px;
  display: flex;

  .inner {
    display: flex;
    flex-direction: column;
    background: white;
    border: 1px solid #e9e9e9;
    position: relative;
    padding: 5px;
    width: 100%;

    .status {
      --color: #f44336;
      background: var(--color);
      position: absolute;
      top: 10px;
      right: -7px;
      width: 50px;
      text-align: center;
      color: white;
      height: 18px;
      line-height: 18px;

      &::before {
        content: "";
        position: absolute;
        border-left: 7px solid transparent;
        border-right: 0px solid transparent;
        border-top: 18px solid var(--color);
        bottom: 0;
        right: 100%;
      }

      &::after {
        content: "";
        position: absolute;
        border-left: 0px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 4px solid var(--color);
        bottom: 100%;
        right: 0;
        filter: brightness(0.8);
      }

      &.green {
        --color: #8bc34a;
      }

      &.yellow {
        --color: #ffc107;
      }

      &.orange {
        --color: #ff9800;
      }
    }

    .thumbnail {
      position: relative;
      width: 100%;
      padding-top: 148%;
      overflow: hidden;

      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;

        &.landscape {
          width: auto;
          height: 100%;
        }
      }
    }

    .detail {
      display: flex;
      padding: 5px;
      flex-flow: column;
      position: relative;

      .publisher {
        display: flex;
        flex-flow: column;
        align-items: center;
        font-size: 12px;
        line-height: 15px;
        color: black;
        margin-bottom: 5px;
        position: absolute;
        right: 5px;
        top: -25px;
        width: 50px;
        height: 50px;
        background: white;
        border-radius: 50%;
        padding: 5px;

        > img {
          width: 20px;
          margin-bottom: 3px;
        }

        span {
          white-space: nowrap;
        }
      }

      .name {
        background: white;
        position: relative;
        margin-top: 15px;

        .title {
          font-size: 13px;
          font-weight: bold;
        }
      }
    }
  }
`;

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
  };

  const status = () => {
    if (!comic.ongoing && comic.volumes_collected === comic.volumes_total)
      return "green";
    if (comic.volumes_collected == 0) return "red";
    if (comic.ongoing) return "yellow";
    return "orange";
  };

  return (
    <ComicCard>
      <div className="inner">
        <div className="thumbnail" onClick={() => activate(comic)}>
          <img
            src={comic.thumbnail.url}
            onError={(event) =>
              (event.target.src = "https://dummyimage.com/113x176/000/ffffff")
            }
          />
        </div>

        <div className={"status " + status()}>
          {comic.volumes_collected}/{comic.volumes_total}
          {comic.ongoing && "+"}
        </div>

        <div className="detail">
          <Link className="publisher" to={"/publisher/" + comic.publisher_id}>
            <img src={comic.publisher?.logo} />
            <span>{year()}</span>
          </Link>
          <div className="name mb-2">
            <Link className="title" to={"/comics/" + comic.id}>
              {comic.title}
            </Link>
            <div className="small text-uppercase text-secondary">
              {comic.copyright_title}
            </div>
            <AuthorLink>
              {comic.author.split(",").map((item, index) => (
                <Link key={index} to={"/author/" + item.trim()}>
                  {item.trim()}
                </Link>
              ))}
            </AuthorLink>
          </div>
          <div className="d-flex align-items-center">
            {comic.meta?.paper_size && (
              <div className="text-muted mr-2">{comic.meta?.paper_size}</div>
            )}
            {comic.meta?.age_restriction && (
              <span className="badge badge-danger">
                {comic.meta.age_restriction}
              </span>
            )}
          </div>
        </div>
      </div>
    </ComicCard>
  );
};

export default ComicItem;
