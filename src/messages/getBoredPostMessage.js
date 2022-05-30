/**
 * In-channel message.
 * Delete the original ephemereal message and post the last suggested activity
 * to the channel.
 */
export default function getBoredPostMessage({ text }) {
  return {
    delete_original: 'true',
    response_type: 'in_channel',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text,
        },
      },
    ],
  };
}
