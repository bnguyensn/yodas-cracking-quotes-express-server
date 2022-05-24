import got from 'got';

// Bored API documentation:
// https://www.boredapi.com/documentation
const BORED_API_PATH = 'https://www.boredapi.com/api/activity/';

export default function getBoredActivity() {
  const boredApiUrl = BORED_API_PATH;

  return got(boredApiUrl, {
    method: 'GET',
  }).json();
}
