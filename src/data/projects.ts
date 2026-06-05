export type Project = {
  title: string;
  platform: string;
  role: string;
  type: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "SleepyPants",
    platform: "shopify",
    role: "backend",
    type: "theme customization",
    link: "https://sleepypants.co.uk/",
  },
  {
    title: "Là Nhà Academy",
    platform: "wordpress",
    role: "backend",
    type: "built from scratch",
    link: "https://lanhaacademy.vn/",
  },
  {
    title: "Southern Star",
    platform: "shopify",
    role: "fullstack",
    type: "theme customization",
    link: "https://southernstarus.com/",
  },
  {
    title: "B-RISE",
    platform: "wordpress",
    role: "backend",
    type: "built from scratch",
    link: "https://b-rise.asia/",
  },
  {
    title: "AnyAlterations",
    platform: "wordpress",
    role: "fullstack",
    type: "theme customization",
    link: "https://anyalterations.com/",
  },
  {
    title: "Là Nhà",
    platform: "wordpress",
    role: "backend",
    type: "theme customization",
    link: "https://www.lanha.vn/",
  },
  {
    title: "Vizulize",
    platform: "wordpress",
    role: "fullstack",
    type: "theme customization",
    link: "https://vizulize.vn/",
  },
  {
    title: "SNKRS Nation",
    platform: "html",
    role: "fullstack",
    type: "just for fun",
    link: "https://snkrsnation.daochau.com/",
  },
];

export default projects;
