import "./art.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Art() {
  const art = [
    { img: "/artport/smallred.jpg" },
    { img: "/artport/birb.jpg" },
    { img: "/artport/crane.png" },
    { img: "/artport/cranes.png" },
    { img: "/artport/fannyluca.jpg" },
    { img: "/artport/jackandzoe.jpg" },
    { img: "/artport/leafysheepy.PNG" },
    { img: "/artport/trees.jpg" },
    { img: "/artport/littleheart.png" },
    { img: "/artport/marblegif.GIF" },
    { img: "/artport/meacrylic.png" },
    { img: "/artport/mefirst.jpg" },
    { img: "/artport/meweb.jpg" },
    { img: "/artport/oranges.png" },
    { img: "/artport/rbgportrait.JPG" },
    { img: "/artport/reflection.PNG" },
  ];

  return (
    <main className="main pt-[5vh] min-h-[95vh]">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        className="w-screen"
      >
        <Masonry>
          <img className="w-full !m-[1vw]" src={art[0].img} />
          <img className="w-full !m-[1vw]" src={art[1].img} />
          <img className="w-full !m-[1vw]" src={art[2].img} />
          <img className="w-full !m-[1vw]" src={art[3].img} />
          <img className="w-full !m-[1vw]" src={art[4].img} />
          <img className="w-full !m-[1vw]" src={art[5].img} />
          <img className="w-full !m-[1vw]" src={art[6].img} />
          <img className="w-full !m-[1vw]" src={art[7].img} />
          <img className="w-full !m-[1vw]" src={art[8].img} />
          <img className="w-full !m-[1vw]" src={art[9].img} />
          <img className="w-full !m-[1vw]" src={art[10].img} />
          <img className="w-full !m-[1vw]" src={art[11].img} />
          <img className="w-full !m-[1vw]" src={art[12].img} />
          <img className="w-full !m-[1vw]" src={art[13].img} />
          <img className="w-full !m-[1vw]" src={art[14].img} />
          <img className="w-full !m-[1vw]" src={art[15].img} />
          {/* <img className="w-full !m-[1vw]" src={art[16].img} /> */}
        </Masonry>
      </ResponsiveMasonry>
    </main>
  );
}
