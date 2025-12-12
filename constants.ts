import { Project, ProjectStatus, Priority, Member, Client, RevenueData, Task, Contract, FinanceRecord, Role } from './types';

export const MOCK_ROLES: Role[] = [
  { 
    id: 'r1', 
    name: '超级管理员', 
    description: '拥有系统所有权限', 
    permissions: ['view_dashboard', 'manage_projects', 'manage_tasks', 'manage_clients', 'manage_contracts', 'view_finance', 'manage_finance', 'manage_team', 'manage_settings'],
    isSystem: true
  },
  { 
    id: 'r2', 
    name: '项目经理', 
    description: '负责项目统筹与进度管理', 
    permissions: ['view_dashboard', 'manage_projects', 'manage_tasks', 'manage_clients', 'manage_contracts', 'view_finance', 'manage_team']
  },
  { 
    id: 'r3', 
    name: '研发工程师', 
    description: '专注于任务执行与代码开发', 
    permissions: ['view_dashboard', 'manage_tasks']
  },
  { 
    id: 'r4', 
    name: '财务专员', 
    description: '负责合同回款与财务记录', 
    permissions: ['view_dashboard', 'manage_contracts', 'view_finance', 'manage_finance']
  },
  { 
    id: 'r5', 
    name: '销售总监', 
    description: '负责客户关系与合同签订', 
    permissions: ['view_dashboard', 'manage_clients', 'manage_contracts']
  }
];

export const MOCK_MEMBERS: Member[] = [
  { id: '1', name: '李明', roleId: 'r1', role: 'CTO', avatar: 'https://picsum.photos/100/100?random=1', email: 'liming@devpulse.com', skills: ['React', 'Node.js', 'Architecture'], status: 'Active', joinDate: '2022-03-15' },
  { id: '2', name: '王芳', roleId: 'r3', role: 'UI 设计师', avatar: 'https://picsum.photos/100/100?random=2', email: 'wangfang@devpulse.com', skills: ['Figma', 'Tailwind', 'UX'], status: 'Active', joinDate: '2023-01-10' },
  { id: '3', name: '张伟', roleId: 'r3', role: '后端工程师', avatar: 'https://picsum.photos/100/100?random=3', email: 'zhangwei@devpulse.com', skills: ['Python', 'Go', 'SQL'], status: 'Active', joinDate: '2022-11-05' },
  { id: '4', name: '陈静', roleId: 'r2', role: '产品经理', avatar: 'https://picsum.photos/100/100?random=4', email: 'chenjing@devpulse.com', skills: ['Agile', 'Jira', 'Communication'], status: 'Active', joinDate: '2023-05-20' },
  { id: '5', name: '赵强', roleId: 'r4', role: '财务主管', avatar: 'https://picsum.photos/100/100?random=5', email: 'zhaoqiang@devpulse.com', skills: ['Excel', 'Accounting'], status: 'Active', joinDate: '2021-08-01' },
];

export const MOCK_CLIENTS: Client[] = [
  { 
    id: 'c1', 
    companyName: '未来科技', 
    contacts: [
      { id: 'cp1', name: '刘总', role: 'CEO', phone: '13800138000', email: 'ceo@futuretech.com', isPrimary: true },
      { id: 'cp2', name: '周助理', role: '助理', phone: '13900139000', email: 'zhou@futuretech.com', isPrimary: false }
    ],
    status: 'Active', 
    totalValue: 450 
  },
  { 
    id: 'c2', 
    companyName: '绿洲环保', 
    contacts: [
      { id: 'cp3', name: '赵经理', role: '项目总监', phone: '13700137000', email: 'zhao@green.org', isPrimary: true }
    ],
    status: 'Active', 
    totalValue: 120 
  },
  { 
    id: 'c3', 
    companyName: '迅捷物流', 
    contacts: [
      { id: 'cp4', name: '孙总监', role: '技术总监', phone: '13600136000', email: 'sun@fastlogistics.com', isPrimary: true }
    ],
    status: 'Lead', 
    totalValue: 80 
  },
];

export const MOCK_PROJECTS: Project[] = [
  { 
    id: 'p1', 
    name: 'SaaS 综合管理平台 v2.0', 
    client: '未来科技', 
    status: ProjectStatus.IN_PROGRESS, 
    priority: Priority.HIGH, 
    dueDate: '2024-06-30', 
    progress: 65, 
    budget: 350000, 
    members: ['1', '3'] 
  },
  { 
    id: 'p2', 
    name: '环保监测小程序', 
    client: '绿洲环保', 
    status: ProjectStatus.TESTING, 
    priority: Priority.MEDIUM, 
    dueDate: '2024-05-15', 
    progress: 90, 
    budget: 80000, 
    members: ['2', '3'] 
  },
  { 
    id: 'p3', 
    name: '物流调度 AI 引擎', 
    client: '迅捷物流', 
    status: ProjectStatus.PLANNING, 
    priority: Priority.CRITICAL, 
    dueDate: '2024-08-01', 
    progress: 10, 
    budget: 550000, 
    members: ['1', '3', '4'] 
  },
];

export const MOCK_TASKS: Task[] = [
  { id: 't1', title: '设计 SaaS 平台主页 UI', projectId: 'p1', assigneeId: '2', status: 'Done', priority: Priority.HIGH, dueDate: '2024-04-01' },
  { id: 't2', title: '实现用户登录 API', projectId: 'p1', assigneeId: '3', status: 'In Progress', priority: Priority.HIGH, dueDate: '2024-04-10' },
  { id: 't3', title: '编写监测算法文档', projectId: 'p2', assigneeId: '4', status: 'Review', priority: Priority.MEDIUM, dueDate: '2024-04-05' },
  { id: 't4', title: '优化数据库查询性能', projectId: 'p1', assigneeId: '1', status: 'Todo', priority: Priority.MEDIUM, dueDate: '2024-04-20' },
  { id: 't5', title: '调研物流路径算法', projectId: 'p3', assigneeId: '1', status: 'In Progress', priority: Priority.CRITICAL, dueDate: '2024-04-15' },
];

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: 'ctr1',
    title: '未来科技年度开发服务合同',
    clientId: 'c1',
    totalAmount: 450000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    paymentPlans: [
      { id: 'pp1', phase: '首付款 (30%)', amount: 135000, dueDate: '2024-01-10', status: 'Paid', paidDate: '2024-01-12' },
      { id: 'pp2', phase: '中期款 (40%)', amount: 180000, dueDate: '2024-06-30', status: 'Pending' },
      { id: 'pp3', phase: '尾款 (30%)', amount: 135000, dueDate: '2024-12-31', status: 'Pending' },
    ]
  },
  {
    id: 'ctr2',
    title: '绿洲环保小程序开发',
    clientId: 'c2',
    totalAmount: 80000,
    startDate: '2024-03-01',
    endDate: '2024-05-30',
    status: 'Active',
    paymentPlans: [
      { id: 'pp4', phase: '预付款', amount: 40000, dueDate: '2024-03-05', status: 'Paid', paidDate: '2024-03-06' },
      { id: 'pp5', phase: '验收款', amount: 40000, dueDate: '2024-05-30', status: 'Pending' },
    ]
  }
];

export const MOCK_FINANCE_RECORDS: FinanceRecord[] = [
  { id: 'f1', date: '2024-04-01', type: 'Expense', category: '薪资福利', amount: 150000, description: '4月员工工资发放', status: 'Cleared' },
  { id: 'f2', date: '2024-04-02', type: 'Expense', category: '办公租赁', amount: 25000, description: '季度房租摊销', status: 'Cleared' },
  { id: 'f3', date: '2024-04-05', type: 'Income', category: '项目回款', amount: 40000, description: '绿洲环保预付款', status: 'Cleared' },
  { id: 'f4', date: '2024-04-10', type: 'Expense', category: '云服务费', amount: 3500, description: 'AWS 账单', status: 'Pending' },
  { id: 'f5', date: '2024-04-12', type: 'Income', category: '技术咨询', amount: 12000, description: '临时技术咨询服务费', status: 'Cleared' },
];

export const REVENUE_DATA: RevenueData[] = [
  { month: '1月', revenue: 120, expenses: 80 },
  { month: '2月', revenue: 150, expenses: 85 },
  { month: '3月', revenue: 180, expenses: 90 },
  { month: '4月', revenue: 170, expenses: 95 },
  { month: '5月', revenue: 210, expenses: 100 },
  { month: '6月', revenue: 250, expenses: 110 },
];