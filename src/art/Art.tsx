import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import "./art.css";
import { useState } from "react";

export default function Art() {
  const [value, setValue] = useState<string>("0");

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  return (
    <main className="main">
      <div className="left">
        <div className="flex w-[95vw] my-8">
          <TabContext value={value}>
            <TabList
              onChange={() => handleChange}
              orientation="vertical"
              className="w-[1/5] mr-4"
            >
              <Tab
                className="tab self-start"
                label="Bookarts & Sculpture"
                value={"0"}
              ></Tab>

              <Tab
                className="tab self-start"
                label="Graphic Design & Illustration"
                value={"1"}
              ></Tab>
              <Tab
                className="tab self-start"
                label="Painting"
                value={"2"}
              ></Tab>
              <Tab
                className="tab self-start"
                label="Printmaking"
                value={"3"}
              ></Tab>
            </TabList>
            <div className="right">
              <TabPanel value={"1"}>Item One</TabPanel>
              <TabPanel value={"2"}>Item Two</TabPanel>
              <TabPanel value={"3"}>Item Three</TabPanel>
              <TabPanel value={"0"}>Item 4</TabPanel>
            </div>
          </TabContext>
        </div>
      </div>
    </main>
  );
}
