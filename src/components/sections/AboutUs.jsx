import React from "react";
import { useTranslation } from "react-i18next";
import cars from "./../../assets/images/showroom.jpg";

export const AboutUs = () => {
  const { t } = useTranslation();

  const stats = [
    {
      value: "8",
      suffix: t("aboutUs.stats.years", "years"),
      text: t("aboutUs.stats.yearsText", "We have come a long way from a 2-person company to winning a Webby Award."),
    },
    {
      value: "72",
      suffix: t("aboutUs.stats.cars", "cars"),
      text: t("aboutUs.stats.carsText", "Exclusive luxury fleet with regular updates and top configurations."),
    },
    {
      value: "190",
      suffix: t("aboutUs.stats.people", "team members"),
      text: t("aboutUs.stats.peopleText", "Dedicated concierges and technicians delivering flawless service 24/7."),
    },
  ];

  return (
    <section id="about-us" className="relative w-full overflow-hidden bg-neutral-950 text-white">
      <svg
        className="pointer-events-none absolute -top-4 right-0 h-40 w-40 opacity-[0.07] sm:h-56 sm:w-56"
        viewBox="0 0 200 200"
        fill="none"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={i}
            x1={0}
            y1={20 * i}
            x2={20 * i}
            y2={0}
            stroke="white"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="relative mx-auto flex max-w-md flex-col items-center px-6 pb-10 pt-14 sm:max-w-2xl sm:px-10">
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-6xl text-white">
          {t("aboutUs.title", "About Us")}
        </h2>

        <div className="mt-10 grid w-full grid-cols-3 gap-3 sm:mt-14 sm:gap-8">
          {stats.map((s, idx) => (
            <div key={idx} className="text-left">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-cyan-400 sm:text-5xl">
                  {s.value}
                </span>
                <span className="text-xs font-medium text-neutral-300 sm:text-base">
                  {s.suffix}
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-snug text-neutral-400 sm:text-sm">
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mt-12 sm:mt-16">
          <span className="absolute -left-4 -top-6 font-serif text-6xl text-cyan-400/80 sm:-left-8 sm:-top-8 sm:text-8xl select-none">
            “
          </span>
          <blockquote className="text-center text-lg font-semibold leading-snug sm:text-2xl">
            {t("aboutUs.quote.part1", "I have been working with cars for more than")}{" "}
            <span className="text-neutral-400">
              {t("aboutUs.quote.yearsHighlight", "18 years.")}
            </span>{" "}
            {t("aboutUs.quote.part2", "My passion for automobiles and")}{" "}
            <span className="text-cyan-400">
              {t("aboutUs.quote.detailsHighlight", "attention to detail")}
            </span>{" "}
            {t("aboutUs.quote.part3", "will make your experience with us unforgettable.")}{" "}
            <span className="text-cyan-400">
              {t("aboutUs.quote.guaranteed", "Guaranteed.")}
            </span>
          </blockquote>
          <span className="absolute -bottom-10 -right-4 font-serif text-6xl text-cyan-400/80 sm:-right-8 sm:-bottom-14 sm:text-8xl select-none">
            ”
          </span>
        </div>

        <div className="mt-10 text-center sm:mt-14">
          <p className="text-sm font-semibold sm:text-base">
            {t("aboutUs.author.name", "Kirill Aliev, MBA")}
          </p>
          <p className="text-xs text-neutral-400 sm:text-sm">
            {t("aboutUs.author.role", "CEO Trinity car rental boutique")}
          </p>
        </div>
      </div>

      <div className="relative mt-4 h-[300px] w-full sm:h-[440px]">
        <img
          src={cars}
          alt={t("aboutUs.imageAlt", "Cars in the showroom")}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default AboutUs;
