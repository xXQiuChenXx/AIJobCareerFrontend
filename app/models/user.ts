import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { area, areaId } from './area';
import type { career_analysis, career_analysisId } from './career_analysis';
import type { notification, notificationId } from './notification';
import type { resume, resumeId } from './resume';
import type { user_application, user_applicationId } from './user_application';
import type { user_skill, user_skillId } from './user_skill';

export interface userAttributes {
  USER_ID: number;
  USERNAME: string;
  USER_FIRST_NAME: string;
  USER_LAST_NAME: string;
  USER_AGE?: number;
  USER_INTRO?: string;
  USER_CONTACT_NUMBER?: string;
  USER_EMAIL: string;
  USER_PASSWORD: string;
  USER_ICON?: string;
  USER_PRIVACY_STATUS: string;
  USER_ROLE: string;
  USER_ACCOUNT_CREATED_TIME: Date;
  LastLoginAt?: Date;
  USER_AREA_ID?: number;
}

export type userPk = "USER_ID";
export type userId = user[userPk];
export type userOptionalAttributes = "USER_ID" | "USER_AGE" | "USER_INTRO" | "USER_CONTACT_NUMBER" | "USER_ICON" | "LastLoginAt" | "USER_AREA_ID";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  USER_ID!: number;
  USERNAME!: string;
  USER_FIRST_NAME!: string;
  USER_LAST_NAME!: string;
  USER_AGE?: number;
  USER_INTRO?: string;
  USER_CONTACT_NUMBER?: string;
  USER_EMAIL!: string;
  USER_PASSWORD!: string;
  USER_ICON?: string;
  USER_PRIVACY_STATUS!: string;
  USER_ROLE!: string;
  USER_ACCOUNT_CREATED_TIME!: Date;
  LastLoginAt?: Date;
  USER_AREA_ID?: number;

  // user belongsTo area via USER_AREA_ID
  USER_AREA!: area;
  getUSER_AREA!: Sequelize.BelongsToGetAssociationMixin<area>;
  setUSER_AREA!: Sequelize.BelongsToSetAssociationMixin<area, areaId>;
  createUSER_AREA!: Sequelize.BelongsToCreateAssociationMixin<area>;
  // user hasMany career_analysis via ANALYSIS_USER_ID
  career_analyses!: career_analysis[];
  getCareer_analyses!: Sequelize.HasManyGetAssociationsMixin<career_analysis>;
  setCareer_analyses!: Sequelize.HasManySetAssociationsMixin<career_analysis, career_analysisId>;
  addCareer_analyasis!: Sequelize.HasManyAddAssociationMixin<career_analysis, career_analysisId>;
  addCareer_analyses!: Sequelize.HasManyAddAssociationsMixin<career_analysis, career_analysisId>;
  createCareer_analyasis!: Sequelize.HasManyCreateAssociationMixin<career_analysis>;
  removeCareer_analyasis!: Sequelize.HasManyRemoveAssociationMixin<career_analysis, career_analysisId>;
  removeCareer_analyses!: Sequelize.HasManyRemoveAssociationsMixin<career_analysis, career_analysisId>;
  hasCareer_analyasis!: Sequelize.HasManyHasAssociationMixin<career_analysis, career_analysisId>;
  hasCareer_analyses!: Sequelize.HasManyHasAssociationsMixin<career_analysis, career_analysisId>;
  countCareer_analyses!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany notification via NOTIFICATION_USER_ID
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
  // user hasMany resume via RESUME_USER_ID
  resumes!: resume[];
  getResumes!: Sequelize.HasManyGetAssociationsMixin<resume>;
  setResumes!: Sequelize.HasManySetAssociationsMixin<resume, resumeId>;
  addResume!: Sequelize.HasManyAddAssociationMixin<resume, resumeId>;
  addResumes!: Sequelize.HasManyAddAssociationsMixin<resume, resumeId>;
  createResume!: Sequelize.HasManyCreateAssociationMixin<resume>;
  removeResume!: Sequelize.HasManyRemoveAssociationMixin<resume, resumeId>;
  removeResumes!: Sequelize.HasManyRemoveAssociationsMixin<resume, resumeId>;
  hasResume!: Sequelize.HasManyHasAssociationMixin<resume, resumeId>;
  hasResumes!: Sequelize.HasManyHasAssociationsMixin<resume, resumeId>;
  countResumes!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany user_application via UA_USER_ID
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
  // user hasMany user_skill via US_USER_ID
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

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
    USER_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    USERNAME: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    USER_FIRST_NAME: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    USER_LAST_NAME: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    USER_AGE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    USER_INTRO: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    USER_CONTACT_NUMBER: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    USER_EMAIL: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_PASSWORD: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_ICON: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    USER_PRIVACY_STATUS: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    USER_ROLE: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    USER_ACCOUNT_CREATED_TIME: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    LastLoginAt: {
      type: DataTypes.DATE(6),
      allowNull: true
    },
    USER_AREA_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'area',
        key: 'AREA_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
      {
        name: "IX_User_USER_AREA_ID",
        using: "BTREE",
        fields: [
          { name: "USER_AREA_ID" },
        ]
      },
    ]
  });
  }
}
