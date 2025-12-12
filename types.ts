export enum ProjectStatus {
  PLANNING = '规划中',
  IN_PROGRESS = '进行中',
  TESTING = '测试中',
  COMPLETED = '已交付',
  BLOCKED = '阻塞',
}

export enum Priority {
  LOW = '低',
  MEDIUM = '中',
  HIGH = '高',
  CRITICAL = '紧急',
}

export type PermissionType = 
  | 'view_dashboard'
  | 'manage_projects'
  | 'manage_tasks' 
  | 'manage_clients'
  | 'manage_contracts'
  | 'view_finance'
  | 'manage_finance'
  | 'manage_team'
  | 'manage_settings';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: PermissionType[];
  isSystem?: boolean; // System roles cannot be deleted
}

export interface Member {
  id: string;
  name: string;
  roleId: string; // Link to Role ID
  role: string; // Display name (legacy or cached)
  avatar: string;
  email: string;
  skills: string[];
  status: 'Active' | 'Inactive';
  joinDate: string;
}

export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  isPrimary: boolean;
}

export interface Client {
  id: string;
  companyName: string;
  contacts: ContactPerson[];
  status: 'Lead' | 'Active' | 'Churned';
  totalValue: number; // In thousands
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  priority: Priority;
  dueDate: string;
  progress: number;
  budget: number;
  members: string[]; // Member IDs
}

export interface Task {
  id: string;
  title: string;
  projectId: string;
  assigneeId: string;
  status: 'Todo' | 'In Progress' | 'Review' | 'Done';
  priority: Priority;
  dueDate: string;
}

export interface PaymentPlan {
  id: string;
  phase: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paidDate?: string;
}

export interface Contract {
  id: string;
  title: string;
  clientId: string;
  totalAmount: number;
  startDate: string;
  endDate: string;
  status: 'Draft' | 'Active' | 'Completed';
  paymentPlans: PaymentPlan[];
  fileUrl?: string;
}

export interface FinanceRecord {
  id: string;
  date: string;
  type: 'Income' | 'Expense';
  category: string;
  amount: number;
  description: string;
  status: 'Cleared' | 'Pending';
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
}

export type ViewState = 'dashboard' | 'projects' | 'tasks' | 'clients' | 'contracts' | 'finance' | 'team' | 'settings';