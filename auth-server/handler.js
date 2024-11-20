'use strict';

require('dotenv').config();

console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);
console.log('CALENDAR_ID:', process.env.CALENDAR_ID);

const { google } = require('googleapis');
const calendar = google.calendar('v3');
const SCOPES = ['https://www.googleapis.com/auth/calendar.events.public.readonly'];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  'https://shadesi.github.io/meet1/'
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  console.log('Generating auth URL...');
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Auth URL generated:', authUrl);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  const code = decodeURIComponent(`${event.pathParameters.code}`);
  console.log('Received code:', code);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        console.error('Error getting token:', error);
        return reject({
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          },
          body: JSON.stringify({ error: error.message }),
        });
      }
      console.log('Token response:', response);
      oAuth2Client.setCredentials(response.tokens);
      return resolve(response);
    });
  })
    .then((results) => {
      console.log('Access token obtained:', results);
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      console.error('Error in getAccessToken:', error);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ error: error.message }),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  console.log('Received access token:', access_token);
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      },
      (error, response) => {
        if (error) {
          console.error('Error fetching calendar events:', error);
          return reject({
            statusCode: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: error.message }),
          });
        }
        console.log('Calendar events fetched:', response);
        return resolve(response);
      }
    );
  })
    .then((results) => {
      console.log('Calendar events:', results.data.items);
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ events: results.data.items }),
      };
    })
    .catch((error) => {
      console.error('Error in getCalendarEvents:', error);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ error: error.message }),
      };
    });
};
