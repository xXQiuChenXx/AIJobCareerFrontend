import { type Company, type CompanyWithJobs } from "../models/company";
import { apiClient } from "./api-client";

export const CompanyService = {
  async getAllCompanies(): Promise<Company[]> {
    try {
      return await apiClient.get<Company[]>("/Company");
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      throw error;
    }
  },

  async getCompanyById(id: string): Promise<Company> {
    try {
      return await apiClient.get<Company>(`/Company/${id}`);
    } catch (error) {
      console.error(`Failed to fetch company with ID ${id}:`, error);
      throw error;
    }
  },
  
  async getCompanyJobsById(id: string): Promise<CompanyWithJobs> {
    try {
      return await apiClient.get<CompanyWithJobs>(`/Company/${id}/jobs`);
    } catch (error) {
      console.error(`Failed to fetch company jobs with ID ${id}:`, error);
      throw error;
    }
  },

  async createCompany(company: Omit<Company, "company_id">): Promise<Company> {
    try {
      return await apiClient.post<Company>("/Company", company);
    } catch (error) {
      console.error("Failed to create company:", error);
      throw error;
    }
  },

  async updateCompany(company: Partial<Company> & { company_id: string }): Promise<Company> {
    try {
      return await apiClient.put<Company>(`/Company/${company.company_id}`, company);
    } catch (error) {
      console.error(`Failed to update company with ID ${company.company_id}:`, error);
      throw error;
    }
  },

  async deleteCompany(id: string): Promise<void> {
    try {
      await apiClient.delete(`/Company/${id}`);
    } catch (error) {
      console.error(`Failed to delete company with ID ${id}:`, error);
      throw error;
    }
  },
};
