import "./uiux.css";
import "../App.css";
import respred from "/respred/respred.png";
import abtest from "/ab/bchange.png";
import dev from "/dev/dev.png";
import iter from "/iter/iter.png";
import Box from "./Box";

const projects = [
  {
    title: "Responsive Redesign",
    outsidelink: "https://jackieac04.github.io/responsive-redesign/",
    insidelink: "/respred",
    skills: ["HTML", "CSS", "Figma", "Responsive Design"],
    img: respred,
  },
  {
    title: "A/B Testing",
    outsidelink: null,
    insidelink: "/abtest",
    skills: ["HTML", "CSS", "Responsive Design"],
    img: abtest,
  },
  {
    title: "Development",
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
  {
    title: "Iterative Design: MiFonda Storefront",
    outsidelink:
      "https://www.figma.com/file/iRwhq0w4NT9zuXu6B2jSnr/Iterative-Design?type=design&node-id=0%3A1&mode=design&t=yh6F5DzZbUdHwOFx-1",
    insidelink: "/iter",
    skills: ["Figma", "Responsive Design"],
    img: iter,
  },
];

export default function UIUX() {
  return (
    <main
      className="relative w-screen h-fit"
    >
      <h1 className="text-5xl">UIUX Projects</h1>
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
