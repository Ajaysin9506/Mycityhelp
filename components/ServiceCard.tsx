import React from 'react';
import { Service } from '../types';
import { Snowflake, Zap, Droplet, Sparkles, Smartphone, Hammer } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  snowflake: <Snowflake className="w-6 h-6 text-blue-500" />,
  zap: <Zap className="w-6 h-6 text-yellow-500" />,
  droplet: <Droplet className="w-6 h-6 text-cyan-500" />,
  sparkles: <Sparkles className="w-6 h-6 text-purple-500" />,
  smartphone: <Smartphone className="w-6 h-6 text-gray-700" />,
  hammer: <Hammer className="w-6 h-6 text-orange-600" />,
};

interface Props {
  service: Service;
}

export const ServiceCard: React.FC<Props> = ({ service }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-blue-400 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-gray-50 rounded-md group-hover:bg-blue-50 transition-colors">
          {iconMap[service.icon] || <Zap />}
        </div>
        <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
          Starts at {service.priceStart}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
      <p className="text-sm text-gray-500 mb-4 h-10 line-clamp-2">{service.description}</p>
      <button className="w-full py-2 px-4 bg-slate-50 text-slate-700 font-medium text-sm rounded-md border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors">
        Request Service
      </button>
    </div>
  );
};