import React, { useState } from 'react';
import { Client } from '../types';
import { Mail, Building2, User, DollarSign, Phone, ChevronDown, ChevronUp } from 'lucide-react';

interface ClientListProps {
  clients: Client[];
}

const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  const [expandedClientId, setExpandedClientId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedClientId === id) {
      setExpandedClientId(null);
    } else {
      setExpandedClientId(id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <div>
           <h2 className="text-xl font-bold text-slate-800">客户关系管理 (CRM)</h2>
           <p className="text-sm text-slate-500 mt-1">管理客户企业信息及多联系人</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
          + 新增客户
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 w-10"></th>
              <th className="px-6 py-4">公司名称</th>
              <th className="px-6 py-4">主要联系人</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4">累计合作金额</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.map(client => {
              const primaryContact = client.contacts.find(c => c.isPrimary) || client.contacts[0];
              const isExpanded = expandedClientId === client.id;

              return (
                <React.Fragment key={client.id}>
                  <tr 
                    className={`hover:bg-slate-50 transition-colors cursor-pointer ${isExpanded ? 'bg-slate-50' : ''}`}
                    onClick={() => toggleExpand(client.id)}
                  >
                    <td className="px-6 py-4 text-slate-400">
                       {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div className="font-semibold text-slate-800">{client.companyName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{primaryContact?.name}</span>
                        <span className="text-xs text-slate-400">({primaryContact?.role})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        client.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 
                        client.status === 'Lead' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-50 text-gray-500 border-gray-100'
                      }`}>
                        {client.status === 'Active' ? '合作中' : client.status === 'Lead' ? '潜在' : '流失'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-slate-700 font-medium">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        {client.totalValue}k
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">查看详情</button>
                    </td>
                  </tr>
                  
                  {/* Expanded Contact Details */}
                  {isExpanded && (
                    <tr className="bg-slate-50/50">
                      <td colSpan={6} className="px-6 py-4 pl-20">
                        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                           <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                             <User className="w-3 h-3" /> 所有联系人列表
                           </h4>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {client.contacts.map(contact => (
                               <div key={contact.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:border-indigo-200 transition-colors">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-slate-700">{contact.name}</span>
                                      {contact.isPrimary && <span className="bg-indigo-100 text-indigo-700 text-[10px] px-1.5 py-0.5 rounded">主要</span>}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-0.5">{contact.role}</div>
                                  </div>
                                  <div className="text-right text-xs space-y-1">
                                    <div className="flex items-center gap-1 text-slate-600 justify-end">
                                      <Phone className="w-3 h-3" /> {contact.phone}
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-600 justify-end">
                                      <Mail className="w-3 h-3" /> {contact.email}
                                    </div>
                                  </div>
                               </div>
                             ))}
                             
                             {/* Add Contact Button Placeholder */}
                             <button className="flex items-center justify-center p-3 border border-dashed border-slate-300 rounded-lg text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-sm font-medium">
                               + 添加联系人
                             </button>
                           </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;