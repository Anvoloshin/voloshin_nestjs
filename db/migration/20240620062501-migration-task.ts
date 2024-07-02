module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('tasks', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
        type: Sequelize.STRING,
      },
      is_completed: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        defaultValue: Date.now(),
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        defaultValue: Date.now(),
        type: Sequelize.DATE,
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('tasks');
  },
};
