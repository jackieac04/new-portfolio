import { Link } from "react-router-dom";
interface HomeProps {
  dark: boolean;
}
export default function Footer({ dark }: HomeProps) {
  return (
    <footer
      className={
        (dark ? "d" : "l") +
        " h-[5vh] py-[2vh] px-[10%] m-0 flex justify-between absolute top-[95%]"
      }
    >
      <div
        className="z-10 w-[35%] flex justify-between "
        style={{ transform: "translateY(-25%)" }}
      >
        <Link to={"mailto: jaclyn_cohen@brown.edu"} target="_blank">
          <div
            className={(dark ? "d" : "l") + "email w-[5vw] h-[5vw] py-[1vh]"}
          />
        </Link>
        <Link to={"https://github.com/jackieac04"} target="_blank">
          <div
            className={(dark ? "d" : "l") + "git w-[5vw] h-[5vw] py-[1vh]"}
          />
        </Link>
        <Link
          to={"https://www.linkedin.com/in/jaclyn-a-cohen/"}
          target="_blank"
        >
          <div
            className={(dark ? "d" : "l") + "linked w-[5vw] h-[5vw]"}
            style={{ transform: "translateY(-.5vh)" }}
          />
        </Link>
        <Link to={"https://discordapp.com/users/leafysheepy/"} target="_blank">
          <div
            className={(dark ? "d" : "l") + "discord w-[5vw] h-[5vw] py-[1vh]"}
          />
        </Link>

        <Link to={"https://instagram.com/leafysheepy/"} target="_blank">
          <div
            className={(dark ? "d" : "l") + "inst w-[5vw] h-[5vw] py-[1vh]"}
          />
        </Link>
      </div>
      <div className="z-10">
        <p>Made with leafy sheepy</p>
      </div>
    </footer>
  );
}
