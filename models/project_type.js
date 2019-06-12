'use strict';
module.exports = (sequelize, DataTypes) => {
    const ProjectType = sequelize.define('ProjectType', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Username is required'
                },
                len: {
                    args: [3, 40],
                    msg: 'Please provide a project_type name which must be 3-40 characters in length'
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
    }, {
            indexes: [
                {
                    unique: true,
                    fields: ['name']
                }
            ],
            defaultScope: {
                attributes: { exclude: ['updatedAt', 'createdAt'] }
            }        
        });

    ProjectType.associate = function (models) {
        const { Category, ProjectType_Category } = models;
        ProjectType.belongsToMany(Category, { through: ProjectType_Category, onDelete: 'cascade' });
        // associations can be defined here
    };
    return ProjectType;
};
