import React, { useState } from 'react';
import { Task, Member, Project, Priority } from '../types';
import { CheckCircle2, Circle, Clock, AlertCircle, Search, Filter } from 'lucide-react';

interface TaskManagerProps {
  tasks: Task[];
  members: Member[];
  projects: Project[];
}

const TaskManager: React.FC<TaskManagerProps> = ({ tasks, members, projects }) => {
  const [filter, setFilter] = useState<'All' | 'My'>('All');
  
  // Mock current user ID
  const currentUserId = '1';

  const filteredTasks = tasks.filter(t => filter === 'All' || t.assigneeId === currentUserId);

  const getPriorityBadge = (p: Priority) => {
    switch (p) {
      case Priority.CRITICAL: return <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">紧急</span>;
      case Priority.HIGH: return <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">高</span>;
      case Priority.MEDIUM: return <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">中</span>;
      default: return <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">低</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'In Progress': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'Review': return <AlertCircle className="w-5 h-5 text-purple-500" />;
      default: return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">任务协作中心</h2>
          <p className="text-slate-500 text-sm mt-1">管理团队任务分配与进度</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white border border-slate-200 rounded-lg p-1 flex">
            <button 
              onClick={() => setFilter('All')}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors ${filter === 'All' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              所有任务
            </button>
            <button 
              onClick={() => setFilter('My')}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors ${filter === 'My' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              我的任务
            </button>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
            + 新建任务
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Task Summary Cards */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">待办任务</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{tasks.filter(t => t.status === 'Todo').length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">进行中</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{tasks.filter(t => t.status === 'In Progress').length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">本周已完成</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{tasks.filter(t => t.status === 'Done').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
           <div className="relative flex-1 max-w-md">
             <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
             <input type="text" placeholder="搜索任务..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
           </div>
           <button className="flex items-center gap-2 text-slate-600 px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">
             <Filter className="w-4 h-4" /> 筛选
           </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4 w-12">状态</th>
              <th className="px-6 py-4">任务名称</th>
              <th className="px-6 py-4">所属项目</th>
              <th className="px-6 py-4">执行人</th>
              <th className="px-6 py-4">截止日期</th>
              <th className="px-6 py-4">优先级</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTasks.map(task => {
              const assignee = members.find(m => m.id === task.assigneeId);
              const project = projects.find(p => p.id === task.projectId);
              
              return (
                <tr key={task.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    {getStatusIcon(task.status)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${task.status === 'Done' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                      {task.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {project?.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img src={assignee?.avatar} alt={assignee?.name} className="w-6 h-6 rounded-full" />
                      <span className="text-sm text-slate-700">{assignee?.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {task.dueDate}
                  </td>
                  <td className="px-6 py-4">
                    {getPriorityBadge(task.priority)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManager;