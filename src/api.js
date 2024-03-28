import mockData from "./mockData";

import NProgress from "nprogress";

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

export const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

export const getEvents = async () => {
  NProgress.start();
  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = `https://gk7ezk6tl6.execute-api.us-east-2.amazonaws.com/dev/api/get-events/${token}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null;
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(
        "https://gk7ezk6tl6.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authURL } = result;
      return (window.location.href = authURL);
    }
    return code && getAccessToken(code);
  }
  return accessToken;
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    `https://gk7ezk6tl6.execute-api.us-east-2.amazonaws.com/dev/api/token/${encodeCode}`
  );
  const { access_token } = await response.json();
  access_token && localStorage.setITem("access_token", access_token);

  return access_token;
};
