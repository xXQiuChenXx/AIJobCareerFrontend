import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { job, jobId } from './job';
import type { skill, skillId } from './skill';

export interface job_skillAttributes {
  JS_ID: number;
  JS_JOB_ID: number;
  JS_SKILL_ID: number;
}

export type job_skillPk = "JS_ID";
export type job_skillId = job_skill[job_skillPk];
export type job_skillOptionalAttributes = "JS_ID";
export type job_skillCreationAttributes = Optional<job_skillAttributes, job_skillOptionalAttributes>;

export class job_skill extends Model<job_skillAttributes, job_skillCreationAttributes> implements job_skillAttributes {
  JS_ID!: number;
  JS_JOB_ID!: number;
  JS_SKILL_ID!: number;

  // job_skill belongsTo job via JS_JOB_ID
  JS_JOB!: job;
  getJS_JOB!: Sequelize.BelongsToGetAssociationMixin<job>;
  setJS_JOB!: Sequelize.BelongsToSetAssociationMixin<job, jobId>;
  createJS_JOB!: Sequelize.BelongsToCreateAssociationMixin<job>;
  // job_skill belongsTo skill via JS_SKILL_ID
  JS_SKILL!: skill;
  getJS_SKILL!: Sequelize.BelongsToGetAssociationMixin<skill>;
  setJS_SKILL!: Sequelize.BelongsToSetAssociationMixin<skill, skillId>;
  createJS_SKILL!: Sequelize.BelongsToCreateAssociationMixin<skill>;

  static initModel(sequelize: Sequelize.Sequelize): typeof job_skill {
    return job_skill.init({
    JS_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    JS_JOB_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job',
        key: 'JOB_ID'
      }
    },
    JS_SKILL_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'skill',
        key: 'SKILL_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'job_skill',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "JS_ID" },
        ]
      },
      {
        name: "IX_Job_Skill_JS_JOB_ID",
        using: "BTREE",
        fields: [
          { name: "JS_JOB_ID" },
        ]
      },
      {
        name: "IX_Job_Skill_JS_SKILL_ID",
        using: "BTREE",
        fields: [
          { name: "JS_SKILL_ID" },
        ]
      },
    ]
  });
  }
}
