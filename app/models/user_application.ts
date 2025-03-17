import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { job_application, job_applicationId } from './job_application';
import type { user, userId } from './user';

export interface user_applicationAttributes {
  UA_ID: number;
  UA_USER_ID: number;
  UA_APPLICATION_ID: number;
}

export type user_applicationPk = "UA_ID";
export type user_applicationId = user_application[user_applicationPk];
export type user_applicationOptionalAttributes = "UA_ID";
export type user_applicationCreationAttributes = Optional<user_applicationAttributes, user_applicationOptionalAttributes>;

export class user_application extends Model<user_applicationAttributes, user_applicationCreationAttributes> implements user_applicationAttributes {
  UA_ID!: number;
  UA_USER_ID!: number;
  UA_APPLICATION_ID!: number;

  // user_application belongsTo job_application via UA_APPLICATION_ID
  UA_APPLICATION!: job_application;
  getUA_APPLICATION!: Sequelize.BelongsToGetAssociationMixin<job_application>;
  setUA_APPLICATION!: Sequelize.BelongsToSetAssociationMixin<job_application, job_applicationId>;
  createUA_APPLICATION!: Sequelize.BelongsToCreateAssociationMixin<job_application>;
  // user_application belongsTo user via UA_USER_ID
  UA_USER!: user;
  getUA_USER!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUA_USER!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUA_USER!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_application {
    return user_application.init({
    UA_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UA_USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'USER_ID'
      }
    },
    UA_APPLICATION_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job_application',
        key: 'APPLICATION_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'user_application',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UA_ID" },
        ]
      },
      {
        name: "IX_User_Application_UA_APPLICATION_ID",
        using: "BTREE",
        fields: [
          { name: "UA_APPLICATION_ID" },
        ]
      },
      {
        name: "IX_User_Application_UA_USER_ID",
        using: "BTREE",
        fields: [
          { name: "UA_USER_ID" },
        ]
      },
    ]
  });
  }
}
