import { randIntBetween } from '../utils';
import { actionIds, suggestives } from './constants';

export default function getBoredResponse({ activityKey, activity }) {
  const suggestive = suggestives[randIntBetween(0, suggestives.length - 1)];

  return {
    response_type: 'ephemeral',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `_${activity}, ${suggestive}._`,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Give me something else?',
              emoji: true,
            },
            // The activity's ID (key) is passed to the button's value so we
            // can identify which "activity" triggered the refresh button.
            value: activityKey,
            action_id: actionIds.BORED_REFRESH_ACTIVITY,
          },
        ],
      },
    ],
  };
}
