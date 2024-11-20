// src/api.js

import mockData from "./mock-data";
import NProgress from "nprogress";

/**
 * Extract locations from the events data, removing duplicates.
 * @param {*} events - array of event objects
 * @returns Array of unique locations
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 * Check the validity of the access token.
 * @param {string} accessToken - the token to check
 * @returns Promise resolving to the token information
 */
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

/**
 * Remove the query parameters from the URL.
 */
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

/**
 * Fetch the list of events, using mock data for localhost.
 * @param {string} currentCity - the selected city
 * @param {number} currentNOE - the number of events to fetch
 * @returns Promise resolving to the array of events
 */


/**
 * Get the access token from localStorage or redirect to Google authorization.
 * @returns Promise resolving to the access token
 */
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(
        "https://plqoig0l0f.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

/**
 * Retrieve the access token using the provided authorization code.
 * @param {string} code - the authorization code from Google
 * @returns Promise resolving to the access token
 */
const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);

    const response = await fetch(
      `https://plqoig0l0f.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`,
      {
        method: 'GET', // Changed to GET to match your serverless.yml
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    
    const access_token = result.tokens ? result.tokens.access_token : result.access_token;
    
    if (access_token) {
      localStorage.setItem("access_token", access_token);
      return access_token;
    } else {
      throw new Error('Token not found in response');
    }
  } catch (error) {
    console.error('Error getting token:', error);
    throw error; // Re-throw the error instead of calling error.json()
  }
};

export const getEvents = async (currentCity, currentNOE) => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData.slice(0, currentNOE);
  }

  if (!navigator.onLine) {
    const events = localStorage.getItem("cachedEvents");
    NProgress.done();
    return events ? JSON.parse(events) : [];
  }

  try {
    const token = await getAccessToken();
    if (token) {
      removeQuery();
      const encodedToken = encodeURIComponent(token);
      const url = `https://plqoig0l0f.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${encodedToken}`;
      
      if (currentCity && currentNOE) {
        url += `?city=${encodeURIComponent(currentCity)}&number=${currentNOE}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result && result.events) {
        NProgress.done();
        localStorage.setItem("cachedEvents", JSON.stringify(result.events));
        localStorage.setItem(
          "cachedEventsTimestamp",
          new Date().getTime().toString()
        );
        return result.events;
      } else {
        throw new Error('No events found in response');
      }
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    NProgress.done();
    return [];
  }
};