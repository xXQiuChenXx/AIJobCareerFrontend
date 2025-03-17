import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { job, jobId } from './job';
import type { job_application_review, job_application_reviewId } from './job_application_review';
import type { job_application_table, job_application_tableId } from './job_application_table';
import type { user_application, user_applicationId } from './user_application';

export interface job_applicationAttributes {
  APPLICATION_ID: number;
  APPLICATION_JOB_ID: number;
  APPLICATION_TYPE: string;
  APPLICATION_STATUS: string;
  APPLICATION_SUBMISSION_DATE: Date;
}

export type job_applicationPk = "APPLICATION_ID";
export type job_applicationId = job_application[job_applicationPk];
export type job_applicationOptionalAttributes = "APPLICATION_ID";
export type job_applicationCreationAttributes = Optional<job_applicationAttributes, job_applicationOptionalAttributes>;

export class job_application extends Model<job_applicationAttributes, job_applicationCreationAttributes> implements job_applicationAttributes {
  APPLICATION_ID!: number;
  APPLICATION_JOB_ID!: number;
  APPLICATION_TYPE!: string;
  APPLICATION_STATUS!: string;
  APPLICATION_SUBMISSION_DATE!: Date;

  // job_application belongsTo job via APPLICATION_JOB_ID
  APPLICATION_JOB!: job;
  getAPPLICATION_JOB!: Sequelize.BelongsToGetAssociationMixin<job>;
  setAPPLICATION_JOB!: Sequelize.BelongsToSetAssociationMixin<job, jobId>;
  createAPPLICATION_JOB!: Sequelize.BelongsToCreateAssociationMixin<job>;
  // job_application hasMany job_application_review via REVIEW_APPLICATION_ID
  job_application_reviews!: job_application_review[];
  getJob_application_reviews!: Sequelize.HasManyGetAssociationsMixin<job_application_review>;
  setJob_application_reviews!: Sequelize.HasManySetAssociationsMixin<job_application_review, job_application_reviewId>;
  addJob_application_review!: Sequelize.HasManyAddAssociationMixin<job_application_review, job_application_reviewId>;
  addJob_application_reviews!: Sequelize.HasManyAddAssociationsMixin<job_application_review, job_application_reviewId>;
  createJob_application_review!: Sequelize.HasManyCreateAssociationMixin<job_application_review>;
  removeJob_application_review!: Sequelize.HasManyRemoveAssociationMixin<job_application_review, job_application_reviewId>;
  removeJob_application_reviews!: Sequelize.HasManyRemoveAssociationsMixin<job_application_review, job_application_reviewId>;
  hasJob_application_review!: Sequelize.HasManyHasAssociationMixin<job_application_review, job_application_reviewId>;
  hasJob_application_reviews!: Sequelize.HasManyHasAssociationsMixin<job_application_review, job_application_reviewId>;
  countJob_application_reviews!: Sequelize.HasManyCountAssociationsMixin;
  // job_application hasMany job_application_table via TABLE_APPLICATION_ID
  job_application_tables!: job_application_table[];
  getJob_application_tables!: Sequelize.HasManyGetAssociationsMixin<job_application_table>;
  setJob_application_tables!: Sequelize.HasManySetAssociationsMixin<job_application_table, job_application_tableId>;
  addJob_application_table!: Sequelize.HasManyAddAssociationMixin<job_application_table, job_application_tableId>;
  addJob_application_tables!: Sequelize.HasManyAddAssociationsMixin<job_application_table, job_application_tableId>;
  createJob_application_table!: Sequelize.HasManyCreateAssociationMixin<job_application_table>;
  removeJob_application_table!: Sequelize.HasManyRemoveAssociationMixin<job_application_table, job_application_tableId>;
  removeJob_application_tables!: Sequelize.HasManyRemoveAssociationsMixin<job_application_table, job_application_tableId>;
  hasJob_application_table!: Sequelize.HasManyHasAssociationMixin<job_application_table, job_application_tableId>;
  hasJob_application_tables!: Sequelize.HasManyHasAssociationsMixin<job_application_table, job_application_tableId>;
  countJob_application_tables!: Sequelize.HasManyCountAssociationsMixin;
  // job_application hasMany user_application via UA_APPLICATION_ID
  user_applications!: user_application[];
  getUser_applications!: Sequelize.HasManyGetAssociationsMixin<user_application>;
  setUser_applications!: Sequelize.HasManySetAssociationsMixin<user_application, user_applicationId>;
  addUser_application!: Sequelize.HasManyAddAssociationMixin<user_application, user_applicationId>;
  addUser_applications!: Sequelize.HasManyAddAssociationsMixin<user_application, user_applicationId>;
  createUser_application!: Sequelize.HasManyCreateAssociationMixin<user_application>;
  removeUser_application!: Sequelize.HasManyRemoveAssociationMixin<user_application, user_applicationId>;
  removeUser_applications!: Sequelize.HasManyRemoveAssociationsMixin<user_application, user_applicationId>;
  hasUser_application!: Sequelize.HasManyHasAssociationMixin<user_application, user_applicationId>;
  hasUser_applications!: Sequelize.HasManyHasAssociationsMixin<user_application, user_applicationId>;
  countUser_applications!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof job_application {
    return job_application.init({
    APPLICATION_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    APPLICATION_JOB_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job',
        key: 'JOB_ID'
      }
    },
    APPLICATION_TYPE: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    APPLICATION_STATUS: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    APPLICATION_SUBMISSION_DATE: {
      type: DataTypes.DATE(6),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'job_application',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "APPLICATION_ID" },
        ]
      },
      {
        name: "IX_Job_Application_APPLICATION_JOB_ID",
        using: "BTREE",
        fields: [
          { name: "APPLICATION_JOB_ID" },
        ]
      },
    ]
  });
  }
}
