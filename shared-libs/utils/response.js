exports.ok = (res, data = {}, message = 'OK') => {
  return res.json({ statusCode: 200, success: true, data, message, error: null });
};

exports.created = (res, data = {}, message = 'Created') => {
  return res.status(201).json({ statusCode: 201, success: true, data, message, error: null });
};

exports.badRequest = (res, message = 'Bad Request') => {
  return res.status(400).json({ success: false, data: null, message, error: null });
};

exports.notFound = (res, message = 'Not Found') => {
  return res.status(404).json({ success: false, data: null, message, error: null });
};