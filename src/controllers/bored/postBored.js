import { getBoredActivity } from '../../api/bored';
import { randIntBetween, sendInternalServerError } from '../../utils';
import suggestives from './suggestives.json';

export default async function postBored(req, res) {
  try {
    const { key: activityKey, activity } = await getBoredActivity();

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
              action_id: 'yodabored-button-refresh-activity',
            },
          ],
        },
      ],
    });
  } catch (err) {
    return sendInternalServerError(res, err);
  }
}
