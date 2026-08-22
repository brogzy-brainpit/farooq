"use client";

import React, { useState } from "react";
import {AnimatePresence,motion,LayoutGroup} from "framer-motion";
import {Check,ArrowUpRight,Sparkles,Crown,ChevronRight} from "lucide-react";


const fullDetailPackages = [
  {
    name: "Full Maintenance",
    badge: "Refresh",
    recommended: false,
    image: "/assets/red2.webp",
    included: [
      "Interior vacuum",
      "Wipe all surfaces",
      "Minor stains",
      "Windows & mirrors",
      "Door jambs",
      "Floor mats",
      "Detail trunk",
      "Quick hand wash",
      "Wax protection",
      "Clean rims",
      "Clean tires",
    ],
  },

  {
    name: "Gold Premium",
    badge: "Most Popular",
    recommended: true,
    image: "/assets/1.png",
    included: [
      "Double vacuum interior",
      "Clean & protect plastic",
      "Stains (spot treatment)",
      "Detail floor mats & shine",
      "Wipe all surfaces",
      "Windows & mirrors",
      "Detail trunk",
      "Door jambs",
      "Professional hand wash",
      "Wax protection",
      "Detail rims",
      "Spot polish",
      "Wheel wells",
      "Detail tires",
    ],
  },

  {
    name: "Masterpiece Detail",
    badge: "V.I.P.",
    recommended: false,
    image: "/assets/inandout.jpg",
    included: [
      "Double vacuum interior",
      "Clean & protect plastic",
      "Stains (spot treatment)",
      "Detail floor mats & door jams",
      "Wipe all surfaces",
      "Windows & mirrors",
      "Detail trunk",
      "Door jambs",
      "Professional hand wash",
      "Wheel wells & door jams",
      "Paint enhancement polish",
      "Clay bar exterior",
      "Dress trim & tires",
      "Wax protection",
    ],
  },
];

const interiorPackages = [
  {
    name: "Maintenance",
    badge: "Refresh",
    recommended: false,
    image: "/assets/interior.jpg",
    included: [
      "Complete interior vacuum",
      "Wipe all surfaces",
      "Minor stains",
      "Windows & mirrors",
      "Detail floor mats & shine",
      "Detail trunk",
    ],
  },

  {
    name: "Deep Shampoo",
    badge: "Most Popular",
    recommended: true,
    image: "/assets/deep-shampoo.jpg",
    included: [
      "Deep clean treatment",
      "Shampoo all carpets & seats",
      "Double vacuum interior",
      "Stain extraction",
      "Clean & protect all plastic",
      "Windows & mirrors",
      "Detail floor mats & shine",
      "Detail trunk",
    ],
  },

  {
    name: "Mold Reset",
    badge: "Remediation",
    recommended: false,
    image: "/assets/mold-reset.png",
    included: [
      "Mold remediation treatment",
      "Shampoo seats & carpets",
      "Ozone odor treatment",
      "Double vacuum interior",
      "Wipe all surfaces",
      "Windows & mirrors",
      "Clean & protect plastic",
      "Detail floor mats & shine",
      "Detail trunk",
    ],
  },
];

const exteriorPackages = [
  {
    name: "Maintenance",
    badge: "Refresh",
    recommended: false,
    image: "/assets/red-benz.png",
    included: [
      "Basic 5 spot polish",
      "Professional hand wash",
      "Wheel wells",
      "Windows & mirrors",
      "Detail rims & tires",
      "Wax protection",
    ],
  },

  {
    name: "Wax & Buff",
    badge: "Most Popular",
    recommended: true,
    image: "/assets/buffing.png",
    included: [
      "Paint enhancement polish",
      "Professional hand wash",
      "Clay bar exterior",
      "Detail rims & tires",
      "Wheel wells",
      "Windows & mirrors",
      "Best wax protection",
    ],
  },

  {
    name: "Ceramic Coating",
    badge: "V.I.P.",
    recommended: false,
    image: "/assets/coating.png",
    included: [
      "Our best 9H & 10H coatings",
      "Ultimate gloss",
      "Maximum protection (5–10 years)",
      "Full exterior detail",
      "Hydrophobic and self-cleaning",
      "Same day completion",
      "CARFAX registered warranty",
    ],
  },
];


const categories = [
  {
    id: "fullDetail",
    label: "Full Detail",
    description:
      "The complete transformation. Interior and exterior care combined into one meticulous service.",
    packages: fullDetailPackages,
  },

  {
    id: "interior",
    label: "Interior",
    description:
      "Bring your cabin back to life with a deep, detailed clean from the seats to the smallest surfaces.",
    packages: interiorPackages,
  },

  {
    id: "exterior",
    label: "Exterior",
    description:
      "Restore your paint, wheels and finish with professional exterior detailing built to turn heads.",
    packages: exteriorPackages,
  },
];

/*ANIMATION VARIANTS */

const containerVariants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },

  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.97,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};


export default function Packages() {
  const [activeCategory, setActiveCategory] = useState("fullDetail");

  const [activePackage, setActivePackage] = useState(null);

  const currentCategory =categories.find((category) => category.id === activeCategory
) || categories[0];

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setActivePackage(null);
  };

  return (
    <section className="relative overflow-hidden bg-[#0b0b0b] py-24 text-white sm:py-32">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-background/5 blur-[140px]" />

        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-200px] top-[30%] h-[400px] w-[400px] rounded-full bg-white/[0.025] blur-[100px]"
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-brand-background" />

              <span className="text-minor font-body uppercase tracking-[0.25em] text-brand-background">
                Our Services
              </span>
            </motion.div>

            <motion.h2
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-heading1 font-custom leading-[0.95] tracking-[-0.05em]"
            >
              Your car.
              <br />

              <span className="text-brand-background">
                Our standard.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="max-w-md font-body text-minor leading-7 text-white/50 lg:pb-2"
          >
            Choose the level of care your vehicle deserves.
            Every service is performed with attention to
            detail and a commitment to a showroom-quality
            finish.
          </motion.p>
        </div>

        {/* ===================================================
            CATEGORY SWITCHER
        =================================================== */}

        <LayoutGroup>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-14"
          >

            <div className="relative flex w-full overflow-x-auto rounded-full border border-white/10 bg-white/[0.035] p-1.5 sm:w-fit">

              {categories.map((category) => {
                const isActive =
                  activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() =>
                      handleCategoryChange(
                        category.id
                      )
                    }
                    className="relative lg:min-w-[130px] min-w-[80px] flex-1 whitespace-nowrap rounded-full px-6 py-3.5 text-minor font-body font-mediu sm:flex-none"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategory"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                        className="absolute inset-0 rounded-full bg-brand-background"
                      />
                    )}

                    <span
                      className={`relative z-10 text-minor transition-colors ${
                        isActive
                          ? "text-brand-white"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      {category.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* CATEGORY DESCRIPTION */}

            <AnimatePresence mode="wait">
              <motion.p
                key={currentCategory.id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="mt-5 max-w-2xl text-minor font-body leading-6 text-white/40"
              >
                {currentCategory.description}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* =================================================
              PACKAGE CARDS
          ================================================= */}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid gap-5 lg:grid-cols-3"
            >
              {currentCategory.packages.map(
                (pkg, index) => {
                  const isOpen =
                    activePackage === pkg.name;

                  return (
                    <motion.div
                      key={pkg.name}
                      variants={cardVariants}
                      layout
                      className={`group relative overflow-hidden rounded-[28px] border ${
                        pkg.recommended
                          ? "border-brand-background/40"
                          : "border-white/10"
                      } bg-[#111111]`}
                    >

                      {/* POPULAR GLOW */}

                      {pkg.recommended && (
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(210,55,35),transparent_45%)]" />
                      )}

                      {/* CARD CONTENT */}

                      <div className="relative p-6 sm:p-8">

                        {/* BADGE */}

                        <div className="mb-8 flex items-center justify-between">

                          {pkg.badge ? (
                            <div
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-minor font-body font-semibold uppercase tracking-[0.15em] ${
                                pkg.recommended
                                  ? "bg-brand-background text-brand-white"
                                  : "bg-white/5 text-white/50"
                              }`}
                            >
                              {pkg.recommended ? (
                                <Sparkles
                                  size={12}
                                  strokeWidth={2}
                                />
                              ) : (
                                <Crown
                                  size={12}
                                  strokeWidth={2}
                                />
                              )}

                              {pkg.badge}
                            </div>
                          ) : (
                            <div />
                          )}

                          <span className="text-minor font-body text-white/20">
                            0{index + 1}
                          </span>
                        </div>

                        {/* TITLE */}

                        <div className="mb-8">
                          <h3 className="text-heading3 font-custom tracking-[-0.04em]">
                            {pkg.name}
                          </h3>

                          <p className="mt-2 text-minor font-body text-white/35">
                            Professional care, finished to
                            perfection.
                          </p>
                        </div>

                        {/* IMAGE */}

                        {pkg.image && (
                          <motion.div
                            className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-white/5"
                            whileHover="hover"
                          >
                            <motion.img
                              src={pkg.image}
                              alt={pkg.name}
                              variants={{
                                hover: {
                                  scale: 1.07,
                                },
                              }}
                              transition={{
                                duration: 0.8,
                                ease: [
                                  0.22,
                                  1,
                                  0.36,
                                  1,
                                ],
                              }}
                              className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          </motion.div>
                        )}

                        {/* INCLUDED */}

                        <div className="mb-8">

                          <div className="mb-4 flex items-center justify-between">

                            <span className="text-para font-body font-semibold uppercase tracking-[0.2em] text-white/30">
                              What&apos;s included
                            </span>

                            <span className="text-minor font-body text-white/20">
                              {pkg.included.length} services
                            </span>

                          </div>

                          <div className="space-y-3">

                            {(isOpen
                              ? pkg.included
                              : pkg.included.slice(0, 5)
                            ).map(
                              (
                                item,
                                itemIndex
                              ) => (
                                <motion.div
                                  key={item}
                                  initial={{
                                    opacity: 0,
                                    x: -10,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    x: 0,
                                  }}
                                  transition={{
                                    duration: 0.3,
                                    delay:
                                      itemIndex *
                                      0.025,
                                  }}
                                  className="flex items-center gap-3 text-minor font-body text-white/65"
                                >
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5">
                                    <Check
                                      size={11}
                                      className={
                                        pkg.recommended
                                          ? "text-brand-background"
                                          : "text-white/40"
                                      }
                                    />
                                  </span>

                                  <span>
                                    {item}
                                  </span>
                                </motion.div>
                              )
                            )}

                          </div>

                          {/* MORE BUTTON */}

                          {pkg.included.length > 5 && (
                            <button
                              onClick={() =>
                                setActivePackage(
                                  isOpen
                                    ? null
                                    : pkg.name
                                )
                              }
                              className="mt-5 flex items-center gap-2 text-minor font-body font-medium text-brand-background"
                            >
                              {isOpen
                                ? "Show less"
                                : `View ${
                                    pkg.included
                                      .length -
                                    5
                                  } more`}

                              <motion.span
                                animate={{
                                  rotate: isOpen
                                    ? 90
                                    : 0,
                                }}
                              >
                                <ChevronRight
                                  size={13}
                                />
                              </motion.span>
                            </button>
                          )}

                        </div>

                        {/* CTA */}

                        <motion.a
                          href="/contact"
                          whileHover={{
                            scale: 1.02,
                          }}
                          whileTap={{
                            scale: 0.98,
                          }}
                          className={`group/btn flex w-full items-center justify-between rounded-full px-5 py-4 text-para font-custom font-medium transition-colors ${
                            pkg.recommended
                              ? "bg-brand-background text-black hover:bg-[#d2ff3d]"
                              : "bg-brand-white text-brand-black hover:bg-brand-background hover:text-brand-white"
                          }`}
                        >
                          <span>
                            Get Free Quote
                          </span>

                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover/btn:rotate-45">
                            <ArrowUpRight
                              size={16}
                            />
                          </span>
                        </motion.a>

                      </div>

                      {/* BOTTOM ACCENT */}

                      <motion.div
                        initial={{
                          scaleX: 0,
                        }}
                        whileInView={{
                          scaleX: pkg.recommended
                            ? 1
                            : 0.3,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.4,
                        }}
                        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-brand-background"
                      />

                    </motion.div>
                  );
                }
              )}
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>

        {/* ===================================================
            BOTTOM CTA
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[24px] border border-white/10 bg-white/[0.025] p-6 sm:flex-row sm:items-center sm:p-8"
        >

          <div>
            <p className="mb-1 text-sm font-medium">
              Not sure which service is right for you?
            </p>

            <p className="text-sm text-white/35">
              Tell us what your vehicle needs and we&apos;ll
              recommend the right package.
            </p>
          </div>

          <motion.a
            href="#contact"
            whileHover={{
              x: 5,
            }}
            className="flex shrink-0 items-center gap-3 text-sm font-medium text-brand-background"
          >
            Talk to a detailer

            <ArrowUpRight size={17} />
          </motion.a>

        </motion.div>

      </div>
    </section>
  );
}