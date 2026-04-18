import ReactGA from "react-ga4";

const GA_ID = "G-742TNTTLQ2";

let initialized = false;

export const initGA = () => {
  if (!initialized) {
    ReactGA.initialize(GA_ID);
    initialized = true;
  }
};

export const trackPageView = (page: string) => {
  if (!initialized) initGA();

  ReactGA.send({
    hitType: "pageview",
    page,
  });
};