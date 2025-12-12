import React from 'react';
import { FinanceRecord } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Wallet, Receipt, CreditCard } from 'lucide-react';

interface FinanceDashboardProps {
  records: FinanceRecord[];
}

const FinanceDashboard: React.FC<FinanceDashboardProps> = ({ records }) => {
  const totalIncome = records.filter(r => r.type === 'Income').reduce((sum, r) => sum + r.amount, 0);
  const totalExpense = records.filter(r => r.type === 'Expense').reduce((sum, r) => sum + r.amount, 0);
  const balance = totalIncome - totalExpense;

  // Prepare Pie Chart Data
  const expenseCategories: Record<string, number> = {};
  records.filter(r => r.type === 'Expense').forEach(r => {
    expenseCategories[r.category] = (expenseCategories[r.category] || 0) + r.amount;
  });
  
  const pieData = Object.keys(expenseCategories).map(key => ({
    name: key,
    value: expenseCategories[key]
  }));

  const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">财务中心</h2>
        <div className="text-sm text-slate-500">本月财务概况</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Net Profit</span>
          </div>
          <p className="text-indigo-100 text-sm">净利润</p>
          <p className="text-3xl font-bold mt-1">¥{balance.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <ArrowDownRight className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-slate-500 font-medium">总收入</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">¥{totalIncome.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-50 rounded-lg">
              <ArrowUpRight className="w-5 h-5 text-rose-600" />
            </div>
            <span className="text-slate-500 font-medium">总支出</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">¥{totalExpense.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">近期收支明细</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">日期</th>
                  <th className="px-6 py-3">描述</th>
                  <th className="px-6 py-3">分类</th>
                  <th className="px-6 py-3">金额</th>
                  <th className="px-6 py-3">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map(record => (
                  <tr key={record.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-500 font-mono">{record.date}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{record.description}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                        {record.category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 font-bold ${record.type === 'Income' ? 'text-green-600' : 'text-slate-800'}`}>
                      {record.type === 'Income' ? '+' : '-'}¥{record.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {record.status === 'Cleared' ? (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> 已入账
                        </span>
                      ) : (
                        <span className="text-xs text-orange-500 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> 处理中
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-6">支出构成</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
             {pieData.map((item, idx) => (
               <div key={item.name} className="flex justify-between text-sm">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
                   <span className="text-slate-600">{item.name}</span>
                 </div>
                 <span className="font-medium">¥{item.value.toLocaleString()}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;