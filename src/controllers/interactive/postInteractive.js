import got from 'got';
import { getBoredActivity } from '../../api/bored';
import { sendInternalServerError } from '../../utils';
import { getBoredResponse } from '../../messages';
import { actionIds } from '../../messages/constants';

export default async function postInteractive(req, res) {
  try {
    const payload = JSON.parse(req.body.payload);
    console.dir(payload);
    const { response_url, actions } = payload;

    const actionId = actions[0].action_id;

    if (actionId === actionIds.BORED_REFRESH_ACTIVITY) {
      // Replace the original Bored message with a new one.

      const { key: activityKey, activity } = await getBoredActivity();

      const boredResponse = getBoredResponse({
        activityKey,
        activity,
      });

      await got(response_url, {
        method: 'POST',
        json: boredResponse,
      });
    }

    return res.json({});
  } catch (err) {
    return sendInternalServerError(res, err);
  }
}
