import React from 'react';
import { Project, ProjectStatus, Priority, Member } from '../types';
import { Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface ProjectBoardProps {
  projects: Project[];
  members: Member[];
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({ projects, members }) => {
  const columns = [
    { status: ProjectStatus.PLANNING, color: 'bg-slate-100 border-slate-200' },
    { status: ProjectStatus.IN_PROGRESS, color: 'bg-blue-50 border-blue-100' },
    { status: ProjectStatus.TESTING, color: 'bg-purple-50 border-purple-100' },
    { status: ProjectStatus.COMPLETED, color: 'bg-green-50 border-green-100' },
  ];

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case Priority.CRITICAL: return 'text-red-600 bg-red-100';
      case Priority.HIGH: return 'text-orange-600 bg-orange-100';
      case Priority.MEDIUM: return 'text-blue-600 bg-blue-100';
      case Priority.LOW: return 'text-slate-600 bg-slate-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getMemberAvatars = (memberIds: string[]) => {
    return members.filter(m => memberIds.includes(m.id));
  };

  return (
    <div className="h-[calc(100vh-140px)] overflow-x-auto pb-4">
      <div className="flex gap-6 h-full min-w-[1000px]">
        {columns.map((col) => {
          const columnProjects = projects.filter(p => p.status === col.status);
          
          return (
            <div key={col.status} className={`flex-1 min-w-[280px] rounded-xl flex flex-col ${col.color} border p-4`}>
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="font-semibold text-slate-700">{col.status}</h3>
                <span className="bg-white/50 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {columnProjects.length}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                {columnProjects.map(project => (
                  <div key={project.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-slate-800 mb-1 line-clamp-2">{project.name}</h4>
                    <p className="text-xs text-slate-500 mb-3">{project.client}</p>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>进度</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-50">
                      <div className="flex -space-x-2">
                        {getMemberAvatars(project.members).map(m => (
                          <img 
                            key={m.id}
                            src={m.avatar} 
                            alt={m.name} 
                            title={m.name}
                            className="w-6 h-6 rounded-full border-2 border-white"
                          />
                        ))}
                      </div>
                      <div className="flex items-center text-xs text-slate-400 gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{project.dueDate.split('-').slice(1).join('/')}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {columnProjects.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
                    无项目
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectBoard;