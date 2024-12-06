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
    "I am a seasoned PHP backend developer with **9 years of experience** specializing in WordPress development. As the **Backend Lead at ViiVue**, I have expertise in creating and maintaining corporate websites and eCommerce platforms powered by WooCommerce. While my primary focus is on WordPress, I also have some experience working with Shopify, enabling me to adapt to diverse project requirements. My goal is to **deliver robust, scalable, and efficient solutions tailored** to client needs.",
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
