import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { area, areaId } from './area';
import type { job, jobId } from './job';
import type { job_application_review, job_application_reviewId } from './job_application_review';
import type { notification, notificationId } from './notification';

export interface companyAttributes {
  COMPANY_ID: number;
  COMPANY_NAME: string;
  COMPANY_ICON: string;
  COMPANY_INTRO: string;
  COMPANY_WEBSITE: string;
  COMPANY_AREA_ID?: number;
}

export type companyPk = "COMPANY_ID";
export type companyId = company[companyPk];
export type companyOptionalAttributes = "COMPANY_ID" | "COMPANY_AREA_ID";
export type companyCreationAttributes = Optional<companyAttributes, companyOptionalAttributes>;

export class company extends Model<companyAttributes, companyCreationAttributes> implements companyAttributes {
  COMPANY_ID!: number;
  COMPANY_NAME!: string;
  COMPANY_ICON!: string;
  COMPANY_INTRO!: string;
  COMPANY_WEBSITE!: string;
  COMPANY_AREA_ID?: number;

  // company belongsTo area via COMPANY_AREA_ID
  COMPANY_AREA!: area;
  getCOMPANY_AREA!: Sequelize.BelongsToGetAssociationMixin<area>;
  setCOMPANY_AREA!: Sequelize.BelongsToSetAssociationMixin<area, areaId>;
  createCOMPANY_AREA!: Sequelize.BelongsToCreateAssociationMixin<area>;
  // company hasMany job via JOB_COMPANY_ID
  jobs!: job[];
  getJobs!: Sequelize.HasManyGetAssociationsMixin<job>;
  setJobs!: Sequelize.HasManySetAssociationsMixin<job, jobId>;
  addJob!: Sequelize.HasManyAddAssociationMixin<job, jobId>;
  addJobs!: Sequelize.HasManyAddAssociationsMixin<job, jobId>;
  createJob!: Sequelize.HasManyCreateAssociationMixin<job>;
  removeJob!: Sequelize.HasManyRemoveAssociationMixin<job, jobId>;
  removeJobs!: Sequelize.HasManyRemoveAssociationsMixin<job, jobId>;
  hasJob!: Sequelize.HasManyHasAssociationMixin<job, jobId>;
  hasJobs!: Sequelize.HasManyHasAssociationsMixin<job, jobId>;
  countJobs!: Sequelize.HasManyCountAssociationsMixin;
  // company hasMany job_application_review via REVIEW_COMPANY_ID
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
  // company hasMany notification via NOTIFICATION_COMPANY_ID
  notifications!: notification[];
  getNotifications!: Sequelize.HasManyGetAssociationsMixin<notification>;
  setNotifications!: Sequelize.HasManySetAssociationsMixin<notification, notificationId>;
  addNotification!: Sequelize.HasManyAddAssociationMixin<notification, notificationId>;
  addNotifications!: Sequelize.HasManyAddAssociationsMixin<notification, notificationId>;
  createNotification!: Sequelize.HasManyCreateAssociationMixin<notification>;
  removeNotification!: Sequelize.HasManyRemoveAssociationMixin<notification, notificationId>;
  removeNotifications!: Sequelize.HasManyRemoveAssociationsMixin<notification, notificationId>;
  hasNotification!: Sequelize.HasManyHasAssociationMixin<notification, notificationId>;
  hasNotifications!: Sequelize.HasManyHasAssociationsMixin<notification, notificationId>;
  countNotifications!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof company {
    return company.init({
    COMPANY_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    COMPANY_NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    COMPANY_ICON: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    COMPANY_INTRO: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    COMPANY_WEBSITE: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    COMPANY_AREA_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'area',
        key: 'AREA_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'company',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "COMPANY_ID" },
        ]
      },
      {
        name: "IX_Company_COMPANY_AREA_ID",
        using: "BTREE",
        fields: [
          { name: "COMPANY_AREA_ID" },
        ]
      },
    ]
  });
  }
}
