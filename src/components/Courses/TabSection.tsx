import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import { CourseLessonInterface } from "../../interfaces";

import AboutCourse from "./AboutCourse";
import CommentCourse from "./CommentCourse";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface CourseTabSectionProps {
  lesson?: CourseLessonInterface;
  about?: string;
  isEnroll: boolean;
}

const CourseTabSection: React.FC<CourseTabSectionProps> = ({
  lesson,
  about,
  isEnroll,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabChange = (_: any, newIndex: number) => {
    setActiveTabIndex(newIndex);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTabIndex}
          onChange={handleTabChange}
          aria-label="course tabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#ef6c35",
              height: "2px",
            },
          }}
          className="bg-neutral-900"
        >
          <Tab
            label="About"
            {...a11yProps(0)}
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "12px",
              backgroundColor: "neutral.700",
              "&.Mui-selected": {
                color: "#fff",
              },
            }}
          />
          <Tab
            label="Discussions"
            {...a11yProps(1)}
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "12px",
              backgroundColor: "neutral.700",
              "&.Mui-selected": {
                color: "#fff",
              },
            }}
          />
        </Tabs>
      </Box>
      <CourseTabPanel value={activeTabIndex} index={0}>
        <AboutCourse about={about} lesson={lesson} />
      </CourseTabPanel>
      <CourseTabPanel value={activeTabIndex} index={1}>
        <CommentCourse isEnroll={isEnroll} lesson={lesson} />
      </CourseTabPanel>
    </Box>
  );
};

function CourseTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `course-tab-${index}`,
    "aria-controls": `course-tabpanel-${index}`,
  };
}

export default CourseTabSection;
