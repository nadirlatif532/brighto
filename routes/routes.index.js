const {authenticate} = require('../middlewares/auth.middleware');

module.exports = app => {
  app.use('/api/v1/u', require('./routes.unauth'));
  app.use('/api/v1/a', authenticate, require('./routes.auth'));
  app.use('/api/v1/admin', authenticate, require('./routes.admin'));
  app.use('/api/v1/family', require('./routes.family'));
};
