import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "../../utils/cn";
import React from "react";

export const TextGenerateEffect = ({
  words,
  className,
}) => {
  const controls = useAnimation();
  let wordsArray = words.split(" ");

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      transition: { delay: i * 0.1, duration: 2 },
    }));
  }, [controls]);

  const renderWords = () => {
    return (
      <motion.div>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              custom={idx}
              initial={{ opacity: 0 }}
              animate={controls}
              className="text-inherit opacity-0 inline-block mr-1.5 last:mr-0"
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("inline-block", className)}>
      {renderWords()}
    </div>
  );
};
