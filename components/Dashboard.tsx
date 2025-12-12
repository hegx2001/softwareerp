import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Project, RevenueData, Client, Priority } from '../types';
import { getBusinessInsights } from '../services/aiService';
import { TrendingUp, Users, Briefcase, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';

interface DashboardProps {
  projects: Project[];
  revenueData: RevenueData[];
  clients: Client[];
}

const Dashboard: React.FC<DashboardProps> = ({ projects, revenueData, clients }) => {
  const [insight, setInsight] = useState<string>('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  // Calculate totals
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.revenue, 0);
  const activeProjects = projects.filter(p => p.progress < 100).length;
  const criticalProjects = projects.filter(p => p.priority === Priority.CRITICAL).length;
  
  const generateReport = async () => {
    setLoadingInsight(true);
    const result = await getBusinessInsights(projects, revenueData, clients);
    setInsight(result);
    setLoadingInsight(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">仪表盘概览</h2>
        <button 
          onClick={generateReport}
          disabled={loadingInsight}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm disabled:opacity-50"
        >
          {loadingInsight ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {insight ? '重新生成 AI 分析' : '生成 AI 业务洞察'}
        </button>
      </div>

      {/* AI Insight Box */}
      {insight && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">Gemini 智能分析</h3>
              <p className="text-indigo-800 leading-relaxed text-sm whitespace-pre-wrap">{insight}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">半年总营收</p>
            <p className="text-2xl font-bold text-slate-800">¥{totalRevenue}k</p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">进行中项目</p>
            <p className="text-2xl font-bold text-slate-800">{activeProjects}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">活跃客户</p>
            <p className="text-2xl font-bold text-slate-800">{clients.filter(c => c.status === 'Active').length}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-full">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">紧急事项</p>
            <p className="text-2xl font-bold text-rose-600">{criticalProjects}</p>
          </div>
          <div className="p-3 bg-rose-50 rounded-full">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">财务趋势 (千元)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" name="收入" />
                <Area type="monotone" dataKey="expenses" stroke="#fb7185" strokeWidth={2} fillOpacity={0} fill="transparent" name="支出" />
                <Legend verticalAlign="top" height={36}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">项目进度概览</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projects} layout="vertical" barSize={20}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0"/>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="progress" fill="#0ea5e9" radius={[0, 4, 4, 0]} name="完成度 (%)" background={{ fill: '#f1f5f9' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;