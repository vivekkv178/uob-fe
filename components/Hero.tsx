import { Hero as HeroComponent, Stat } from "@vivekkv178/library";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Hero = () => {
  const data = {
    heroTitle: "Typescript, Next.js & Nest.js",
    heroDescription:
      "Honourable | Enterprising | United | Committed - We’re here to do Right By You.",
  };
  return (
    <div className="mb-20">
      <HeroComponent
        NavigationComponent={Link}
        heroImg={
          <div className="hidden xl:flex">
            <img
              src={`${process.env.NEXT_PUBLIC_CDN_PATH}/uob/Hero.png`}
              className="w-full h-full -mt-20 rounded-lg"
            />
          </div>
        }
        heroDescription={data?.heroDescription!}
        heroTitle={data?.heroTitle}
        heroText={<h1 className="h1 mb-4">{"United Overseas Bank (UOB)"}</h1>}
        primaryButton={{
          icon: <Icon icon="lucide:arrow-down" />,
          label: "Get Started",
          variant: "default",
          link: "#usecase",
        }}
        secondaryButton={{
          icon: <Icon icon="lucide:github" />,
          label: "Github",
          variant: "default",
          link: "https://github.com/vivekkv178/uob-fe",
          newTab: true,
        }}
      />
    </div>
  );
};

export default Hero;
