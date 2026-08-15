'use client';

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

/* ---------------- UTIL ---------------- */
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/* ---------------- CONTEXT ---------------- */
const GlidingCardContext = createContext();

function useGlidingCardContext() {
  const context = useContext(GlidingCardContext);

  if (!context) {
    throw new Error('Must be used inside GlidingCard');
  }

  return context;
}

/* ---------------- ROOT ---------------- */
function GlidingCard({ children }) {
  const [activeId, setActiveId] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  const [activeRect, setActiveRect] = useState(null);
  const [activeConfig, setActiveConfig] = useState({
    rotation: 0,
    offset: { x: 0, y: 0 },
  });

  const leaveTimer = useRef(null);

  const registerActivation = useCallback((id, rect, content, config) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);

    setActiveId(id);
    setActiveContent(content);
    setActiveRect(rect);
    setActiveConfig(config);
  }, []);

  const registerDeactivation = useCallback(() => {
    leaveTimer.current = setTimeout(() => {
      setActiveId(null);
    }, 80);
  }, []);

  return (
    <GlidingCardContext.Provider
      value={{
        activeId,
        activeContent,
        activeRect,
        activeConfig,
        registerActivation,
        registerDeactivation,
      }}
    >
      {children}
    </GlidingCardContext.Provider>
  );
}

/* ---------------- ITEM ---------------- */
function GlidingCardItem({
  children,
  className,
  target,
  offset = { x: 0, y: 0 },
  rotation = 0,
  as: Tag = 'div',
  ...props
}) {
  const context = useGlidingCardContext();

  const id = useRef(Math.random().toString(36).slice(2)).current;

  const handleActivate = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    context.registerActivation(id, rect, target, {
      rotation,
      offset: {
        x: offset.x ?? 0,
        y: offset.y ?? 0,
      },
    });
  };

  const handleDeactivate = () => {
    context.registerDeactivation();
  };

  return (
    <Tag
      role="button"
      tabIndex={0}
      {...props}
      onMouseEnter={(e) => {
        handleActivate(e);
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        handleDeactivate();
        props.onMouseLeave?.(e);
      }}
      onFocus={(e) => {
        handleActivate(e);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        handleDeactivate();
        props.onBlur?.(e);
      }}
      className={cn(
        'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
    >
      {children}
    </Tag>
  );
}

/* ---------------- CONTENT ---------------- */
function GlidingCardContent({ className }) {
  const {
    activeId,
    activeContent,
    activeRect,
    activeConfig,
  } = useGlidingCardContext();

  const containerRef = useRef(null);

  const getRelativePosition = () => {
    if (!activeRect || !containerRef.current) {
      return {
        top: 0,
        left: 0,
        mobile: false,
      };
    }

    const containerRect =
      containerRef.current.getBoundingClientRect();

    const isMobile = window.innerWidth < 1024;

    // MOBILE/TABLET
    if (isMobile) {
      return {
        top:
          activeRect.top -
          containerRect.top +
          activeRect.height / 2,
        left: containerRect.width / 2,
        mobile: true,
      };
    }

    // DESKTOP
    return {
      top:
        activeRect.top -
        containerRect.top +
        activeRect.height / 2,
      left:
        activeRect.left -
        containerRect.left +
        activeRect.width / 2,
      mobile: false,
    };
  };

  const pos = getRelativePosition();

  return (
    <div
      ref={containerRef}
      className="relative w-full  h-full pointer-events-none"
    >
      <AnimatePresence mode="wait">
        {activeId && activeRect && (
          <motion.div
            className={cn(
              'absolute z-50 pointer-events-none',
              pos.mobile
                ? 'left-1/2 -translate-x-1/2'
                : '-translate-x-1/2',
              className
            )}
            style={{
              transformOrigin: 'center center',
            }}
            initial={{
              opacity: 0,
              scale: 0.9,
              top: pos.top,
              left: pos.left,
              y: '-50%',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              top: pos.top,
              left: pos.left,
              y: '-50%',
              rotateZ: activeConfig.rotation || 0,
              x: activeConfig.offset?.x || 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 25,
            }}
          >
            {activeContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- POLAROID ---------------- */
function Polaroid({ src, caption }) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-zinc-900',
        'border border-black/10 dark:border-white/10',
        'p-3 pb-8',
        'w-[12em] smw-[16em]',
        'shadow-2xl'
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden mb-4 bg-zinc-100 dark:bg-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-blue-500/10 mix-blend-overlay z-10" />

        <Image
          src={src}
          alt={caption}
          fill
          className="object-cover contrast-[1.1] sepia-[0.2] brightness-[1.1]"
        />

        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 z-20" />
      </div>

      <div className="text-center">
        <span
          className="text-lg sm:text-xl leading-none text-black dark:text-white/90"
          style={{ fontFamily: 'Caveat, cursive' }}
        >
          {caption}
        </span>
      </div>
    </div>
  );
}

/* ---------------- LIST ITEM ---------------- */
function ListItem({
  index,
  title,
  subtitle,
  src,
  caption,
  rotation,
  offset,
}) {
  return (
    <GlidingCardItem
      target={<Polaroid src={src} caption={caption} />}
      rotation={rotation}
      offset={offset}
      className="group flex cursor-pointer items-center justify-between rounded-lg px-2 py-4 transition-all duration-300 hover:bg-brand-background dark:hover:bg-zinc-900 hover:pl-4"
    >
      <div className="flex items-center gap-6">
        <span className="font-custom text-heading3 text-white/60 transition-colors group-hover:text-zinc-600 dark:group-hover:text-brand-background">
          0{index}
        </span>

        <div className="flex flex-col">
          <span className="text-para text-brand-white uppercase font-custom font-medium tracking-wide">
            {title}
          </span>

          <span className="text-xs font-body font-light text-white/60">
            {subtitle}
          </span>
        </div>
      </div>

      <MapPin className="h-4 w-4 text-white/60 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-black dark:group-hover:text-white" />
    </GlidingCardItem>
  );
}

/* ---------------- DEMO ---------------- */
export default function TravelGalleryDemo() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
      `}</style>

      <div className="w-full overflow-hidde bg-background p-6 sm:p-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-2">
          <p className="max-w-md text-para font-body text-brand-white/70">
           we&apos;ve got you covered in these type of services.
          </p>
        </div>

        <GlidingCard>
          <div className="relative w-full gap-12 items-start">
            {/* LEFT */}
            <div className="flex flex-col gap-1">
              <ListItem
                index="01"
                title="Exterior valet"
                subtitle="Arashiyama District"
                src="/assets/SWagon.jpg"
                caption="starting from $149"
                rotation={-6}
                offset={{ x: 0, y: 0 }}
              />

              <ListItem
                index="02"
                title="Interior valet"
                subtitle="Southern Coast"
                src="/assets/Sboot.jpg"
                caption="starting from $149"
                rotation={4}
                offset={{ x: 0, y: -10 }}
              />

              <ListItem
                index="03"
                title="Monterey, USA"
                subtitle="Pacific Highway"
                src="/assets/STire.jpg"
                caption="starting from $399"
                rotation={-3}
                offset={{ x: 0, y: 10 }}
              />
            </div>

            {/* RIGHT */}
              <div className="relative min-h-[500px] w-full [perspective:1000px]">
              <GlidingCardContent />
            </div>
          </div>
        </GlidingCard>
      </div>
    </>
  );
}