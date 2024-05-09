import "./art.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import smallred from "/artport/smallred.jpg";
import birb from "/artport/birb.jpg";
import crane from "/artport/crane.png";
import cranes from "/artport/cranes.png";
import fanny from "/artport/fannyluca.jpg";
import jack from "/artport/jackandzoe.jpg";
import leaf from "/artport/leafysheepy.png";
import trees from "/artport/trees.jpg";
import lil from "/artport/littleheart.png";
import marble from "/artport/marblegif.gif";
import metrad from "/artport/meacrylic.png";
import mefirst from "/artport/mefirst.jpg";
import meweb from "/artport/meweb.jpg";
import oranges from "/artport/oranges.png";
import rgb from "/artport/rbgportrait.jpg";
import reflect from "/artport/reflection.png";
export default function Art() {
  const art = [
    {
      img: smallred,
      title: "Cycle of Rebirth",
      date: "May 2021",
      media: "Mixed Media",
    },
    {
      img: birb,
      title: "Finch in the Park",
      date: "February 2024",
      media: "Linocut",
    },
    { img: crane, title: "Heron", date: "June 2023", media: "Acrylic" },
    {
      img: cranes,
      title: "(F)light",
      date: "March 2023",
      media: "Acrylic Glass",
    },
    {
      img: fanny,
      title: "Fanny and Luca",
      date: "January 2024",
      media: "Digital",
    },
    {
      img: jack,
      title: "Jack and Zoe",
      date: "November 2023",
      media: "Lithography",
    },
    { img: leaf, title: "Leafysheepy", date: "August 2022", media: "Digital" },
    {
      img: trees,
      title: "In the Forest",
      date: "October 2023",
      media: "Lithography",
    },
    {
      img: lil,
      title: "Little Things I Love About People",
      date: "April 2023",
      media: "Mixed Media",
    },
    {
      img: marble,
      title: "CU9 Advertisement",
      date: "July 2023",
      media: "Digital",
    },
    {
      img: metrad,
      title: "Self-Portrait, Traditional",
      date: "June 2023",
      media: "Acrylic",
    },
    {
      img: mefirst,
      title: "Self-Portrait, Digital",
      date: "July 2023",
      media: "Digital",
    },
    {
      img: meweb,
      title: "Original Website Homepage",
      date: "August 2023",
      media: "Digital",
    },
    { img: oranges, title: "Oranges", date: "June 2023", media: "Acrylic" },
    {
      img: rgb,
      title: "RGB Portrait",
      date: "February 2023",
      media: "Photoshop",
    },
    {
      img: reflect,
      title: "Reflection",
      date: "January 2024",
      media: "Digital",
    },
  ];

  return (
    <main className="main pt-[5vh] min-h-[95vh]">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        className="w-screen ml-[2vw]"
      >
        <Masonry>
          {art.map((piece, ind) => {
            return (
              <div className="relative w-fit" key={ind}>
                <img className="w-full !m-[1vw]" src={piece.img} alt="" />
                <div className="absolute top-0 overlay w-[90%] h-full opacity-0 hover:opacity-50 bg-black rounded-lg flex justify-center items-center z-2">
                  <h1 className="!text-white opacity-100 text-[3vw] z-3 text-center">
                    {piece.title}
                  </h1>
                  <div className="flex w-full bottom-0 absolute justify-between">
                    <h3 className="!text-white opacity-100 !text-[2vw]">
                      {piece.date}
                    </h3>{" "}
                    <h3 className="!text-white opacity-100 !text-[2vw]">
                      {piece.media}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </main>
  );
}
