import { Toaster } from "sonner";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { setTriggerConfetti } from "@/config/toastUtils";

const LoveToast = () => {
  const [confetti, setConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const triggerConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  useEffect(() => {
    setTriggerConfetti(triggerConfetti);
  }, []);

  return (
    <div>
      {confetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Confetti width={width} height={height} numberOfPieces={150} />
        </motion.div>
      )}
      <Toaster position="bottom-right" />
    </div>
  );
};

export default LoveToast;
