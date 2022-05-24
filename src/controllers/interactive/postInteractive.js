import got from 'got';
import { getBoredActivity } from '../../api/bored';
import { randIntBetween, sendInternalServerError } from '../../utils';
import suggestives from '../bored/suggestives.json';

export default async function postInteractive(req, res) {
  try {
    const {
      response_url,
      actions: { action_id },
    } = req.payload;

    if (action_id === 'yodabored-button-refresh-activity') {
      // Replace the original Bored message with a new one.

      const { key: activityKey, activity } = await getBoredActivity();

      const suggestive = suggestives[randIntBetween(0, suggestives.length - 1)];

      // Just fire off the request, doesn't matter what the response is. Thus
      // there's no need to await.
      got(response_url, {
        method: 'POST',
        json: {
          replace_original: 'true',
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
        },
      });
    }

    return res.json({});
  } catch (err) {
    return sendInternalServerError(res, err);
  }
}
