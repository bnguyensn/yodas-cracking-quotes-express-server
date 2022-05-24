import { sendInternalServerError } from '../../utils';

export default function postInteractive(req, res) {
  try {
    const {
      type,
      response_url,
      actions: { action_id, value },
    } = req.payload;

    return res.json({});
  } catch (err) {
    return sendInternalServerError(res, err);
  }
}
