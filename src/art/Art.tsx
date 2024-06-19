import "./art.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import smallred from "/artport/smallred.jpg";
import bigred from "/artport/bigred.jpg";
import birb from "/artport/birb.jpg";
import birbs from "/artport/birbs.jpg";
import crane from "/artport/crane.png";
import cranes from "/artport/cranes.png";
import cranesa from "/artport/cranesangle.png";
import cranesf from "/artport/cranesfull.jpg";
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
import mur from "/artport/muralmid.jpg";
import murl from "/artport/muralleft.jpg";
import murr from "/artport/muralright.jpg";
import remscover from "/artport/remscover.jpg";
import remstitle from "/artport/remstitle.jpg";
import rems2 from "/artport/rems2.jpg";
import rems3 from "/artport/rems3.jpg";
import rems4 from "/artport/rems4.jpg";
import rems5 from "/artport/rems5.jpg";
import rems6 from "/artport/rems6.jpg";
import rems7 from "/artport/rems7.jpg";
import rems8 from "/artport/rems8.jpg";
import rems9 from "/artport/rems9.jpg";
import rems10 from "/artport/rems10.jpg";
import rems11 from "/artport/rems11.jpg";
import rems12 from "/artport/rems12.jpg";
import rems13 from "/artport/rems13.jpg";
import rems14 from "/artport/rems14.jpg";
import biga from "/artport/bigangle.jpg";
import bigl from "/artport/biglong.jpg";
import cats from "/artport/cats.jpg";

import { useState } from "react";
import Modal from "./Modal";

const art = [
  {
    imgs: [smallred, bigred],
    title: "Cycle of Rebirth",
    date: "May 2021",
    media: "Mixed Media",
    awards:
      "Gold Key, American Visions Nomination, Scholastic Art And Writing Awards 2022",
    desc: " In this piece, the old self falls from the new self as one not only understands themselves now but who they want to become. While a rebirth can feel like a religious experience, people go through many cycles of realization and remake themselves through a lifetime, which is why the composition and flying birds encircle the figure. The process of rebirth is ongoing, and so is the piece.",
  },
  {
    imgs: [birb, birbs],

    title: "Finch in the Park",
    date: "February 2024",
    media: "Linocut",
    desc: "This piece began with a person in mind and slowly expanded to be about many people, prompting imagery of many places and symbols I and my friends hold dear such as the tree that is at Prospect Terrace Park.",
  },
  {
    imgs: [cats],
    title: "Cats Cuddling",
    date: "May 2024",
    media: "Digital",
    desc: "A warm painting of two cats, cuddling.",
  },
  {
    imgs: [biga, bigl],
    title: "The Big Print",
    date: "May 2024",
    media: "Woodblock",
    desc: "'The Big Print' is a collaborative piece between myself and a dozen other students to create a cohesive composition 18' long by 4' tall. The left panel depicts an atom at the center of the galaxy, the middle a large tree with a snmall fairy home, and the right an underwater scene.",
  },
  {
    imgs: [crane],
    title: "Heron",
    date: "June 2023",
    media: "Acrylic",
    desc: "A simple painting of a beautiful creature in a somewhat natural habitat. Inspired by the local nature of my hometown in South Florida.",
  },
  {
    imgs: [mur, murl, murr],
    title: "Love Comes Naturally",
    date: "March 2021",
    media: "Mural",
    desc: "A collaborative mural project between myself, Gyöngy Szászvárosi, and Kyra Kramer, the design reflects three different forms of love: familial, romantic and platonic, and includes diverse figures, which represents the idea that love can be expressed in many ways, between all people.",
  },
  {
    imgs: [cranes, cranesa, cranesf],
    title: "(F)light",
    date: "March 2023",
    media: "Acrylic Glass",
    desc: "An experiment with the lasercutter to create a work that floats and filters natural light.",
  },
  {
    imgs: [fanny],
    title: "Fanny and Luca",
    date: "January 2024",
    media: "Digital",
    desc: "A tender, simple moment of affection between two close friends.",
  },
  {
    imgs: [
      remscover,
      remstitle,
      rems2,
      rems3,
      rems4,
      rems5,
      rems6,
      rems7,
      rems8,
      rems9,
      rems10,
      rems11,
      rems12,
      rems13,
      rems14,
    ],
    title: "Reminders",
    date: "April 2024",
    media: "Bookarts",
    desc: "I often choose the end of each semester to reflect on my growth as a person and an artist. Reminders is no different- each page a cyanotype photo collage of moments in my life, chronologically set on pages from my journal where I describe key moments in each day, while the legible text is some of the reminders I've notated for myself in times of stress. One thing I have learned in the last year is to let go of having ultimate control over my life, that there is an in-between space of appreciation between forgetting and holding onto everything. The nature of the printed media itself reflects the uncertainty and ephemerality of memory and the quietness in learning to let go. Likewise, the medium portrays a kind of inexactness, contrasting with the typical set of perfect editions one might expect from a series of books.",
  },

  {
    imgs: [jack],
    title: "Jack and Zoe",
    date: "November 2023",
    media: "Lithography",
    desc: "A gentle moment in sleep, on delicate paper and with an involved process, this piece considers the value in life's quiet moments.",
  },
  {
    imgs: [leaf],
    title: "Leafysheepy",
    date: "August 2022",
    media: "Digital",
    desc: "The origin of my branding, based on a literal representation of the leaf sheep sea slug.",
  },
  {
    imgs: [trees],
    title: "In the Forest",
    date: "October 2023",
    media: "Lithography",
    desc: "A wooded area I stumbled into on a trip to Ireland as a teen.",
    awards:
      "Exhibited at the 46th Annual Student Art Exhibition, Granoff Center",
  },
  {
    imgs: [lil],
    secimgs: [],
    title: "Little Things I Love About Humans",
    date: "April 2023",
    media: "Mixed Media",
    desc: "Based on a notes app list of the same name, 'Little Things I Love About Humans' was an initial effort to improve my outlook on life during a time when I was consistently anxious, but became my primary method of appreciation for those around me. Each painted paper slip describes an item on the list, contained by the lasercut masonite heart. ",
  },
  {
    imgs: [marble],
    title: "CU9 Advertisement",
    date: "July 2023",
    media: "Digital",
    desc: "An animated advertisement created for the Brown Language and Thought Lab to attract participants to sign up for studies.",
  },
  {
    imgs: [metrad],
    title: "Self-Portrait, Traditional",
    date: "June 2023",
    media: "Acrylic",
    desc: "A monochromatic self-portrait painted after the end of my freshman year of college.",
  },
  {
    imgs: [mefirst],
    title: "Self-Portrait, Digital",
    date: "July 2023",
    media: "Digital",
    desc: "The first digital painting I ever created using Procreate, after buying an iPad with my first substantial paycheck.",
  },
  {
    imgs: [meweb],
    title: "Original Website Homepage",
    date: "August 2023",
    media: "Digital",
    desc: "The top portion of the homepage to my old website, containing tons of hidden plants and animals throughout the scene.",
  },
  {
    imgs: [oranges],
    title: "Oranges",
    date: "June 2023",
    media: "Acrylic",
    desc: "A painting of oranges, created as an exercise to paint orange without using the color orange.",
  },
  {
    imgs: [rgb],
    title: "RGB Portrait",
    date: "February 2023",
    media: "Photoshop",
    desc: "A multi-layer, distorted image meant to push the bounds of Photoshop tools.",
  },
  {
    imgs: [reflect],
    title: "Reflection",
    date: "January 2024",
    media: "Digital",
    desc: "A fairly normal portrait with a slightly off-putting reflection...",
  },
];

interface ModalProps {
  title: string;
  imgs: string[];
  date: string;
  media: string;
  awards: string | undefined;
  desc: string;
}

interface ArtProps {
  dark: boolean;
}
export default function Art({ dark }: ArtProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [attributes, setAttributes] = useState<ModalProps>();
  const onClick = (piece: Partial<ModalProps>) => {
    // open modal
    setModalOpen((prev) => !prev);
    setAttributes({
      title: piece.title || "",
      imgs: piece.imgs || [],
      date: piece.date || "",
      media: piece.media || "",
      awards: piece.awards || "",
      desc: piece.desc || "",
    });
  };

  return (
    <main className="main pt-[5vh] min-h-[95vh] pb-[9vh]">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        className="w-full ml-[2vw]"
      >
        <Masonry>
          {art.map((piece, ind) => {
            return (
              <div
                className="relative w-fit"
                key={ind}
                onClick={() => onClick(piece)}
              >
                <img className="w-full !m-[1vw]" src={piece.imgs[0]} alt="" />
                <div className="absolute top-0 overlay w-[90%] h-full opacity-0 hover:opacity-50 bg-black rounded-lg flex justify-center items-center z-2">
                  <h1 className="!text-white opacity-100 text-[2.8vw] z-3 text-center !m-0">
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
      {modalOpen && (
        <Modal
          title={attributes!.title}
          imgs={attributes!.imgs}
          date={attributes!.date}
          media={attributes!.media}
          awards={attributes?.awards}
          desc={attributes!.desc}
          setModalOpen={setModalOpen}
          dark={dark}
        />
      )}
    </main>
  );
}
