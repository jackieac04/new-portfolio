import bog from "/ab/bog.png";
import bchange from "/ab/bchange.png";
import misclickdata from "/ab/misclickdata.png";
import misclickhista from "/ab/misclickhista.png";
import misclickhistb from "/ab/misclickhistb.png";
import timespentdata from "/ab/timespentdata.png";
import timespenthista from "/ab/timespenthista.png";
import timespenthistb from "/ab/timespenthistb.png";
import firstclickdata from "/ab/firstclickdata.png";
import firstclickhista from "/ab/firstclickhista.png";
import firstclickhistb from "/ab/firstclickhistb.png";

import "./uiux.css";

export default function AB() {
  return (
    <main>
      <div className="top">
        <h1>A/B Testing</h1>
        <img
          src={bchange}
          alt="An image of the website after changes have been made."
        />
        <div className=""></div>
        <div className="skills">
          <div className="skill HTML">HTML</div>
          <div className="skill CSS">CSS</div>
          <div className="skill Responsive">Responsive Design</div>
        </div>
      </div>
      <div className="content">
        <h3>Project Overview</h3>
        <p className="btm">
          In this project, I aim to prove whether or not a few small changes to
          the user interface of a website can have a substantial effect on the
          user experience; namely:
          <b> do users find elements they're looking for more quickly? </b>I
          think this question is important because a quicker experience for the
          user is a smoother and less frustrating one. Ideally, users should not
          have any doubt about where to look or what to click.
        </p>
        <p className="btm">
          To test this goal, I had approximately twenty users test two different
          versions of a site and try to make an appointment with a doctor on a
          certain date. A/B testing is the perfect method for this question
          because it allows me to determine the likelihood that users are
          spending less time on the site to a statistically significant measure.
        </p>
        <div className="mocks">
          <img
            src={bog}
            alt="An image of the website before changes have been made."
          />
          <img
            src={bchange}
            alt="An image of the website after changes have been made."
          />
        </div>
        <p>The site before and after changes were made.</p>
        <p>
          <ul className="none">
            Notable changes include:
            <li>
              Each appointment has more space and is delineated by a slight
              bottom shadow, so that it's easier to tell which buttons are for
              which appointments.
            </li>
            <li>
              Buttons are dark blue, to increase contrast between the text and
              the button. Likewise, doctor names are dark blue, to make this
              important information easier to find.
            </li>
            <li>
              Dates have a dark blue background, to distinguish them from the
              rest of the information on the appointment.
            </li>
          </ul>
        </p>
        <h3>Hypotheses</h3>
        <p>
          The three metrics I analyzed the data on are:
          <ul>
            <li className="btm">
              <b>
                The frequency users click something else on the page before
                finding the correct button for the task
              </b>
              <ul>
                <li>
                  <b>Null Hypothesis:</b> There is no difference between the
                  misclick rates of the two versions.
                </li>
                <li>
                  <b>Alternative Hypothesis:</b> There is a lower misclick rate
                  in ther modified version.
                  <ul>
                    <li>
                      Buttons have greater color contrast and spacing, so people
                      will know which one to click.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="btm">
              <b>Time users spent on the webpage</b>
              <ul>
                <li>
                  <b>Null Hypothesis:</b> There is no difference between the
                  amount of time users spent on the two pages.
                </li>
                <li>
                  <b>Alternative Hypothesis:</b> Users spent less time on the
                  modified page.
                  <ul>
                    <li>
                      Location of each appointment is more clearly delineated
                      with greater spacing and a border, so people will feel
                      less hesitant about what to click and won't have to spend
                      as much time looking around the page.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <b>
                Time users spent on the webpage before they clicked something
                for the first time
              </b>
              <ul>
                <li>
                  <b>Null Hypothesis:</b> There is no difference between the
                  amount of time users spent on the two pages before they
                  clicked something for the first time.
                </li>
                <li>
                  <b>Alternative Hypothesis:</b> Users spent less time on the
                  modified page before they clicked something for the first
                  time.
                  <ul>
                    <li>
                      For the same reason as above,the location of each
                      appointment is more clearly delineated with greater
                      spacing and a border, so people will feel less hesitant
                      about what to click and won't have to spend as much time
                      looking around the page.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          I believe that I will <b>reject the null hypothesis</b> for all of
          them because the modified version has clearer visual cues of what to
          click and where to navigate to, so users will have a much easier time
          finding what they are looking for and executing the appointment
          creation.
        </p>
        <h3>Analysis</h3>
        <p className="btm">
          For all three metrics I chose to use the <b>one-tailed t test </b>
          because they all involve continuous data that looks at if the
          alternative hypothesis is less than the null hypothesis.
        </p>
        <div className="mocks">
          <img
            src={misclickhista}
            alt="isitogram A statistics for the first metric."
          />
          <img
            src={misclickhistb}
            alt="Histogram B statistics for the first metric."
          />
        </div>
        <p>
          <ul>
            <b>
              The frequency users click something else on the page before
              finding the correct button for the task
            </b>
            <li>
              The difference between the original and modified versions was
              statistically significant because the p-value was 0.0003.
              Therefore, I rejected the null hypothesis and concluded that there
              is a lower misclick rate in the modified version.
            </li>
          </ul>
        </p>
        <div className="mocks">
          <img
            src={timespenthista}
            alt="isitogram A statistics for the second metric."
          />
          <img
            src={timespenthistb}
            alt="Histogram B statistics for the second metric."
          />
        </div>
        <p>
          <ul>
            <b>Time users spent on the webpage</b>
            <li>
              The difference between the original and modified versions was
              statistically significant because the p-value was 0.0000000011.
              Therefore, I rejected the null hypothesis and concluded that users
              spend less time on the page in the modified version.
            </li>
          </ul>
        </p>
        <div className="mocks">
          <img
            src={firstclickhista}
            alt="isitogram A statistics for the second metric."
          />
          <img
            src={firstclickhistb}
            alt="Histogram B statistics for the second metric."
          />
        </div>
        <p>
          <ul>
            <b>
              Time users spent on the webpage before they clicked something for
              the first time
            </b>
            <li>
              The difference between the original and modified versions was
              statistically significant because the p-value was 0.0000069.
              Therefore, I rejected the null hypothesis and concluded that users
              spend less time on the page before their first click in the
              modified version.
            </li>
          </ul>
        </p>

        <h3>Summary Statistics</h3>
        <div className="mockss">
          <img src={misclickdata} alt="Summary statistics for metric 1." />
          <img src={timespentdata} alt="Summary statistics for metric 2." />
          <img src={firstclickdata} alt="Summary statistics for metric 3." />
        </div>
        <p>These images show the statistics for each metric, in order.</p>
        <p>
          For all three metrics, it is clear that version B (the modified
          version) has a lower average and variance than version A (the
          unmodified version). This indicates a stronger presence that the
          modified version allowed users to feel more comfortable navigating the
          interface, because the data was more tightly centered around a lower
          value in all three cases.
        </p>
        <h3>Conclusion</h3>
        <p className="btm">
          In conclusion, the A/B test conducted on this webpage allowed me to
          draw more definitive conclusions that modifying the interface caused
          users to spend less time on each aspect of creating an appointment,
          from finding the correct information to clicking the final button.
        </p>
      </div>
    </main>
  );
}
