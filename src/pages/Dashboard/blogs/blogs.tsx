import { useState } from "react";
import Loader from "../../../components/Loader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BlogSection from "../../../components/Blogs/BlogSection";

interface CustomTabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const Blogs: React.FC = () => {
  const isLoading = false;
  const [value, setValue] = useState<number>(0);

  const handleOnTabChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full max-w-screen-xl min-h-screen md:pt-24 py-5 m-auto">
      <div className="w-full flex items-center justify-center">
        <div>
          <h1 className="md:text-4xl text-2xl text-white text-center font-semibold mt-4">
            Coding Insights and Innovations
          </h1>
          <p className="text-neutral-300 text-center mt-2 md:text-xl text-sm">
            Explore the World of Code: Tutorials, Tips, and Trends in
            Programming
          </p>
        </div>
      </div>
      <div className="md:my-20 my-14">
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleOnTabChange}
            centered
            TabIndicatorProps={{ style: { display: "none" } }} // Hide the indicator line
            classes={{ root: "custom-tabs-root" }}
            className="md:mb-20 mb-14"
          >
            <Tab
              label="Trending"
              {...a11yProps(0)}
              sx={{
                color: value === 0 ? "#ef6c35 !important" : "white !important",
              }}
              classes={{ root: "custom-tab-root" }}
            />
            <Tab
              label="Latest"
              {...a11yProps(1)}
              sx={{
                color: value === 1 ? "#ef6c35 !important" : "white !important",
              }}
              classes={{ root: "custom-tab-root" }}
            />
            <Tab
              label="Favorites"
              {...a11yProps(2)}
              sx={{
                color: value === 2 ? "#ef6c35 !important" : "white !important",
              }}
              classes={{ root: "custom-tab-root" }}
            />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <BlogSection blogsType={"trending"} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <BlogSection blogsType={"latest"} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <BlogSection blogsType={"favorites"} />
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

const CustomTabPanel: React.FC<CustomTabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="text-white"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

export default Blogs;
