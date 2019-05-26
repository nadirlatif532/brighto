'use strict';

module.exports = (sequelize, DataTypes) => {
    const ProjectType_Category = sequelize.define('ProjectType_Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }
    })
    ProjectType_Category.associate = function (models) {
        // associations can be defined here
    };
    return ProjectType_Category;
};
