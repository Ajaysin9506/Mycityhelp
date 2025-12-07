import React, { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar';
import { AIAssistant } from './components/AIAssistant';
import { ViewState, LostItem } from './types';
import { SERVICES, SKILLS, LOST_ITEMS, COMPLAINTS, SHOPS } from './constants';
import { ServiceCard } from './components/ServiceCard';
import { ArrowRight, Search, MapPin, Tag, ThumbsUp, Truck, AlertTriangle, Wand2 } from 'lucide-react';
import { analyzeLostItemDescription, summarizeComplaints } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [lostDesc, setLostDesc] = useState('');
  const [analyzedData, setAnalyzedData] = useState<{category?: string, summary?: string} | null>(null);
  const [analyzingItem, setAnalyzingItem] = useState(false);
  const [complaintSummary, setComplaintSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Helper function to render different sections
  const renderHome = () => (
    <div className="animate-fade-in">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Your City, <span className="text-blue-600">One Platform.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Connect with local services, exchange skills, report issues, and find lost items. All powered by community and AI.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setCurrentView('SERVICES')} className="px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm">
              Find Services
            </button>
            <button onClick={() => setCurrentView('COMPLAINTS')} className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm">
              Report Issue
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Lost & Found', icon: <MapPin className="text-red-500" />, view: 'LOSTFOUND' },
              { label: 'Skill Exchange', icon: <Tag className="text-green-500" />, view: 'SKILLS' },
              { label: 'Shop Delivery', icon: <Truck className="text-blue-500" />, view: 'DELIVERY' },
              { label: 'Civic Issues', icon: <AlertTriangle className="text-orange-500" />, view: 'COMPLAINTS' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setCurrentView(item.view as ViewState)}
                className="p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-200 cursor-pointer transition-all group bg-white"
              >
                <div className="mb-4 p-3 bg-gray-50 w-fit rounded-lg group-hover:bg-blue-50 transition-colors">
                   {item.icon}
                </div>
                <h3 className="font-semibold text-lg text-slate-800">{item.label}</h3>
                <div className="mt-2 flex items-center text-sm text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderServices = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Local Services</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="Search services..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map(service => <ServiceCard key={service.id} service={service} />)}
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Skill Exchange</h2>
          <p className="text-slate-500 mt-1">Barter skills with your neighbors.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
          Post a Request
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg bg-white divide-y divide-gray-200">
        {SKILLS.map(skill => (
          <div key={skill.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${skill.type === 'OFFER' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
                  {skill.type}
                </span>
                <h3 className="font-semibold text-slate-900">{skill.skill}</h3>
              </div>
              <p className="text-sm text-slate-600 mb-2">{skill.description}</p>
              <div className="flex gap-2">
                {skill.tags.map(tag => (
                  <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
               <span>by {skill.user}</span>
               <button className="px-3 py-1 border border-gray-300 rounded text-slate-700 hover:bg-white hover:border-gray-400">Connect</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const handleAnalyzeItem = async () => {
    if(!lostDesc) return;
    setAnalyzingItem(true);
    const resultJson = await analyzeLostItemDescription(lostDesc);
    try {
      setAnalyzedData(JSON.parse(resultJson));
    } catch(e) {
      setAnalyzedData({ summary: "Could not analyze", category: "Unknown" });
    }
    setAnalyzingItem(false);
  }

  const renderLostFound = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Lost & Found</h2>
      
      {/* AI Analysis Section */}
      <div className="bg-slate-900 text-white rounded-xl p-6 mb-10 shadow-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-purple-400" />
          AI Item Reporter
        </h3>
        <p className="text-slate-400 text-sm mb-4">Describe what you lost or found, and our AI will categorize it for you.</p>
        <div className="flex flex-col md:flex-row gap-4">
          <textarea 
            value={lostDesc}
            onChange={(e) => setLostDesc(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
            placeholder="e.g. I found a black leather wallet with some keys near the park bench..."
            rows={2}
          />
          <div className="flex flex-col gap-2 min-w-[150px]">
            <button 
              onClick={handleAnalyzeItem}
              disabled={analyzingItem}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
            >
              {analyzingItem ? 'Analyzing...' : 'Analyze & Draft'}
            </button>
            {analyzedData && (
              <div className="text-xs bg-slate-800 p-2 rounded border border-slate-700">
                <p><span className="text-gray-400">Category:</span> {analyzedData.category}</p>
                <p><span className="text-gray-400">Tags:</span> {analyzedData.summary}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {LOST_ITEMS.map(item => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
            <div className="h-48 bg-gray-200 relative">
              <img src={item.imagePlaceholder} alt={item.title} className="w-full h-full object-cover" />
              <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded shadow-sm ${item.type === 'LOST' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {item.type}
              </div>
            </div>
            <div className="p-4">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.category}</span>
              <h3 className="font-bold text-slate-900 mt-1">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
              <div className="mt-4 flex items-center text-xs text-gray-400">
                <MapPin className="w-3 h-3 mr-1" /> {item.location} • {item.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const handleSummarizeComplaints = async () => {
    setLoadingSummary(true);
    const text = COMPLAINTS.map(c => `- ${c.title}: ${c.description} (Status: ${c.status})`).join('\n');
    const summary = await summarizeComplaints(text);
    setComplaintSummary(summary);
    setLoadingSummary(false);
  }

  const renderComplaints = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
       <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900">Civic Issues</h2>
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium">
          Report Issue
        </button>
      </div>

      {/* AI Summary Box */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
           <h3 className="text-orange-900 font-bold flex items-center gap-2">
             <Wand2 className="w-5 h-5" /> Mayor's Summary
           </h3>
           <button onClick={handleSummarizeComplaints} disabled={loadingSummary} className="text-xs text-orange-700 underline hover:text-orange-900">
             {loadingSummary ? 'Generating...' : 'Refresh AI Summary'}
           </button>
        </div>
        <p className="text-orange-800 text-sm italic">
          {complaintSummary || "Click refresh to generate an AI summary of all active complaints for city officials."}
        </p>
      </div>

      <div className="space-y-4">
        {COMPLAINTS.map(complaint => (
          <div key={complaint.id} className="bg-white border border-gray-200 rounded-lg p-5 flex gap-4">
            <div className="flex flex-col items-center gap-1 min-w-[50px]">
              <button className="text-gray-400 hover:text-blue-600"><ThumbsUp className="w-5 h-5" /></button>
              <span className="font-bold text-sm text-gray-700">{complaint.upvotes}</span>
            </div>
            <div className="flex-1">
               <div className="flex items-center gap-2 mb-1">
                 <h3 className="font-bold text-slate-900">{complaint.title}</h3>
                 <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                   complaint.status === 'Resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                   complaint.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                   'bg-yellow-50 text-yellow-700 border-yellow-200'
                 }`}>
                   {complaint.status}
                 </span>
               </div>
               <p className="text-sm text-gray-600">{complaint.description}</p>
               <span className="text-xs text-gray-400 mt-2 block">Category: {complaint.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDelivery = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
       <h2 className="text-3xl font-bold text-slate-900 mb-8">Local Shops Delivery</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {SHOPS.map(shop => (
           <div key={shop.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-400 transition-colors group">
             <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
               {shop.category === 'Grocery' ? '🥦' : shop.category === 'Pharmacy' ? '💊' : shop.category === 'Stationery' ? '✏️' : '🥛'}
             </div>
             <h3 className="font-bold text-lg text-slate-900">{shop.name}</h3>
             <p className="text-xs text-gray-500 mb-3">{shop.location} • ⭐ {shop.rating}</p>
             <div className="text-sm text-gray-700 mb-4 bg-gray-50 p-2 rounded">
               Delivery in <span className="font-semibold">{shop.deliveryTime}</span>
             </div>
             <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors">
               Order via WhatsApp
             </button>
           </div>
         ))}
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6f8fa] text-[#1f2328] font-sans">
      <NavBar currentView={currentView} setView={setCurrentView} />
      
      <main className="pb-20">
        {currentView === 'HOME' && renderHome()}
        {currentView === 'SERVICES' && renderServices()}
        {currentView === 'SKILLS' && renderSkills()}
        {currentView === 'LOSTFOUND' && renderLostFound()}
        {currentView === 'COMPLAINTS' && renderComplaints()}
        {currentView === 'DELIVERY' && renderDelivery()}
      </main>

      <footer className="bg-white border-t border-gray-200 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; 2023 MyCityHelp. Built with React & Gemini.</p>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;