import "./uiux.css";
import "../App.css";
import respred from "/respred/respred.png";
import dev from "/dev/dev.png";
import iter from "/iter/iter.png";
import Box from "./Box";
import blt from "/blt/blt.png";

const projects = [
  {
    title: "MiFonda Storefront",
    outsidelink:
      "https://www.figma.com/file/iRwhq0w4NT9zuXu6B2jSnr/Iterative-Design?type=design&node-id=0%3A1&mode=design&t=yh6F5DzZbUdHwOFx-1",
    insidelink: "/iter",
    skills: ["Figma", "Responsive Design"],
    img: iter,
  },
  {
    title: "Brown Development Labs",
    outsidelink:
      "https://www.figma.com/file/iRwhq0w4NT9zuXu6B2jSnr/Iterative-Design?type=design&node-id=0%3A1&mode=design&t=yh6F5DzZbUdHwOFx-1https://www.figma.com/file/5mJuDRxe0lTrI8aTfhqlNC/BLT?type=design&node-id=0-1&mode=design&t=ENBatz69SPoOvabt-0",
    insidelink: "/blt",
    skills: ["Figma", "Responsive Design"],
    img: blt,
  },
  {
    title: "Responsive Redesign",
    outsidelink: "https://jackieac04.github.io/responsive-redesign/",
    insidelink: "/respred",
    skills: ["HTML", "CSS", "Figma", "Responsive Design"],
    img: respred,
  },
  // {
  //   title: "A/B Testing",
  //   outsidelink: null,
  //   insidelink: "/abtest",
  //   skills: ["HTML", "CSS", "Responsive Design"],
  //   img: abtest,
  // },
  {
    title: "My Garden",
    outsidelink: "https://jackieac04.github.io/MyGarden/",
    insidelink: "/dev",
    skills: [
      "React",
      "TypeScript",
      "HTML",
      "CSS",
      "Figma",
      "Responsive Design",
    ],
    img: dev,
  },
];

export default function UIUX() {
  return (
    <main className="page relative w-screen h-fit pt-[5vh] pb-[12vh]">
      <div className="flex items-center justify-center">
        {/* <Flowers dark={dark} video={flowersPink} videoDark={flowersPinkdark} /> */}
        <h1>UIUX Projects</h1>
        {/* <Flowers dark={dark} video={flowersPink} videoDark={flowersPinkdark} /> */}
      </div>
      <div className="box-grid h-fit">
        {projects.map((project, indx) => {
          return (
            <Box
              key={indx}
              outsidelink={project.outsidelink}
              insidelink={project.insidelink}
              skills={project.skills}
              img={project.img}
              title={project.title}
            />
          );
        })}
      </div>
    </main>
  );
}
