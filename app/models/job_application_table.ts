import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { job_application, job_applicationId } from './job_application';
import type { resume, resumeId } from './resume';

export interface job_application_tableAttributes {
  TABLE_ID: number;
  TABLE_APPLICATION_ID: number;
  TABLE_RESUME_ID: number;
  TABLE_COVER_LETTER: string;
}

export type job_application_tablePk = "TABLE_ID";
export type job_application_tableId = job_application_table[job_application_tablePk];
export type job_application_tableOptionalAttributes = "TABLE_ID";
export type job_application_tableCreationAttributes = Optional<job_application_tableAttributes, job_application_tableOptionalAttributes>;

export class job_application_table extends Model<job_application_tableAttributes, job_application_tableCreationAttributes> implements job_application_tableAttributes {
  TABLE_ID!: number;
  TABLE_APPLICATION_ID!: number;
  TABLE_RESUME_ID!: number;
  TABLE_COVER_LETTER!: string;

  // job_application_table belongsTo job_application via TABLE_APPLICATION_ID
  TABLE_APPLICATION!: job_application;
  getTABLE_APPLICATION!: Sequelize.BelongsToGetAssociationMixin<job_application>;
  setTABLE_APPLICATION!: Sequelize.BelongsToSetAssociationMixin<job_application, job_applicationId>;
  createTABLE_APPLICATION!: Sequelize.BelongsToCreateAssociationMixin<job_application>;
  // job_application_table belongsTo resume via TABLE_RESUME_ID
  TABLE_RESUME!: resume;
  getTABLE_RESUME!: Sequelize.BelongsToGetAssociationMixin<resume>;
  setTABLE_RESUME!: Sequelize.BelongsToSetAssociationMixin<resume, resumeId>;
  createTABLE_RESUME!: Sequelize.BelongsToCreateAssociationMixin<resume>;

  static initModel(sequelize: Sequelize.Sequelize): typeof job_application_table {
    return job_application_table.init({
    TABLE_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TABLE_APPLICATION_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job_application',
        key: 'APPLICATION_ID'
      }
    },
    TABLE_RESUME_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'resume',
        key: 'RESUME_ID'
      }
    },
    TABLE_COVER_LETTER: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'job_application_table',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TABLE_ID" },
        ]
      },
      {
        name: "IX_Job_Application_Table_TABLE_APPLICATION_ID",
        using: "BTREE",
        fields: [
          { name: "TABLE_APPLICATION_ID" },
        ]
      },
      {
        name: "IX_Job_Application_Table_TABLE_RESUME_ID",
        using: "BTREE",
        fields: [
          { name: "TABLE_RESUME_ID" },
        ]
      },
    ]
  });
  }
}
