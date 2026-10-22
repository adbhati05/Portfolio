import { createContext, useContext } from "react";

// True once the initial loading splash has gone away. Entrance animations (navbar, hero) wait for this so they don't play hidden behind the splash.
// Defaults to true so anything rendered outside the provider just animates right away.
export const SplashDoneContext = createContext(true);

export const useSplashDone = () => useContext(SplashDoneContext);
