import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

export const useScreens = () => {
  const [isFirstRenderDone, setIsFirstRenderDone] = useState(false);

  useEffect(() => {
    setIsFirstRenderDone(true);
  }, []);

  const isBeforeSmScreen = useMediaQuery({ query: "(max-width: 639px)" });
  const isSmScreen = useMediaQuery({ query: "(min-width: 640px)" });

  const isBeforeMdScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const isMdScreen = useMediaQuery({ query: "(min-width: 768px)" });

  const isBeforeLgScreen = useMediaQuery({ query: "(max-width: 1023px)" });
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const isBeforeXlScreen = useMediaQuery({ query: "(max-width: 1279px)" });
  const isXlScreen = useMediaQuery({ query: "(min-width: 1280px)" });

  const isBefore2XlScreen = useMediaQuery({ query: "(max-width: 1535px)" });
  const is2XlScreen = useMediaQuery({ query: "(min-width: 1536px)" });

  return {
    isBeforeSmScreen: isFirstRenderDone && isBeforeSmScreen,
    isSmScreen: isFirstRenderDone && isSmScreen,
    isBeforeMdScreen: isFirstRenderDone && isBeforeMdScreen,
    isMdScreen: isFirstRenderDone && isMdScreen,
    isBeforeLgScreen: isFirstRenderDone && isBeforeLgScreen,
    isLgScreen: isFirstRenderDone && isLgScreen,
    isBeforeXlScreen: isFirstRenderDone && isBeforeXlScreen,
    isXlScreen: isFirstRenderDone && isXlScreen,
    isBefore2XlScreen: isFirstRenderDone && isBefore2XlScreen,
    is2XlScreen: isFirstRenderDone && is2XlScreen,
  };
};
