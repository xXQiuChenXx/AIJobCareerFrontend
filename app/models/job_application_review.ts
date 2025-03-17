import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { company, companyId } from './company';
import type { job_application, job_applicationId } from './job_application';

export interface job_application_reviewAttributes {
  REVIEW_ID: number;
  REVIEW_APPLICATION_ID: number;
  REVIEW_COMPANY_ID: number;
  REVIEW_STATUS: string;
  REVIEW_CONTEXT: string;
  REVIEW_DATE: Date;
}

export type job_application_reviewPk = "REVIEW_ID";
export type job_application_reviewId = job_application_review[job_application_reviewPk];
export type job_application_reviewOptionalAttributes = "REVIEW_ID";
export type job_application_reviewCreationAttributes = Optional<job_application_reviewAttributes, job_application_reviewOptionalAttributes>;

export class job_application_review extends Model<job_application_reviewAttributes, job_application_reviewCreationAttributes> implements job_application_reviewAttributes {
  REVIEW_ID!: number;
  REVIEW_APPLICATION_ID!: number;
  REVIEW_COMPANY_ID!: number;
  REVIEW_STATUS!: string;
  REVIEW_CONTEXT!: string;
  REVIEW_DATE!: Date;

  // job_application_review belongsTo company via REVIEW_COMPANY_ID
  REVIEW_COMPANY!: company;
  getREVIEW_COMPANY!: Sequelize.BelongsToGetAssociationMixin<company>;
  setREVIEW_COMPANY!: Sequelize.BelongsToSetAssociationMixin<company, companyId>;
  createREVIEW_COMPANY!: Sequelize.BelongsToCreateAssociationMixin<company>;
  // job_application_review belongsTo job_application via REVIEW_APPLICATION_ID
  REVIEW_APPLICATION!: job_application;
  getREVIEW_APPLICATION!: Sequelize.BelongsToGetAssociationMixin<job_application>;
  setREVIEW_APPLICATION!: Sequelize.BelongsToSetAssociationMixin<job_application, job_applicationId>;
  createREVIEW_APPLICATION!: Sequelize.BelongsToCreateAssociationMixin<job_application>;

  static initModel(sequelize: Sequelize.Sequelize): typeof job_application_review {
    return job_application_review.init({
    REVIEW_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    REVIEW_APPLICATION_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job_application',
        key: 'APPLICATION_ID'
      }
    },
    REVIEW_COMPANY_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'company',
        key: 'COMPANY_ID'
      }
    },
    REVIEW_STATUS: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    REVIEW_CONTEXT: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    REVIEW_DATE: {
      type: DataTypes.DATE(6),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'job_application_review',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "REVIEW_ID" },
        ]
      },
      {
        name: "IX_Job_Application_Review_REVIEW_APPLICATION_ID",
        using: "BTREE",
        fields: [
          { name: "REVIEW_APPLICATION_ID" },
        ]
      },
      {
        name: "IX_Job_Application_Review_REVIEW_COMPANY_ID",
        using: "BTREE",
        fields: [
          { name: "REVIEW_COMPANY_ID" },
        ]
      },
    ]
  });
  }
}
