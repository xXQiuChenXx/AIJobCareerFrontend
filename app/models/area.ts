import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { company, companyId } from './company';
import type { user, userId } from './user';

export interface areaAttributes {
  AREA_ID: number;
  AREA_NAME: string;
}

export type areaPk = "AREA_ID";
export type areaId = area[areaPk];
export type areaOptionalAttributes = "AREA_ID";
export type areaCreationAttributes = Optional<areaAttributes, areaOptionalAttributes>;

export class area extends Model<areaAttributes, areaCreationAttributes> implements areaAttributes {
  AREA_ID!: number;
  AREA_NAME!: string;

  // area hasMany company via COMPANY_AREA_ID
  companies!: company[];
  getCompanies!: Sequelize.HasManyGetAssociationsMixin<company>;
  setCompanies!: Sequelize.HasManySetAssociationsMixin<company, companyId>;
  addCompany!: Sequelize.HasManyAddAssociationMixin<company, companyId>;
  addCompanies!: Sequelize.HasManyAddAssociationsMixin<company, companyId>;
  createCompany!: Sequelize.HasManyCreateAssociationMixin<company>;
  removeCompany!: Sequelize.HasManyRemoveAssociationMixin<company, companyId>;
  removeCompanies!: Sequelize.HasManyRemoveAssociationsMixin<company, companyId>;
  hasCompany!: Sequelize.HasManyHasAssociationMixin<company, companyId>;
  hasCompanies!: Sequelize.HasManyHasAssociationsMixin<company, companyId>;
  countCompanies!: Sequelize.HasManyCountAssociationsMixin;
  // area hasMany user via USER_AREA_ID
  users!: user[];
  getUsers!: Sequelize.HasManyGetAssociationsMixin<user>;
  setUsers!: Sequelize.HasManySetAssociationsMixin<user, userId>;
  addUser!: Sequelize.HasManyAddAssociationMixin<user, userId>;
  addUsers!: Sequelize.HasManyAddAssociationsMixin<user, userId>;
  createUser!: Sequelize.HasManyCreateAssociationMixin<user>;
  removeUser!: Sequelize.HasManyRemoveAssociationMixin<user, userId>;
  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<user, userId>;
  hasUser!: Sequelize.HasManyHasAssociationMixin<user, userId>;
  hasUsers!: Sequelize.HasManyHasAssociationsMixin<user, userId>;
  countUsers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof area {
    return area.init({
    AREA_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    AREA_NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'area',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "AREA_ID" },
        ]
      },
    ]
  });
  }
}
