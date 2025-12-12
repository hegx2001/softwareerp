import React from 'react';
import { Contract, Client } from '../types';
import { FileText, ChevronDown, CheckCircle, Clock, AlertTriangle, Download, DollarSign } from 'lucide-react';

interface ContractManagerProps {
  contracts: Contract[];
  clients: Client[];
}

const ContractManager: React.FC<ContractManagerProps> = ({ contracts, clients }) => {
  const getTotalPending = () => {
    let total = 0;
    contracts.forEach(c => {
      c.paymentPlans.forEach(p => {
        if (p.status !== 'Paid') total += p.amount;
      });
    });
    return total;
  };

  const getTotalPaid = () => {
    let total = 0;
    contracts.forEach(c => {
      c.paymentPlans.forEach(p => {
        if (p.status === 'Paid') total += p.amount;
      });
    });
    return total;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">合同与回款管理</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
          + 起草合同
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg shadow-indigo-200">
          <div className="flex items-center gap-3 mb-2 opacity-80">
            <DollarSign className="w-5 h-5" />
            <span className="font-medium">待回款总额 (应收账款)</span>
          </div>
          <div className="text-4xl font-bold">¥{getTotalPending().toLocaleString()}</div>
          <div className="mt-4 text-sm opacity-70 bg-indigo-700 inline-block px-3 py-1 rounded-full">
             未来 30 天内预期回款: ¥40,000
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
           <div className="flex items-center gap-3 mb-2 text-slate-500">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">本年度已回款</span>
          </div>
          <div className="text-4xl font-bold text-slate-800">¥{getTotalPaid().toLocaleString()}</div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
             <div className="bg-green-500 h-full rounded-full" style={{ width: '45%' }}></div>
          </div>
          <div className="mt-2 text-xs text-slate-400">年度回款目标完成度 45%</div>
        </div>
      </div>

      <div className="space-y-4">
        {contracts.map(contract => {
          const client = clients.find(c => c.id === contract.clientId);
          const paidAmount = contract.paymentPlans.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
          const progress = (paidAmount / contract.totalAmount) * 100;

          return (
            <div key={contract.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-slate-50">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{contract.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        客户: <span className="text-indigo-600 font-medium">{client?.companyName}</span> • 
                        期限: {contract.startDate} 至 {contract.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-800">¥{contract.totalAmount.toLocaleString()}</div>
                    <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-medium border border-green-100">
                      {contract.status === 'Active' ? '执行中' : contract.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">回款进度</span>
                    <span className="font-medium text-slate-700">
                      ¥{paidAmount.toLocaleString()} / ¥{contract.totalAmount.toLocaleString()} ({Math.round(progress)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${progress === 100 ? 'bg-green-500' : 'bg-indigo-500'}`} 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">分期计划</h4>
                <div className="space-y-3">
                  {contract.paymentPlans.map(plan => (
                    <div key={plan.id} className="flex items-center justify-between text-sm bg-white p-3 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-3">
                        {plan.status === 'Paid' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : plan.status === 'Overdue' ? (
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-slate-400" />
                        )}
                        <div>
                          <div className="font-medium text-slate-700">{plan.phase}</div>
                          <div className="text-xs text-slate-400">应付日期: {plan.dueDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-slate-700">¥{plan.amount.toLocaleString()}</span>
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          plan.status === 'Paid' ? 'bg-green-100 text-green-700' :
                          plan.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {plan.status === 'Paid' ? '已收' : plan.status === 'Overdue' ? '已逾期' : '待付'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContractManager;