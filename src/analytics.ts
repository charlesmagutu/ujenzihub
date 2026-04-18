import ReactGA from "react-ga4";

const GA_ID = "G-742TNTTLQ2";

export const initGA = () => {
  ReactGA.initialize(GA_ID);
};

export const trackPageView = (path: string) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};