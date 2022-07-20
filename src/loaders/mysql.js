const { sequelize } = require('../api/models');

exports.connect = () => {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log('DB Connected Success');
    })
    .catch((error) => {
      console.error(error);
    });
};
