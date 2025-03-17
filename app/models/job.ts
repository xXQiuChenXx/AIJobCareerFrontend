import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { company, companyId } from './company';
import type { job_application, job_applicationId } from './job_application';
import type { job_skill, job_skillId } from './job_skill';

export interface jobAttributes {
  JOB_ID: number;
  JOB_COMPANY_ID: number;
  JOB_TITLE: string;
  JOB_RESPONSIBLE: string;
  JOB_SALARY_MIN?: number;
  JOB_SALARY_MAX?: number;
  JOB_LOCATION: string;
  JOB_STATUS: string;
  JOB_BENEFIT: string;
  JOB_REQUIREMENT: string;
}

export type jobPk = "JOB_ID";
export type jobId = job[jobPk];
export type jobOptionalAttributes = "JOB_ID" | "JOB_SALARY_MIN" | "JOB_SALARY_MAX";
export type jobCreationAttributes = Optional<jobAttributes, jobOptionalAttributes>;

export class job extends Model<jobAttributes, jobCreationAttributes> implements jobAttributes {
  JOB_ID!: number;
  JOB_COMPANY_ID!: number;
  JOB_TITLE!: string;
  JOB_RESPONSIBLE!: string;
  JOB_SALARY_MIN?: number;
  JOB_SALARY_MAX?: number;
  JOB_LOCATION!: string;
  JOB_STATUS!: string;
  JOB_BENEFIT!: string;
  JOB_REQUIREMENT!: string;

  // job belongsTo company via JOB_COMPANY_ID
  JOB_COMPANY!: company;
  getJOB_COMPANY!: Sequelize.BelongsToGetAssociationMixin<company>;
  setJOB_COMPANY!: Sequelize.BelongsToSetAssociationMixin<company, companyId>;
  createJOB_COMPANY!: Sequelize.BelongsToCreateAssociationMixin<company>;
  // job hasMany job_application via APPLICATION_JOB_ID
  job_applications!: job_application[];
  getJob_applications!: Sequelize.HasManyGetAssociationsMixin<job_application>;
  setJob_applications!: Sequelize.HasManySetAssociationsMixin<job_application, job_applicationId>;
  addJob_application!: Sequelize.HasManyAddAssociationMixin<job_application, job_applicationId>;
  addJob_applications!: Sequelize.HasManyAddAssociationsMixin<job_application, job_applicationId>;
  createJob_application!: Sequelize.HasManyCreateAssociationMixin<job_application>;
  removeJob_application!: Sequelize.HasManyRemoveAssociationMixin<job_application, job_applicationId>;
  removeJob_applications!: Sequelize.HasManyRemoveAssociationsMixin<job_application, job_applicationId>;
  hasJob_application!: Sequelize.HasManyHasAssociationMixin<job_application, job_applicationId>;
  hasJob_applications!: Sequelize.HasManyHasAssociationsMixin<job_application, job_applicationId>;
  countJob_applications!: Sequelize.HasManyCountAssociationsMixin;
  // job hasMany job_skill via JS_JOB_ID
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

  static initModel(sequelize: Sequelize.Sequelize): typeof job {
    return job.init({
    JOB_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    JOB_COMPANY_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'company',
        key: 'COMPANY_ID'
      }
    },
    JOB_TITLE: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    JOB_RESPONSIBLE: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    JOB_SALARY_MIN: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    JOB_SALARY_MAX: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    JOB_LOCATION: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    JOB_STATUS: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    JOB_BENEFIT: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    JOB_REQUIREMENT: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'job',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "JOB_ID" },
        ]
      },
      {
        name: "IX_Job_JOB_COMPANY_ID",
        using: "BTREE",
        fields: [
          { name: "JOB_COMPANY_ID" },
        ]
      },
    ]
  });
  }
}
