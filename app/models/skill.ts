import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { job_skill, job_skillId } from './job_skill';
import type { user_skill, user_skillId } from './user_skill';

export interface skillAttributes {
  SKILL_ID: number;
  SKILL_NAME: string;
  SKILL_INFO: string;
  SKILL_TYPE: string;
  SKILL_LEVEL: string;
}

export type skillPk = "SKILL_ID";
export type skillId = skill[skillPk];
export type skillOptionalAttributes = "SKILL_ID";
export type skillCreationAttributes = Optional<skillAttributes, skillOptionalAttributes>;

export class skill extends Model<skillAttributes, skillCreationAttributes> implements skillAttributes {
  SKILL_ID!: number;
  SKILL_NAME!: string;
  SKILL_INFO!: string;
  SKILL_TYPE!: string;
  SKILL_LEVEL!: string;

  // skill hasMany job_skill via JS_SKILL_ID
  job_skills!: job_skill[];
  getJob_skills!: Sequelize.HasManyGetAssociationsMixin<job_skill>;
  setJob_skills!: Sequelize.HasManySetAssociationsMixin<job_skill, job_skillId>;
  addJob_skill!: Sequelize.HasManyAddAssociationMixin<job_skill, job_skillId>;
  addJob_skills!: Sequelize.HasManyAddAssociationsMixin<job_skill, job_skillId>;
  createJob_skill!: Sequelize.HasManyCreateAssociationMixin<job_skill>;
  removeJob_skill!: Sequelize.HasManyRemoveAssociationMixin<job_skill, job_skillId>;
  removeJob_skills!: Sequelize.HasManyRemoveAssociationsMixin<job_skill, job_skillId>;
  hasJob_skill!: Sequelize.HasManyHasAssociationMixin<job_skill, job_skillId>;
  hasJob_skills!: Sequelize.HasManyHasAssociationsMixin<job_skill, job_skillId>;
  countJob_skills!: Sequelize.HasManyCountAssociationsMixin;
  // skill hasMany user_skill via US_SKILL_ID
  user_skills!: user_skill[];
  getUser_skills!: Sequelize.HasManyGetAssociationsMixin<user_skill>;
  setUser_skills!: Sequelize.HasManySetAssociationsMixin<user_skill, user_skillId>;
  addUser_skill!: Sequelize.HasManyAddAssociationMixin<user_skill, user_skillId>;
  addUser_skills!: Sequelize.HasManyAddAssociationsMixin<user_skill, user_skillId>;
  createUser_skill!: Sequelize.HasManyCreateAssociationMixin<user_skill>;
  removeUser_skill!: Sequelize.HasManyRemoveAssociationMixin<user_skill, user_skillId>;
  removeUser_skills!: Sequelize.HasManyRemoveAssociationsMixin<user_skill, user_skillId>;
  hasUser_skill!: Sequelize.HasManyHasAssociationMixin<user_skill, user_skillId>;
  hasUser_skills!: Sequelize.HasManyHasAssociationsMixin<user_skill, user_skillId>;
  countUser_skills!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof skill {
    return skill.init({
    SKILL_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SKILL_NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    SKILL_INFO: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    SKILL_TYPE: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    SKILL_LEVEL: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'skill',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SKILL_ID" },
        ]
      },
    ]
  });
  }
}
