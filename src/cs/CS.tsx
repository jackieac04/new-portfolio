import Box from "../uiux/Box";
import bathrooms from "/cs/bathrooms.png";
import pab from "/cs/pabhome.png";
import dream from "/cs/dream.png";

const projects = [
  {
    title: "Posters@Brown",
    outsidelink: null,
    insidelink: "/pab",
    skills: [
      "Java",
      "SpringBoot",
      "MongoDB",
      "APIs",
      "TypeScript",
      "React",
      "MapBox",
      "Fullstack Development",
      "Responsive Design",
    ],
    img: pab,
  },
  {
    title: "Bathrooms@Brown",
    outsidelink: "https://devpost.com/software/bathrooms-brown",
    insidelink: "/bath",
    skills: ["TypeScript", "React", "MapBox", "Frontend Development"],
    img: bathrooms,
  },
  {
    title: "Dreamweaver",
    outsidelink: "https://dreamweaver-ten.vercel.app/",
    insidelink: "/dream",
    skills: ["TypeScript", "React", "Frontend Development", "APIs"],
    img: dream,
  },
];

export default function CS() {
  return (
    <main className="relative w-screen min-h-[93vh] pt-[5vh]">
      <h1 className="text-5xl">CS Projects</h1>
      <div className="box-grid h-fit">
        {" "}
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
