import { randIntBetween } from '../../utils';
import quotes from './quotes.json';

export default function postQuotes(req, res) {
  const quote = quotes[randIntBetween(0, quotes.length - 1)];

  res.json({
    response_type: 'in_channel',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `_${quote}_`,
        },
      },
    ],
  });
}

