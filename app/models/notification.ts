import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { company, companyId } from './company';
import type { user, userId } from './user';

export interface notificationAttributes {
  NOTIFICATION_ID: number;
  NOTIFICATION_USER_ID?: number;
  NOTIFICATION_COMPANY_ID?: number;
  NOTIFICATION_TEXT: string;
  NOTIFICATION_TIMESTAMP: Date;
  NOTIFICATION_STATUS: string;
}

export type notificationPk = "NOTIFICATION_ID";
export type notificationId = notification[notificationPk];
export type notificationOptionalAttributes = "NOTIFICATION_ID" | "NOTIFICATION_USER_ID" | "NOTIFICATION_COMPANY_ID";
export type notificationCreationAttributes = Optional<notificationAttributes, notificationOptionalAttributes>;

export class notification extends Model<notificationAttributes, notificationCreationAttributes> implements notificationAttributes {
  NOTIFICATION_ID!: number;
  NOTIFICATION_USER_ID?: number;
  NOTIFICATION_COMPANY_ID?: number;
  NOTIFICATION_TEXT!: string;
  NOTIFICATION_TIMESTAMP!: Date;
  NOTIFICATION_STATUS!: string;

  // notification belongsTo company via NOTIFICATION_COMPANY_ID
  NOTIFICATION_COMPANY!: company;
  getNOTIFICATION_COMPANY!: Sequelize.BelongsToGetAssociationMixin<company>;
  setNOTIFICATION_COMPANY!: Sequelize.BelongsToSetAssociationMixin<company, companyId>;
  createNOTIFICATION_COMPANY!: Sequelize.BelongsToCreateAssociationMixin<company>;
  // notification belongsTo user via NOTIFICATION_USER_ID
  NOTIFICATION_USER!: user;
  getNOTIFICATION_USER!: Sequelize.BelongsToGetAssociationMixin<user>;
  setNOTIFICATION_USER!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createNOTIFICATION_USER!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof notification {
    return notification.init({
    NOTIFICATION_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOTIFICATION_USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'USER_ID'
      }
    },
    NOTIFICATION_COMPANY_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'company',
        key: 'COMPANY_ID'
      }
    },
    NOTIFICATION_TEXT: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    NOTIFICATION_TIMESTAMP: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    NOTIFICATION_STATUS: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'notification',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NOTIFICATION_ID" },
        ]
      },
      {
        name: "IX_Notification_NOTIFICATION_COMPANY_ID",
        using: "BTREE",
        fields: [
          { name: "NOTIFICATION_COMPANY_ID" },
        ]
      },
      {
        name: "IX_Notification_NOTIFICATION_USER_ID",
        using: "BTREE",
        fields: [
          { name: "NOTIFICATION_USER_ID" },
        ]
      },
    ]
  });
  }
}
