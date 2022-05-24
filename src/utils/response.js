function normalizeErr(err) {
  if (err instanceof Error) {
    return err.message;
  }

  return `${err}`;
}

export function sendInternalServerError(res, err) {
  res.status(500).json({
    data: normalizeErr(err),
  });
}
