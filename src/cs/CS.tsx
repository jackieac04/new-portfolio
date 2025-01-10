import Box from "../uiux/Box";
import bathrooms from "/cs/bathrooms.png";
import pab from "/cs/pabhome.png";
import dream from "/cs/dream.png";
import ter from "/cs/ter.png";

const projects = [
  {
    title: "Terrarium World",
    outsidelink: "https://github.com/jackieac04/Terrarium-World",
    insidelink: "/terworld",
    skills: ["JavaScript", "Threejs", "React Three Fiber", "Blender", "Drei"],
    img: ter,
  },
  {
    title: "Posters@Brown",
    outsidelink: null,
    insidelink: "/pab",
    skills: [
      "Java",
      "SpringBoot",
      "MongoDB",
      "APIs",
      "Responsive Design",
      "TypeScript",
      "React",
      "Fullstack Development",
      "Figma",
    ],
    img: pab,
  },
  {
    title: "Bathrooms@Brown",
    outsidelink: "https://devpost.com/software/bathrooms-brown",
    insidelink: "/bath",
    skills: ["TypeScript", "React", "MapBox", "Frontend Development", "Figma"],
    img: bathrooms,
  },

  {
    title: "Dreamweaver",
    outsidelink: "https://dreamweaver-ten.vercel.app/",
    insidelink: "/dream",
    skills: [
      "TypeScript",
      "React",
      "Frontend Development",
      "APIs",
      "Figma",
      "Digital Illustration",
      "Adobe Illustrator",
    ],
    img: dream,
  },
];

export default function CS() {
  return (
    <main className="relative w-screen pt-[5vh] pb-[8vh] ">
      <div className="flex items-center justify-center">
        {/* <Flowers dark={dark} video={flowersPink} videoDark={flowersPinkdark} /> */}
        <h1>CS Projects</h1>
        {/* <Flowers dark={dark} video={flowersPink} videoDark={flowersPinkdark} /> */}
      </div>

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
