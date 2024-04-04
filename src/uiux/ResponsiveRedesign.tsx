import respred from "/respred/respred.png";
import amsog from "/respred/amsog.png";
import proglist from "/respred/programlist.png";
import blind from "/respred/9blind.png";
import mobile from "/respred/mobile.png";
import tablet from "/respred/tablet.png";
import desktop from "/respred/desktop.png";
import desktophifi from "/respred/desktophifi.png";
import tablethifi from "/respred/tablethifi.png";
import mobilehifi from "/respred/mobilehifi.png";
import designguide from "/respred/designguide.png";
import "./uiux.css";

export default function ResponsiveRedesign() {
  return (
    <main>
      <div className="top">
        <h1>
          Responsive Redesign: American Mathematical Society Program Listings
        </h1>
        <div className="skillswrap">
          <img
            src={respred}
            alt="An image of a redesigned page for the American Mathematical Society's Program Listings"
          />
          <div className=""></div>
          <div className="skills">
            <div className="skill HTML">HTML</div>
            <div className="skill CSS">CSS</div>
            <div className="skill Figma">Figma</div>
            <div className="skill Responsive">Responsive Design</div>
          </div>
        </div>
      </div>
      <div className="content">
        <h3>The Problem</h3>
        <p>
          The <b> American Mathematical Society </b> is an association dedicated
          to advancing research by providing various opportunities to
          mathemeticians and students alike.
        </p>
        <p>
          However, an issue evident from their listings page is that the website
          is inacessible and hard to navigate.
        </p>
        <img
          className="amsog"
          src={amsog}
          alt="The original AMS program listings page."
        />
        <p>
          <ul>
            <b> Some issues I identified were: </b>
            <li>
              Many of the icons don't have clear correspondences between their
              images and meanings (why is the face with sunglasses indicative of
              programs you can apply to online?)
            </li>
            <li>
              The information is dense, and because all types of information are
              laid out horizontally, it's difficult to parse what you're looking
              for.
            </li>
            <li>
              The filters are placed in multiple different formats and on
              various parts of the page, making it hard to tell which are
              mutually exclusive.
            </li>
            <li>
              The general layout is visually confusing; the search bar is quite
              small and in the upper-right corner, the department logos are un
              justified on the right sides of each department.
            </li>
          </ul>
        </p>
        <h3>Part One: Mockups</h3>
        <div className="mocks">
          <img
            src={blind}
            alt="An image of 9 initial sketches inspired by various interfaces."
          />
          <img src={proglist} alt="A final hand-drawn sketch" />
        </div>
        <p className="mockt">
          First, I drew <b> nine sketches</b> inspired by various different
          types of layouts that could represent the general structure of the
          page, such as the classic vertical layout, and slightly more dynamic
          combinations of vertical and horizontal layouts.
        </p>
        <p className="mockt">
          I also had some fun with it, taking inspiration from popular social
          medias such as <b>Pinterest, Tinder, Courses@Brown,</b> and even
          <b> Fruit Ninja.</b>
        </p>
        <p className="mockt">
          After making these nine sketches, I decided to go with the final
          design being a combination of <b> vertical scrolling</b> and a
          <b> fixed horizontal filtering element</b>, as represented by the
          right image.
        </p>
        <h3>Part Two: Lofi and Hifi Prototypes</h3>
        <div className="lofi">
          <img className="desktop" src={desktop} alt="Lofi- desktop" />
          <p>
            <ul>
              <li>
                The search bar is at the top of the page instead of the right,
                for clearer point of vision.
              </li>
              <li>
                All of the filters are located in one place, with dropdowns to
                indicate those which are mutually exclusive and checkboxes for
                those that are not.{" "}
              </li>
              <li>
                Special types of programs are represented with icons for quick
                visual cues.
              </li>
              <li>
                Each program is contained in a colored box to keep them visually
                distinct.
              </li>
            </ul>
          </p>
          <img className="tablet" src={tablet} alt="Lofi- tablet" />
          <p>
            <ul>
              <li>
                The filter and search bar are sticky while the programs scroll,
                so that users can quickly change filters at any point.
              </li>
              <li>
                The dates and details are organized vertically so that the
                information is located visually in the same place.
              </li>
              <li>
                Having more details on the main page reduces the number of
                clicks a user has to make to decide if they want to apply to a
                program.
              </li>
              <li>
                The nav bar contains all of the links to external pages and
                allows a user to login.
              </li>
            </ul>
          </p>
          <img className="mobile" src={mobile} alt="Lofi- mobile" />
          <p>
            <ul>
              <li>
                In tablet and mobile, filters are placed at the top just below
                the search bar for ease of access.
              </li>
              <li>
                On all three versions, information scrolls vertically for
                consistency.
              </li>
              <li>
                There are clearer delineations of space so the user can tell
                where each sections ends.
              </li>
              <li>
                On mobile, the nav bar becomes a dropdown hamburger menu to
                maintain size and readability of links.
              </li>
            </ul>
          </p>
        </div>
        <div className="hifi">
          <div className="mockst">
            <img id="hifiimg1" src={mobilehifi} alt="mobile- hifi" />
            <img id="hifiimg2" src={desktophifi} alt="desktop- hifi" />
            <img id="hifiimg3" src={tablethifi} alt="tablet- hifi" />
          </div>
          <p className="btm">
            The three hifi prototypes resulting from the lofi mockups, with
            colors, borders, and fonts taken into consideration.
          </p>

          <p className="btm">
            These hifis were based on this <b>style guide:</b>{" "}
          </p>
          <div className="mockst">
            <img
              id="designg"
              src={designguide}
              alt="the style guide, with each component laid out"
            />
          </div>
          <p>
            Which details the different font sizes, colors, and components that
            make up the webpage.
          </p>
        </div>
        <h3>Part Three: Making The Webpage</h3>
        <p>
          The final project was made purely in <b>HTML and CSS,</b> with no
          clickable elements. It ended up closely, but not exactly following the
          hifi:
        </p>
        <div className="mockst">
          <img
            src={respred}
            alt="An image of a redesigned page for the American Mathematical Society's Program Listings"
          />
        </div>
        <p>
          {" "}
          And you can find it at{" "}
          <a href="https://jackieac04.github.io/responsive-redesign/">
            this link.
          </a>
        </p>
        <h3>Final Thoughts</h3>
        <p className="btm">
          In summary, this project challenged me to think of every step of the
          design process, from the needs of the user (students and academics
          searching for mathematical opportunities) to accessibilty (the website
          looks the same for blue-weak colorblind folks!) to best layouting
          practices with CSS and even aesthetics.
        </p>
        <p className="btm">
          I had a lot of fun with it and I hope you liked looking at my
          redesign!
        </p>
      </div>
    </main>
  );
}
