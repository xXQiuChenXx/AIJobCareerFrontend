import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { job_application_table, job_application_tableId } from './job_application_table';
import type { user, userId } from './user';

export interface resumeAttributes {
  RESUME_ID: number;
  RESUME_USER_ID: number;
  RESUME_TEXT: string;
  RESUME_FILE: string;
  RESUME_LAST_MODIFY_TIME: Date;
}

export type resumePk = "RESUME_ID";
export type resumeId = resume[resumePk];
export type resumeOptionalAttributes = "RESUME_ID";
export type resumeCreationAttributes = Optional<resumeAttributes, resumeOptionalAttributes>;

export class resume extends Model<resumeAttributes, resumeCreationAttributes> implements resumeAttributes {
  RESUME_ID!: number;
  RESUME_USER_ID!: number;
  RESUME_TEXT!: string;
  RESUME_FILE!: string;
  RESUME_LAST_MODIFY_TIME!: Date;

  // resume hasMany job_application_table via TABLE_RESUME_ID
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
  // resume belongsTo user via RESUME_USER_ID
  RESUME_USER!: user;
  getRESUME_USER!: Sequelize.BelongsToGetAssociationMixin<user>;
  setRESUME_USER!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createRESUME_USER!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof resume {
    return resume.init({
    RESUME_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RESUME_USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'USER_ID'
      }
    },
    RESUME_TEXT: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    RESUME_FILE: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    RESUME_LAST_MODIFY_TIME: {
      type: DataTypes.DATE(6),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'resume',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RESUME_ID" },
        ]
      },
      {
        name: "IX_Resume_RESUME_USER_ID",
        using: "BTREE",
        fields: [
          { name: "RESUME_USER_ID" },
        ]
      },
    ]
  });
  }
}
