import got from 'got';
import { getBoredActivity } from '../../api/bored';
import { sendInternalServerError } from '../../utils';
import { getBoredPostMessage, getBoredSuggestionMessage } from '../../messages';
import { actionIds } from '../../messages/constants';

function parseActionValueString(str) {
  try {
    return JSON.parse(str);
  } catch (err) {
    return {};
  }
}

export default async function postInteractive(req, res) {
  try {
    const payload = JSON.parse(req.body.payload);
    const { response_url, actions } = payload;

    const { action_id: actionId, value: actionValueString } = actions[0];

    const actionValue = parseActionValueString(actionValueString);

    switch (actionId) {
      case actionIds.BORED_REFRESH_ACTIVITY: {
        // Replace the original Bored message with a new one.

        const { key: activityKey, activity } = await getBoredActivity();

        const responseMessage = getBoredSuggestionMessage({
          activityKey,
          activity,
        });

        await got(response_url, {
          method: 'POST',
          json: responseMessage,
        });

        break;
      }
      case actionIds.BORED_POST_MESSAGE: {
        // Delete the original ephemereal message and post the actual message

        const originalText = actionValue.text;

        const responseMessage = getBoredPostMessage({
          text: originalText,
        });

        await got(response_url, {
          method: 'POST',
          json: responseMessage,
        });

        break;
      }
      default: {
        // Do nothing
      }
    }

    return res.json({});
  } catch (err) {
    return sendInternalServerError(res, err);
  }
}
