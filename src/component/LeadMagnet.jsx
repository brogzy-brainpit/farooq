"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LeadMagnet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Lead submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="font-body relative w-full max-w-[520px] overflow-hidden rounded-[28px] bg-[#f4f1eb] p-1 shadow-2xl"
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 25,
              scale: 0.96,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative overflow-hidden rounded-[25px] bg-[#f4f1eb]">
              {/* Decorative elements */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-black/[0.04]" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-black/[0.035]" />

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 text-black/60 transition-all duration-300 hover:bg-black hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4 4L12 12M12 4L4 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className="relative px-7 py-9 sm:px-10 sm:py-11">
                {!submitted ? (
                  <>
                    {/* Eyebrow */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="mb-5 flex items-center gap-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-black" />

                      <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-black/50">
                        Free for a limited time
                      </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-custom max-w-[420px] text-[38px] leading-[0.95] tracking-[-0.04em] text-black sm:text-[48px]"
                    >
                      Your website could be doing{" "}
                      <span className="text-black/40">more.</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 }}
                      className="mt-5 max-w-[410px] text-[14px] leading-[1.6] text-black/55 sm:text-[15px]"
                    >
                      Get a free website audit and discover the biggest things
                      holding your business back from turning visitors into
                      customers.
                    </motion.p>

                    {/* Benefits */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.34 }}
                      className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3"
                    >
                      {[
                        "Conversion issues",
                        "Design improvements",
                        "Actionable ideas",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-[11px] text-black/60"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-white">
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M2 5L4 7L8 3"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          {item}
                        </div>
                      ))}
                    </motion.div>

                    {/* Form */}
                    <motion.form
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-8 space-y-3"
                    >
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="font-body h-14 w-full rounded-xl border border-black/10 bg-white/70 px-4 text-sm text-black outline-none transition-all placeholder:text-black/35 focus:border-black/30 focus:bg-white"
                      />

                      <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="font-body h-14 w-full rounded-xl border border-black/10 bg-white/70 px-4 text-sm text-black outline-none transition-all placeholder:text-black/35 focus:border-black/30 focus:bg-white"
                      />

                      <input
                        type="tel"
                        placeholder="Your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="font-body h-14 w-full rounded-xl border border-black/10 bg-white/70 px-4 text-sm text-black outline-none transition-all placeholder:text-black/35 focus:border-black/30 focus:bg-white"
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative mt-1 flex h-14 w-full items-center justify-center overflow-hidden rounded-xl bg-black px-6 text-sm font-medium text-white transition-transform duration-300 hover:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          {isSubmitting ? "Sending..." : "Yeah, I Need This"}

                          {!isSubmitting && (
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          )}
                        </span>
                      </button>
                    </motion.form>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 text-center text-[10px] text-black/35"
                    >
                      No spam. No sales pitch. Just useful insights for your
                      website.
                    </motion.p>
                  </>
                ) : (
                  /* Success state */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[430px] flex-col items-center justify-center text-center"
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12.5L9.5 17L19 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <h3 className="font-custom text-[38px] leading-none tracking-[-0.04em]">
                      You're on the list.
                    </h3>

                    <p className="mt-4 max-w-[350px] text-sm leading-relaxed text-black/50">
                      I'll take a look at your website and get back to you with
                      some actionable improvements.
                    </p>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="mt-8 rounded-full bg-black px-7 py-3 text-xs font-medium text-white transition-transform hover:scale-95"
                    >
                      Got it
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadMagnet;