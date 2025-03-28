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
    "I'm a PHP backend developer with **9 years of experience** specializing in **WordPress**. As **Backend Lead at ViiVue**, I build and optimize corporate websites and eCommerce platforms using WooCommerce, with some experience in Shopify.",
  socials: [
    {
      label: "Github",
      link: "https://github.com/daomapsieucap",
    },
    {
      label: "Linkedin",
      link: "https://www.linkedin.com/in/dao-chau",
    },
  ],
};

export default presentation;
