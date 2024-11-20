// src/App.js

import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { getEvents, extractLocations } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar, Container } from "react-bootstrap";
import BrandImage from "./img/headLogo.webp";
import Spinner from "./components/Spinner";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import { ThemeProvider } from "./contexts/ThemeContext";
import EventGenresChart from "./components/EventGenresChart";
import ErrorBoundary from "./components/ErrorBoundary";

const EventList = lazy(() => import("./components/EventList"));
const CitySearch = lazy(() => import("./components/CitySearch"));
const NumberOfEvents = lazy(() => import("./components/NumberOfEvents"));
const CityEventsChart = lazy(() => import("./components/CityEventsChart"));

const App = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("all");
  const [currentNOE, setCurrentNOE] = useState(32);
  const [isLoading, setIsLoading] = useState(true);
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const allEvents = await getEvents(currentCity, currentNOE);
    if (allEvents) {
      setEvents(allEvents);
      setAllLocations(extractLocations(allEvents));
    } else {
      setEvents([]);
      setAllLocations([]);
    }
    setIsLoading(false);
  }, [currentCity, currentNOE]);

  useEffect(() => {
    // Function to format timestamp to mm/dd/yyyy hh:mm am/pm
    function formatTimestamp(timestamp) {
      const date = new Date(parseInt(timestamp));
      return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    const cachedTimestamp = localStorage.getItem("cachedEventsTimestamp");
    const formattedDate = formatTimestamp(cachedTimestamp);
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      const warningMessage = `You are currently offline, the current data was last refreshed on ${formattedDate}`;
      setWarningAlert(warningMessage);
    }
    fetchData();
  }, [fetchData]);

  return (
    <ThemeProvider>
      <div className="App" style={{ backgroundColor: "#f7f7f7" }}> {/* Set background color to very light grey */}
        {isLoading && <Spinner />}
        <Navbar>
          <Container fluid className="d-flex flex-column align-items-center">
            <Navbar.Brand href="#" className="mb-3">
              <img
                id="HeaderLogoImage"
                src={BrandImage}
                width="350"
                height="50"
                alt="Logo for CliqueUP"
                className="page-header__item img-fluid"
              />
            </Navbar.Brand>
            <div className="alerts-container">
              {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
              {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
              {warningAlert.length ? (
                <WarningAlert text={warningAlert} />
              ) : null}
            </div>
            <Suspense fallback={<Spinner />}>
              <CitySearch
                allLocations={allLocations}
                setCurrentCity={setCurrentCity}
                setInfoAlert={setInfoAlert}
              />
              <br />

              <NumberOfEvents
                setCurrentNOE={setCurrentNOE}
                setErrorAlert={setErrorAlert}
              />
              <br />
              {events.length > 0 && (
                <div
                  className="charts-container"
                  data-testid="charts-container"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "200px",
                    width: "99%",
                    maxWidth: "1300px",
                    margin: "0 auto",
                    padding: "20px",
                    backgroundColor: "lightblue",
                  }}
                >
                  <ErrorBoundary>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <EventGenresChart events={events} />
                      <CityEventsChart events={events} allLocations={allLocations} />
                    </div>
                  </ErrorBoundary>
                </div>
              )}
              <EventList events={events} currentCity={currentCity} />
            </Suspense>
            {!isLoading && events.length === 0 && (
              <p className="noEventsText">
                No events found. Try refreshing the data and ensure you've
                connected your gmail account.
              </p>
            )}
          </Container>
        </Navbar>
      </div>
    </ThemeProvider>
  );
};

export default App;
