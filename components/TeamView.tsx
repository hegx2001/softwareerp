import React from 'react';
import { Member } from '../types';
import { Mail, Shield, Code2 } from 'lucide-react';

interface TeamViewProps {
  members: Member[];
}

const TeamView: React.FC<TeamViewProps> = ({ members }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">核心团队成员</h2>
        <span className="text-sm text-slate-500">共 {members.length} 人</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map(member => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="relative mb-4">
              <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-50" />
              <div className="absolute bottom-0 right-0 p-1.5 bg-green-500 rounded-full border-2 border-white" title="Online"></div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-1">{member.name}</h3>
            <p className="text-indigo-600 text-sm font-medium mb-4 flex items-center gap-1">
              <Shield className="w-3 h-3" /> {member.role}
            </p>
            
            <div className="w-full flex justify-center gap-2 mb-6">
              <a href={`mailto:${member.email}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                <Code2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="w-full pt-4 border-t border-slate-50">
              <div className="flex flex-wrap gap-2 justify-center">
                {member.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] rounded-md font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {/* Add Member Card */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-300 hover:bg-slate-50 transition-colors group">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
            <span className="text-3xl text-slate-400 group-hover:text-indigo-500 font-light">+</span>
          </div>
          <h3 className="text-lg font-medium text-slate-600 group-hover:text-indigo-700">添加成员</h3>
          <p className="text-sm text-slate-400 mt-1">邀请新同事加入</p>
        </div>
      </div>
    </div>
  );
};

export default TeamView;