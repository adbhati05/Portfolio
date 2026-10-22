import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import Loading from "./pages/Loading";
import { SplashDoneContext } from "./lib/splash";
import "./index.css";

// Pages are loaded lazily (split into their own chunks), the loading page shows while a page's code downloads.
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

// The splash stays up at least this long so the loading animation doesn't just flash, and at most this long in case "load" never fires.
const MIN_SPLASH_MS = 1600;
const MAX_SPLASH_MS = 8000;

// Tracks the initial page load as a 0-100 percentage for the splash screen.
// Progress creeps up to 90% over the minimum splash time and only reaches 100% once the window and fonts have finished loading.
const useLoadProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let loaded = false;

    const windowLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
    Promise.all([windowLoaded, document.fonts?.ready]).then(() => {
      loaded = true;
    });

    const timer = setInterval(() => {
      const elapsed = performance.now() - start;
      const done = (loaded && elapsed >= MIN_SPLASH_MS) || elapsed >= MAX_SPLASH_MS;
      const target = done ? 100 : Math.round(Math.min(elapsed / MIN_SPLASH_MS, 1) * 90);
      setProgress((prev) => Math.max(prev, target));
      if (done) clearInterval(timer);
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return progress;
};

function App() {
  const progress = useLoadProgress();
  const [showSplash, setShowSplash] = useState(true);

  // Once loading hits 100%, hold for a beat so the counter can land, then let the splash animate away.
  useEffect(() => {
    if (progress < 100) return;
    const timeout = setTimeout(() => setShowSplash(false), 450);
    return () => clearTimeout(timeout);
  }, [progress]);

  // Locking page scrolling while the splash is up.
  useEffect(() => {
    document.documentElement.style.overflow = showSplash ? "hidden" : "";
  }, [showSplash]);

  return (
    <>
      {/* Mounting the Vercel analytics component to get visits/views data. */}
      <Analytics />

      {/* Mounting the Vercel speed insights component to get performance data. */}
      <SpeedInsights />

      {/* Initial loading splash, which fades/blurs out once the site is ready. */}
      <AnimatePresence>
        {showSplash && <Loading key="splash" progress={progress} />}
      </AnimatePresence>

      {/* React router dom ensures user is navigated to the appropriate page when interacting with the site. */}
      {/* The fallback stays empty during the splash, since the splash already covers the screen. */}
      <SplashDoneContext.Provider value={!showSplash}>
        <BrowserRouter>
          <Suspense fallback={showSplash ? null : <Loading />}>
            <Routes>
              {/* When users access this site, this is the page they will land on. */}
              <Route index element={<Home />} />

              {/* Wildcard route for handling cases where users access elements that do not exist or perform an operation that is not defined. */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SplashDoneContext.Provider>
    </>
  );
}

export default App;
