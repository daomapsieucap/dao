type Social = {
  label: string;
  link: string;
};

type Presentation = {
  mail: string;
  title: string;
  description: string;
  socials: Social[];
  profile?: string;
};

const presentation: Presentation = {
  mail: "bichdao.chau@gmail.com",
  title: "Hi, I’m Dao 👋",
  // profile: "/profile.webp",
  description:
    "Hello, i'm Dao - a WordPress developer with over 6 years of web experience. I am currently working with WordPress as a backend role including hosting suggestion, tech support.",
  socials: [
    {
      label: "Github",
      link: "https://github.com/daomapsieucap",
    },
    {
      label: "X",
      link: "https://twitter.com/daomapsieucap",
    },
  ],
};

export default presentation;
