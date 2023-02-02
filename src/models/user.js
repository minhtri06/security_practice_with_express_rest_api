"use strict"
const { Model } = require("sequelize")
const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ RefreshToken }) {
            this.hasMany(RefreshToken)
        }

        toJSON(data) {
            return {
                ...super.toJSON(),
                passwordHash: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            }
        }
    }
    User.init(
        {
            name: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false },
            passwordHash: { type: DataTypes.STRING, allowNull: false },
            avatar: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
            indexes: [
                {
                    unique: true,
                    fields: ["email"],
                },
            ],
        }
    )
    return User
}
