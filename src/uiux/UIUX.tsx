import "./uiux.css";
import respred from "/respred/respred.png";
import abtest from "/ab/bchange.png";
import dev from "/dev/dev.png";
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
];

export default function UIUX() {
  return (
    <main>
      <h1>UIUX Projects</h1>
      <div className="box-grid">
        {projects.map((project) => {
          return (
            <Box
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
