import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className={
        " px-[1rem] py-[1rem] md:px-[4rem] flex justify-between bottom-[2rem] w-full"
      }
    >
      <div
        className="z-10 w-[40%] flex justify-between gap-x-2 "
        style={{ transform: "translateY(-25%)" }}
      >
        <Link to={"mailto: jaclyn_cohen@brown.edu"} target="_blank">
          <div className={"email"}>
            <p className="!text-[.8rem] md:!text-[1.4rem]">Email</p>
          </div>
        </Link>
        <Link to={"https://github.com/jackieac04"} target="_blank">
          <div className={"git"}>
            <p className="!text-[.8rem] md:!text-[1.4rem]">Github</p>
          </div>
        </Link>
        <Link
          to={"https://www.linkedin.com/in/jaclyn-a-cohen/"}
          target="_blank"
        >
          <div className={"linked "}>
            <p className="!text-[.8rem] md:!text-[1.4rem]">Linkedin</p>
          </div>
        </Link>

        <Link to={"https://instagram.com/leafysheepy/"} target="_blank">
          <div className={"inst"}>
            <p className="!text-[.8rem] md:!text-[1.4rem]">Instagram</p>
          </div>
        </Link>
      </div>
      <div className="z-10">
        <p className="!text-[.8rem] md:!text-[1.4rem]">
          Made with leafy sheepy
        </p>
      </div>
    </footer>
  );
}
