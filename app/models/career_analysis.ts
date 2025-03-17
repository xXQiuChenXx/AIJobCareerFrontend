import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user, userId } from './user';

export interface career_analysisAttributes {
  ANALYSIS_ID: number;
  ANALYSIS_USER_ID: number;
  ANALYSIS_AI_DIRECTION: string;
  ANALYSIS_AI_MARKET_GAP: string;
  ANALYSIS_AI_CAREER_PROSPECTS: string;
}

export type career_analysisPk = "ANALYSIS_ID";
export type career_analysisId = career_analysis[career_analysisPk];
export type career_analysisOptionalAttributes = "ANALYSIS_ID";
export type career_analysisCreationAttributes = Optional<career_analysisAttributes, career_analysisOptionalAttributes>;

export class career_analysis extends Model<career_analysisAttributes, career_analysisCreationAttributes> implements career_analysisAttributes {
  ANALYSIS_ID!: number;
  ANALYSIS_USER_ID!: number;
  ANALYSIS_AI_DIRECTION!: string;
  ANALYSIS_AI_MARKET_GAP!: string;
  ANALYSIS_AI_CAREER_PROSPECTS!: string;

  // career_analysis belongsTo user via ANALYSIS_USER_ID
  ANALYSIS_USER!: user;
  getANALYSIS_USER!: Sequelize.BelongsToGetAssociationMixin<user>;
  setANALYSIS_USER!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createANALYSIS_USER!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof career_analysis {
    return career_analysis.init({
    ANALYSIS_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ANALYSIS_USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'USER_ID'
      }
    },
    ANALYSIS_AI_DIRECTION: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ANALYSIS_AI_MARKET_GAP: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ANALYSIS_AI_CAREER_PROSPECTS: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'career_analysis',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ANALYSIS_ID" },
        ]
      },
      {
        name: "IX_Career_Analysis_ANALYSIS_USER_ID",
        using: "BTREE",
        fields: [
          { name: "ANALYSIS_USER_ID" },
        ]
      },
    ]
  });
  }
}
