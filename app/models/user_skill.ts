import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { skill, skillId } from './skill';
import type { user, userId } from './user';

export interface user_skillAttributes {
  US_ID: number;
  US_USER_ID: number;
  US_SKILL_ID: number;
}

export type user_skillPk = "US_ID";
export type user_skillId = user_skill[user_skillPk];
export type user_skillOptionalAttributes = "US_ID";
export type user_skillCreationAttributes = Optional<user_skillAttributes, user_skillOptionalAttributes>;

export class user_skill extends Model<user_skillAttributes, user_skillCreationAttributes> implements user_skillAttributes {
  US_ID!: number;
  US_USER_ID!: number;
  US_SKILL_ID!: number;

  // user_skill belongsTo skill via US_SKILL_ID
  US_SKILL!: skill;
  getUS_SKILL!: Sequelize.BelongsToGetAssociationMixin<skill>;
  setUS_SKILL!: Sequelize.BelongsToSetAssociationMixin<skill, skillId>;
  createUS_SKILL!: Sequelize.BelongsToCreateAssociationMixin<skill>;
  // user_skill belongsTo user via US_USER_ID
  US_USER!: user;
  getUS_USER!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUS_USER!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUS_USER!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_skill {
    return user_skill.init({
    US_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    US_USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'USER_ID'
      }
    },
    US_SKILL_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'skill',
        key: 'SKILL_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'user_skill',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "US_ID" },
        ]
      },
      {
        name: "IX_USer_Skill_US_SKILL_ID",
        using: "BTREE",
        fields: [
          { name: "US_SKILL_ID" },
        ]
      },
      {
        name: "IX_USer_Skill_US_USER_ID",
        using: "BTREE",
        fields: [
          { name: "US_USER_ID" },
        ]
      },
    ]
  });
  }
}
