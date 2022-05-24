import got from 'got';
import { randIntBetween, sendInternalServerError } from '../../utils';
import suggestives from './suggestives.json';

// Bored API documentation:
// https://www.boredapi.com/documentation
const BORED_API_PATH = 'https://www.boredapi.com/api/activity/';

export default async function postBored(req, res) {
  try {
    const boredApiUrl = BORED_API_PATH;

    const { activity } = await got(boredApiUrl, { method: 'GET' }).json();

    const suggestive = suggestives[randIntBetween(0, suggestives.length - 1)];

    return res.json({
      response_type: 'in_channel',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `_${activity}, ${suggestive}._`,
          },
        },
      ],
    });
  } catch (err) {
    return sendInternalServerError(res, err);
  }
}
