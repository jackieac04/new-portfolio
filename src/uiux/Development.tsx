import dev from "/dev/dev.png";
import companal from "/dev/companal.png";
import hifi from "/dev/hifi.png";
import "./uiux.css";
import explore from "/dev/instagramexplore.png";
import iglike from "/dev/instagramlike.png";
import igsave from "/dev/instagramsave.png";

import pinhome from "/dev/pinteresthome.png";
import pinlike from "/dev/pinterestlike.png";
import pinboard from "/dev/pinterestboard.png";

import youhome from "/dev/youtubehome.png";
import youvid from "/dev/youtubevid.png";
import youliked from "/dev/youtubeliked.png";

export default function Development() {
  return (
    <main className="pt-[5vh] pb-[9vh]">
      <div className="outer">
        <div className="top">
          <h1>My Garden</h1>
          <div className="info">
            <div className="role">
              <h3>Role</h3>
              <p>Front end Developer, UI/UX Designer</p>
            </div>
            <div className="role">
              <h3>Duration</h3>
              <p>February 2024</p>
            </div>
            <div className="role">
              <h3>Team</h3>
              <p>Just me!</p>
            </div>
          </div>
          <div className="skillswrap">
            <img
              className="imgg"
              src={dev}
              alt="An image of the website after changes have been made."
            />
            <div className=""></div>
            <div className="skills">
              <div className="skill React">React</div>
              <div className="skill TypeScript">TypeScript</div>
              <div className="skill HTML">HTML</div>
              <div className="skill CSS">CSS</div>
              <div className="skill Figma">Figma</div>
              <div className="skill Responsive">Responsive Design</div>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="text">
          <div className="lef flex flex-col items-center col-span-9 mb-[2vw] outline">
            <h3>Project Overview</h3>
            <p className="btm">
              In this project, I aim to{" "}
              <b>
                {" "}
                create an interface for users to select and aggregate items from
                a list,
              </b>{" "}
              but with a twist: the main function of the app is to{" "}
              <b>collect plants to add to a personal garden. </b>
            </p>
          </div>
          <h3>Competitive Analysis</h3>
          <p className="btm">
            I first created a competitve analysis of some popular apps with
            similar favoriting and aggregating features:{" "}
            <b>
              <a href="https://instagram.com/">Instagram</a>,{" "}
              <a href="https://www.pinterest.com/">Pinterest</a>,
            </b>{" "}
            and{" "}
            <b>
              <a href="https://www.youtube.com/">YouTube</a>
            </b>{" "}
            to determine how these features are typically handled in large,
            public settings. My findings are displayed below:
          </p>
          <div className="mocks">
            <img
              className="imgg"
              id="comp"
              src={companal}
              alt="Competitive analysis chart"
            />
          </div>
          <p className="btm">
            The simplicity of the like and save buttons for Instagram works well
            because they are intuitive- one measure of public support and one of
            private. However, both Pinterest and YouTube have more features
            associated with their save functions, which gives them greater user
            customization. Additionally, it takes several more clicks to get
            from a user's main page to their saved/liked posts than Pinterest,
            which reflects the general use cases of each app- Instagram is
            largely for public interactions (where seeing previously liked
            content is deemphasized) while Pinterest is for more mixed usage-
            with the ability to create both public and private boards.
            Similarly, YouTube's user base is mixed; some use it as creators
            while others use it primarily to watch videos, and the reflection of
            its ability to create and customize playlists of liked content
            reflects this.
          </p>
          <div className="mockss">
            <img className="imgg" src={explore} alt="" />
            <img className="imgg" src={iglike} alt="" />
            <img className="imgg" src={igsave} alt="" />
          </div>
          <p className="btm">Instagram</p>
          <div className="mockss">
            <img className="imgg" src={pinhome} alt="" />
            <img className="imgg" src={pinlike} alt="" />
            <img className="imgg" src={pinboard} alt="" />
          </div>
          <p className="btm">Pinterest</p>
          <div className="mockss">
            <img className="imgg" src={youhome} alt="" />
            <img className="imgg" src={youvid} alt="" />
            <img className="imgg" src={youliked} alt="" />
          </div>
          <p className="btm">YouTube</p>
          <p className="btm">
            Each of these image sequences shows the progression of getting to
            the liked paged from the home pages of Instagram, Pinterest, and
            Youtube, respectively.
          </p>
          <p className="btm">
            Given this information and the simple functionality of my app, I
            believe that the most important features to include are:{" "}
            <b>
              {" "}
              making sure that when users select the same thing multiple times,
              it gets combined into the same feature, that all of the buttons
              and main content are accessible from the top of the page, and that
              the aggregator is visible as you are scrolling through the
              content.
            </b>{" "}
            While I do enjoy the extensive and varied options to portray
            liked/saved content on Pinterest and YouTube, I think that whether
            these are necessary is dependent on the specific interface.
          </p>
          <h3 id="mockup">Mockup</h3>
          <p className="btm">
            {" "}
            For this project, I only created one mid-fidelity mockup, and
            iterated on it as I made decisions about functionality and visuals.
            The result was this design in Figma:
          </p>
          <div className="mocks">
            <img className="imgg" src={hifi} alt="hifi mockup of my garden" />
          </div>
          <p className="btm">
            I used the design mainly to iterate on aesthetics: color choices,
            layouting, and deciding to use seed packets to display the item
            information to fit the garden theme.
          </p>
          <h3>My Garden</h3>
          <p className="btm">
            Users can filter by <b>plant type</b> (flower, fruit, grass,
            succulent, vegetable) and <b>hours of sunlight needed</b> (6, 8, or
            12) and can sort by <b>plant height</b> (from shortest to tallest).
            After clicking add seed, the plant will be added to their garden,
            with a total showing the number of plants they have. The garden
            displays the plant image, name, count, and two methods for removing
            them from the garden: a -1 that removes just one plant and an X that
            gets rid of all plants with the same name.
          </p>
          <p className="btm">
            {" "}
            You can view the completed page{" "}
            <a href="https://jackieac04.github.io/MyGarden/">here</a>.
          </p>
          <div className="lef flex flex-col items-center col-span-9 mb-[2vw] outline">
            <h3>Lessons Learned</h3>
            <p className="btm">
              In conclusion, with this project I learned how to develop a
              project by beginning with a comparison to existing interfaces,
              which allowed me to see what's already working, and what I can
              iterate on.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
