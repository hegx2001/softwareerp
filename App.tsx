import React, { useState } from 'react';
import { LayoutDashboard, FolderKanban, Users, Settings, LogOut, Code2, Users2, CheckSquare, FileText, PieChart as PieChartIcon } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ProjectBoard from './components/ProjectBoard';
import ClientList from './components/ClientList';
import TeamView from './components/TeamView';
import TaskManager from './components/TaskManager';
import ContractManager from './components/ContractManager';
import FinanceDashboard from './components/FinanceDashboard';
import SettingsView from './components/SettingsView';
import AiAssistant from './components/AiAssistant';
import { ViewState } from './types';
import { MOCK_PROJECTS, REVENUE_DATA, MOCK_CLIENTS, MOCK_MEMBERS, MOCK_TASKS, MOCK_CONTRACTS, MOCK_FINANCE_RECORDS, MOCK_ROLES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard projects={MOCK_PROJECTS} revenueData={REVENUE_DATA} clients={MOCK_CLIENTS} />;
      case 'projects':
        return <ProjectBoard projects={MOCK_PROJECTS} members={MOCK_MEMBERS} />;
      case 'tasks':
        return <TaskManager tasks={MOCK_TASKS} members={MOCK_MEMBERS} projects={MOCK_PROJECTS} />;
      case 'clients':
        return <ClientList clients={MOCK_CLIENTS} />;
      case 'contracts':
        return <ContractManager contracts={MOCK_CONTRACTS} clients={MOCK_CLIENTS} />;
      case 'finance':
        return <FinanceDashboard records={MOCK_FINANCE_RECORDS} />;
      case 'team':
        return <TeamView members={MOCK_MEMBERS} />;
      case 'settings':
        return <SettingsView members={MOCK_MEMBERS} roles={MOCK_ROLES} />;
      default:
        return <div className="p-10 text-center text-slate-500">正在建设中...</div>;
    }
  };

  const getContextDataForAI = () => {
    const totalPending = MOCK_CONTRACTS.reduce((sum, c) => sum + c.paymentPlans.filter(p => p.status !== 'Paid').reduce((s, p) => s + p.amount, 0), 0);
    const totalTodo = MOCK_TASKS.filter(t => t.status !== 'Done').length;

    return `
      当前公司数据快照:
      - 活跃项目: ${MOCK_PROJECTS.length} 个
      - 待办任务: ${totalTodo} 个
      - 客户总数: ${MOCK_CLIENTS.length} 个
      - 待回款总额: ¥${totalPending}
      - 团队成员: ${MOCK_MEMBERS.map(m => m.name).join(', ')}
      - 最近营收: ¥${REVENUE_DATA[REVENUE_DATA.length - 1].revenue}k
    `;
  };

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState; icon: any; label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        currentView === view 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0 transition-all duration-300">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">DevPulse</h1>
            <p className="text-xs text-slate-400">Software ERP</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-2">核心业务</p>
          <NavItem view="dashboard" icon={LayoutDashboard} label="概览仪表盘" />
          <NavItem view="projects" icon={FolderKanban} label="项目管理" />
          <NavItem view="tasks" icon={CheckSquare} label="任务协作" />
          
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6">商务与财务</p>
          <NavItem view="contracts" icon={FileText} label="合同与回款" />
          <NavItem view="finance" icon={PieChartIcon} label="财务中心" />
          <NavItem view="clients" icon={Users} label="客户名录" />
          
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6">行政管理</p>
          <NavItem view="team" icon={Users2} label="团队成员" />
          <NavItem view="settings" icon={Settings} label="系统设置" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-2 w-full transition-colors">
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
          <h2 className="text-xl font-semibold text-slate-800">
            {currentView === 'dashboard' && '早上好，管理员'}
            {currentView === 'projects' && '项目看板'}
            {currentView === 'tasks' && '团队任务'}
            {currentView === 'contracts' && '合同管理'}
            {currentView === 'finance' && '财务概览'}
            {currentView === 'clients' && '客户名录'}
            {currentView === 'team' && '团队概况'}
            {currentView === 'settings' && '设置'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-slate-800">Admin User</p>
              <p className="text-xs text-slate-500">超级管理员</p>
            </div>
            <img 
              src="https://picsum.photos/200/200?random=admin" 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-slate-100" 
            />
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>

        {/* AI Assistant Widget */}
        <AiAssistant contextData={getContextDataForAI()} />
      </main>
    </div>
  );
};

export default App;