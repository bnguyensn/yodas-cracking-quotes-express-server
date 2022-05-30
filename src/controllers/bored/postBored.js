import { getBoredActivity } from '../../api/bored';
import { sendInternalServerError } from '../../utils';
import { getBoredSuggestionMessage } from '../../messages';

export default async function postBored(req, res) {
  try {
    const { key: activityKey, activity } = await getBoredActivity();

    const boredResponse = getBoredSuggestionMessage({
      activityKey,
      activity,
    });

    return res.json(boredResponse);
  } catch (err) {
    return sendInternalServerError(res, err);
  }
}
