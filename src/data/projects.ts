export type Project = {
  title: string;
  techs: string[];
  link: string;
  isComingSoon?: boolean;
};

const projects: Project[] = [
  {
    title: "Là Nhà Academy",
    techs: ["WordPress", "Backend", "Build from scratch"],
    link: "https://lanhaacademy.vn/",
  },
  {
    title: "Southern Star",
    techs: ["Shopify", "Fullstack", "Theme Customization"],
    link: "https://southernstarus.com/",
  },
  {
    title: "B-RISE",
    techs: ["WordPress", "Backend", "Build from scratch"],
    link: "https://b-rise.asia/",
  },
  {
    title: "Benkon",
    techs: ["WordPress", "Fullstack", "Build from scratch"],
    link: "https://benkon.io/",
  },
  {
    title: "AnyAlterations",
    techs: ["WordPress", "Fullstack", "Theme Customization"],
    link: "https://anyalterations.com/",
  },
  {
    title: "Là Nhà",
    techs: ["WordPress", "Backend", "Theme Customization"],
    link: "https://www.lanha.vn/",
  },
  {
    title: "Decor Là Nhà",
    techs: ["WordPress", "Woocommerce", "Backend", "Theme Customization"],
    link: "https://decor.lanha.vn/",
  },
  {
    title: "Vizulize",
    techs: ["WordPress", "Fullstack", "Theme Customization"],
    link: "https://vizulize.vn/",
  },
  {
    title: "SNKRS Nation",
    techs: ["HTML", "Fullstack", "Just for fun"],
    link: "https://snkrsnation.daochau.com/",
  },
  {
    title: "GomGom",
    techs: ["WordPress", "Woocommerce", "Fullstack", "Theme Customization"],
    link: "https://www.thanhlygomgom.com/",
  },
  // {
  //   title: "Portfolio / Template",
  //   techs: ["Astro"],
  //   link: "/",
  //   isComingSoon: true,
  // },
];

export default projects;
