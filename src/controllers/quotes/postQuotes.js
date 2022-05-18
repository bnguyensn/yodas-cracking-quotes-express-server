export default function postQuotes(req, res) {
  res.json({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '**Do, or do not. There is no try.**',
        },
      },
    ],
  });
}

