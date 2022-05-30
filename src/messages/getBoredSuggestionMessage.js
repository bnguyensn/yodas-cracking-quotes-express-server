import { randIntBetween } from '../utils';
import { actionIds, suggestives } from './constants';

/**
 * Ephemereal message.
 * Suggest the user an activity to do. Offer the user the option to post the
 * message to the channel, or receive a new activity.
 */
export default function getBoredSuggestionMessage({ activityKey, activity }) {
  const suggestive = suggestives[randIntBetween(0, suggestives.length - 1)];
  const text = `_${activity}, ${suggestive}._`;

  const buttonValue = JSON.stringify({ key: activityKey, text });

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
              text: 'Post message!',
              emoji: true,
            },
            style: 'primary',
            // The activity's ID (key) is passed to the button's value so we
            // can identify which "activity" triggered button.
            value: buttonValue,
            action_id: actionIds.BORED_POST_MESSAGE,
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Give me something else?',
              emoji: true,
            },
            // The activity's ID (key) is passed to the button's value so we
            // can identify which "activity" triggered button.
            value: buttonValue,
            action_id: actionIds.BORED_REFRESH_ACTIVITY,
          },
        ],
      },
    ],
  };
}
