module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    avgRating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    numberOfReviews: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  Restaurant.associate = (models) => {
    Restaurant.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as: 'owner',
      onDelete: 'CASCADE',
    });

    Restaurant.hasMany(models.Review, {
      foreignKey: 'restaurantId',
      as: 'reviews',
    });
  };

  return Restaurant;
};
