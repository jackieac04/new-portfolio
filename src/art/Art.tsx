import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./art.css";

export default function Art() {
  return (
    <main className="main">
      <div className="left">
        <div className="tabs">
          <Tabs orientation="vertical">
            <Tab className="tab" label="Digital Illustration" value={0}></Tab>
            <Tab className="tab" label="Graphic Design" value={1}></Tab>
            <Tab className="tab" label="Painting" value={2}></Tab>
            <Tab className="tab" label="Printmaking" value={3}></Tab>
          </Tabs>

          {/* <TabPanel value={value} index={0}>
            Item One
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel> */}
        </div>
      </div>
      <div className="right">Hi</div>
    </main>
  );
}
