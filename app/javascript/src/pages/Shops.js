import React, { Fragment } from "react";

const Shops = (props) => {
  const shops = [
    {
      name: "TK Manga Shop",
      link: "https://sites.google.com/view/tkmangashop/home",
      image: "",
    },
    {
      name: "A&E Comic Store",
      link: "https://docs.google.com/document/d/1Pkdyy9F7OPjKmLyEUJQCkWUBLNixqMFoE56-JJiesNQ/edit",
      image: "",
    },
    {
      name: "Obi manga",
      link: "https://m.facebook.com/permalink.php?story_fbid=166370594912285&id=105701760979169",
      image: "",
    },
    {
      name: "DongBang Manga Shop",
      link: "https://m.facebook.com/dongbang.manga.shop/photos/a.378060668871689/1559145700763174",
      image: "",
    },
    {
      name: "Chang's Manga",
      link: "https://www.facebook.com/media/set/?vanity=1334093530080692&set=a.1676023922554316",
      image: "",
    },
  ];

  return (
    <Fragment>
      <div className="container">
        <table className="table text-white table-striped text-center">
          {shops.map((item, index) => (
            <tr key={index}>
              <td>
                <a href={item.link} target="_blank">
                  {item.name}
                </a>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </Fragment>
  );
};

export default Shops;
