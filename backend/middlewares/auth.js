// 認証用的 middleware
function auth(req, res, next) {
  if (req.session.userId) {
    console.log('authenticated');
    next();
  } else {
    console.log('Unauthenticated');
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = auth;

