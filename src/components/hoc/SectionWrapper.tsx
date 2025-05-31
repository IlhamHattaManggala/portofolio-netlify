import { motion } from "framer-motion";

import { styles } from "../constant/styles";

const SectionWrapper = <P extends object>(
  Component: React.ComponentType<P>,
  idName: string
) =>
  function HOC(props: P) {
    return (
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}
        id={idName}
      >
        <span className="hash-span">&nbsp;</span>

        <Component {...props} />
      </motion.section>
    );
  };


export default SectionWrapper;