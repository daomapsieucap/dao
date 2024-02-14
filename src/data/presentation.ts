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
    "Aliquam et amet vero magna nulla clita ex **diam et at sed magna**. Erat aliquyam ipsum accumsan sadipscing sed ea erat sed diam clita eirmod laoreet feugiat. Tempor feugait sed nisl lorem illum nonumy justo qui sit sanctus vero clita elit clita nonumy accusam amet.",
  socials: [
    {
      label: "X",
      link: "https://twitter.com/daomapsieucap",
    },
    {
      label: "Github",
      link: "https://github.com/daomapsieucap",
    },
  ],
};

export default presentation;
