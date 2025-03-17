import type { Sequelize } from "sequelize";
import { __efmigrationshistory as ___efmigrationshistory } from "./__efmigrationshistory";
import type { __efmigrationshistoryAttributes, __efmigrationshistoryCreationAttributes } from "./__efmigrationshistory";
import { area as _area } from "./area";
import type { areaAttributes, areaCreationAttributes } from "./area";
import { career_analysis as _career_analysis } from "./career_analysis";
import type { career_analysisAttributes, career_analysisCreationAttributes } from "./career_analysis";
import { company as _company } from "./company";
import type { companyAttributes, companyCreationAttributes } from "./company";
import { job as _job } from "./job";
import type { jobAttributes, jobCreationAttributes } from "./job";
import { job_application as _job_application } from "./job_application";
import type { job_applicationAttributes, job_applicationCreationAttributes } from "./job_application";
import { job_application_review as _job_application_review } from "./job_application_review";
import type { job_application_reviewAttributes, job_application_reviewCreationAttributes } from "./job_application_review";
import { job_application_table as _job_application_table } from "./job_application_table";
import type { job_application_tableAttributes, job_application_tableCreationAttributes } from "./job_application_table";
import { job_skill as _job_skill } from "./job_skill";
import type { job_skillAttributes, job_skillCreationAttributes } from "./job_skill";
import { notification as _notification } from "./notification";
import type { notificationAttributes, notificationCreationAttributes } from "./notification";
import { resume as _resume } from "./resume";
import type { resumeAttributes, resumeCreationAttributes } from "./resume";
import { skill as _skill } from "./skill";
import type { skillAttributes, skillCreationAttributes } from "./skill";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";
import { user_application as _user_application } from "./user_application";
import type { user_applicationAttributes, user_applicationCreationAttributes } from "./user_application";
import { user_skill as _user_skill } from "./user_skill";
import type { user_skillAttributes, user_skillCreationAttributes } from "./user_skill";

export {
  ___efmigrationshistory as __efmigrationshistory,
  _area as area,
  _career_analysis as career_analysis,
  _company as company,
  _job as job,
  _job_application as job_application,
  _job_application_review as job_application_review,
  _job_application_table as job_application_table,
  _job_skill as job_skill,
  _notification as notification,
  _resume as resume,
  _skill as skill,
  _user as user,
  _user_application as user_application,
  _user_skill as user_skill,
};

export type {
  __efmigrationshistoryAttributes,
  __efmigrationshistoryCreationAttributes,
  areaAttributes,
  areaCreationAttributes,
  career_analysisAttributes,
  career_analysisCreationAttributes,
  companyAttributes,
  companyCreationAttributes,
  jobAttributes,
  jobCreationAttributes,
  job_applicationAttributes,
  job_applicationCreationAttributes,
  job_application_reviewAttributes,
  job_application_reviewCreationAttributes,
  job_application_tableAttributes,
  job_application_tableCreationAttributes,
  job_skillAttributes,
  job_skillCreationAttributes,
  notificationAttributes,
  notificationCreationAttributes,
  resumeAttributes,
  resumeCreationAttributes,
  skillAttributes,
  skillCreationAttributes,
  userAttributes,
  userCreationAttributes,
  user_applicationAttributes,
  user_applicationCreationAttributes,
  user_skillAttributes,
  user_skillCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const __efmigrationshistory = ___efmigrationshistory.initModel(sequelize);
  const area = _area.initModel(sequelize);
  const career_analysis = _career_analysis.initModel(sequelize);
  const company = _company.initModel(sequelize);
  const job = _job.initModel(sequelize);
  const job_application = _job_application.initModel(sequelize);
  const job_application_review = _job_application_review.initModel(sequelize);
  const job_application_table = _job_application_table.initModel(sequelize);
  const job_skill = _job_skill.initModel(sequelize);
  const notification = _notification.initModel(sequelize);
  const resume = _resume.initModel(sequelize);
  const skill = _skill.initModel(sequelize);
  const user = _user.initModel(sequelize);
  const user_application = _user_application.initModel(sequelize);
  const user_skill = _user_skill.initModel(sequelize);

  company.belongsTo(area, { as: "COMPANY_AREA", foreignKey: "COMPANY_AREA_ID"});
  area.hasMany(company, { as: "companies", foreignKey: "COMPANY_AREA_ID"});
  user.belongsTo(area, { as: "USER_AREA", foreignKey: "USER_AREA_ID"});
  area.hasMany(user, { as: "users", foreignKey: "USER_AREA_ID"});
  job.belongsTo(company, { as: "JOB_COMPANY", foreignKey: "JOB_COMPANY_ID"});
  company.hasMany(job, { as: "jobs", foreignKey: "JOB_COMPANY_ID"});
  job_application_review.belongsTo(company, { as: "REVIEW_COMPANY", foreignKey: "REVIEW_COMPANY_ID"});
  company.hasMany(job_application_review, { as: "job_application_reviews", foreignKey: "REVIEW_COMPANY_ID"});
  notification.belongsTo(company, { as: "NOTIFICATION_COMPANY", foreignKey: "NOTIFICATION_COMPANY_ID"});
  company.hasMany(notification, { as: "notifications", foreignKey: "NOTIFICATION_COMPANY_ID"});
  job_application.belongsTo(job, { as: "APPLICATION_JOB", foreignKey: "APPLICATION_JOB_ID"});
  job.hasMany(job_application, { as: "job_applications", foreignKey: "APPLICATION_JOB_ID"});
  job_skill.belongsTo(job, { as: "JS_JOB", foreignKey: "JS_JOB_ID"});
  job.hasMany(job_skill, { as: "job_skills", foreignKey: "JS_JOB_ID"});
  job_application_review.belongsTo(job_application, { as: "REVIEW_APPLICATION", foreignKey: "REVIEW_APPLICATION_ID"});
  job_application.hasMany(job_application_review, { as: "job_application_reviews", foreignKey: "REVIEW_APPLICATION_ID"});
  job_application_table.belongsTo(job_application, { as: "TABLE_APPLICATION", foreignKey: "TABLE_APPLICATION_ID"});
  job_application.hasMany(job_application_table, { as: "job_application_tables", foreignKey: "TABLE_APPLICATION_ID"});
  user_application.belongsTo(job_application, { as: "UA_APPLICATION", foreignKey: "UA_APPLICATION_ID"});
  job_application.hasMany(user_application, { as: "user_applications", foreignKey: "UA_APPLICATION_ID"});
  job_application_table.belongsTo(resume, { as: "TABLE_RESUME", foreignKey: "TABLE_RESUME_ID"});
  resume.hasMany(job_application_table, { as: "job_application_tables", foreignKey: "TABLE_RESUME_ID"});
  job_skill.belongsTo(skill, { as: "JS_SKILL", foreignKey: "JS_SKILL_ID"});
  skill.hasMany(job_skill, { as: "job_skills", foreignKey: "JS_SKILL_ID"});
  user_skill.belongsTo(skill, { as: "US_SKILL", foreignKey: "US_SKILL_ID"});
  skill.hasMany(user_skill, { as: "user_skills", foreignKey: "US_SKILL_ID"});
  career_analysis.belongsTo(user, { as: "ANALYSIS_USER", foreignKey: "ANALYSIS_USER_ID"});
  user.hasMany(career_analysis, { as: "career_analyses", foreignKey: "ANALYSIS_USER_ID"});
  notification.belongsTo(user, { as: "NOTIFICATION_USER", foreignKey: "NOTIFICATION_USER_ID"});
  user.hasMany(notification, { as: "notifications", foreignKey: "NOTIFICATION_USER_ID"});
  resume.belongsTo(user, { as: "RESUME_USER", foreignKey: "RESUME_USER_ID"});
  user.hasMany(resume, { as: "resumes", foreignKey: "RESUME_USER_ID"});
  user_application.belongsTo(user, { as: "UA_USER", foreignKey: "UA_USER_ID"});
  user.hasMany(user_application, { as: "user_applications", foreignKey: "UA_USER_ID"});
  user_skill.belongsTo(user, { as: "US_USER", foreignKey: "US_USER_ID"});
  user.hasMany(user_skill, { as: "user_skills", foreignKey: "US_USER_ID"});

  return {
    __efmigrationshistory: __efmigrationshistory,
    area: area,
    career_analysis: career_analysis,
    company: company,
    job: job,
    job_application: job_application,
    job_application_review: job_application_review,
    job_application_table: job_application_table,
    job_skill: job_skill,
    notification: notification,
    resume: resume,
    skill: skill,
    user: user,
    user_application: user_application,
    user_skill: user_skill,
  };
}
