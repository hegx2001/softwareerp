import React, { useState } from 'react';
import { Role, Member, PermissionType } from '../types';
import { Shield, Users, Lock, MoreHorizontal, Plus, Check, X, Search, UserCog, Key } from 'lucide-react';

interface SettingsViewProps {
  members: Member[];
  roles: Role[];
}

const PERMISSION_GROUPS = [
  { name: '核心功能', permissions: ['view_dashboard', 'manage_settings'] as PermissionType[] },
  { name: '项目管理', permissions: ['manage_projects', 'manage_tasks'] as PermissionType[] },
  { name: '商务与客户', permissions: ['manage_clients', 'manage_contracts'] as PermissionType[] },
  { name: '财务管理', permissions: ['view_finance', 'manage_finance'] as PermissionType[] },
  { name: '团队管理', permissions: ['manage_team'] as PermissionType[] },
];

const PERMISSION_LABELS: Record<PermissionType, string> = {
  view_dashboard: '查看仪表盘',
  manage_settings: '系统设置',
  manage_projects: '项目管理 (增删改)',
  manage_tasks: '任务分配与执行',
  manage_clients: '客户 CRM 管理',
  manage_contracts: '合同与回款管理',
  view_finance: '查看财务报表',
  manage_finance: '录入财务账目',
  manage_team: '团队成员管理',
};

const SettingsView: React.FC<SettingsViewProps> = ({ members: initialMembers, roles: initialRoles }) => {
  const [activeTab, setActiveTab] = useState<'employees' | 'roles'>('employees');
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(initialRoles[0]?.id || null);

  // --- Role Logic ---
  const handleTogglePermission = (roleId: string, permission: PermissionType) => {
    setRoles(prevRoles => prevRoles.map(role => {
      if (role.id !== roleId) return role;
      const hasPermission = role.permissions.includes(permission);
      return {
        ...role,
        permissions: hasPermission 
          ? role.permissions.filter(p => p !== permission)
          : [...role.permissions, permission]
      };
    }));
  };

  const selectedRole = roles.find(r => r.id === selectedRoleId);

  // --- Employee Logic ---
  const handleRoleChange = (memberId: string, newRoleId: string) => {
    setMembers(prevMembers => prevMembers.map(m => {
      if (m.id !== memberId) return m;
      const newRole = roles.find(r => r.id === newRoleId);
      return { ...m, roleId: newRoleId, role: newRole?.name || 'Unknown' }; // Update display role too
    }));
  };

  const handleStatusChange = (memberId: string) => {
    setMembers(prevMembers => prevMembers.map(m => 
      m.id === memberId ? { ...m, status: m.status === 'Active' ? 'Inactive' : 'Active' } : m
    ));
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">系统设置与权限</h2>
        <div className="flex bg-white p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab('employees')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'employees' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <UserCog className="w-4 h-4" /> 员工管理
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'roles' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-4 h-4" /> 角色与权限
          </button>
        </div>
      </div>

      {activeTab === 'employees' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="搜索员工姓名或邮箱..." 
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" /> 添加员工
            </button>
          </div>
          
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">员工信息</th>
                <th className="px-6 py-4">当前角色</th>
                <th className="px-6 py-4">入职日期</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map(member => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-full bg-slate-200" />
                      <div>
                        <div className="font-medium text-slate-800">{member.name}</div>
                        <div className="text-xs text-slate-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={member.roleId} 
                      onChange={(e) => handleRoleChange(member.id, e.target.value)}
                      className="text-sm border-slate-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-1 pl-2 pr-8 bg-white border"
                    >
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {member.joinDate}
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleStatusChange(member.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 w-fit transition-colors ${
                      member.status === 'Active' 
                        ? 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100' 
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}>
                      {member.status === 'Active' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      {member.status === 'Active' ? '已激活' : '已停用'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-indigo-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Roles List Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-700">角色列表</h3>
              <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`w-full text-left p-3 rounded-lg text-sm flex items-center justify-between transition-all ${
                    selectedRoleId === role.id 
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Shield className={`w-4 h-4 ${selectedRoleId === role.id ? 'fill-indigo-200' : 'text-slate-400'}`} />
                    <span className="font-medium">{role.name}</span>
                  </div>
                  {role.isSystem && (
                    <span title="系统内置">
                      <Lock className="w-3 h-3 text-slate-400" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Permission Matrix */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
            {selectedRole ? (
              <>
                <div className="p-6 border-b border-slate-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        {selectedRole.name}
                        {selectedRole.isSystem && (
                          <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200 font-normal">系统内置</span>
                        )}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">{selectedRole.description}</p>
                    </div>
                    {!selectedRole.isSystem && (
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                        删除角色
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    {PERMISSION_GROUPS.map((group) => (
                      <div key={group.name} className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3 flex items-center gap-2">
                          <Key className="w-3 h-3 text-indigo-500" />
                          {group.name}
                        </h4>
                        <div className="space-y-2">
                          {group.permissions.map((perm) => {
                             const isChecked = selectedRole.permissions.includes(perm);
                             return (
                               <label key={perm} className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors ${isChecked ? 'bg-indigo-50/50' : 'hover:bg-slate-50'}`}>
                                 <div className="relative flex items-center mt-0.5">
                                   <input
                                     type="checkbox"
                                     checked={isChecked}
                                     onChange={() => handleTogglePermission(selectedRole.id, perm)}
                                     disabled={selectedRole.isSystem && perm === 'manage_settings'} // Prevent locking yourself out
                                     className="peer h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                                   />
                                 </div>
                                 <div className="text-sm">
                                   <span className={`font-medium ${isChecked ? 'text-indigo-900' : 'text-slate-700'}`}>
                                     {PERMISSION_LABELS[perm]}
                                   </span>
                                   <p className="text-xs text-slate-400 mt-0.5">允许用户 {PERMISSION_LABELS[perm]}</p>
                                 </div>
                               </label>
                             );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl flex justify-end gap-3">
                   <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">重置更改</button>
                   <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">保存配置</button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <Shield className="w-12 h-12 mb-4 text-slate-200" />
                <p>请选择左侧角色以配置权限</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;