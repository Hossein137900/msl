'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({
    topPages: [],
    scrollDepth: [],
    timeSpent: [],
    recentActivityCount: 0
  });
  const displayCount = analyticsData?.recentActivityCount || 0;
  const [timeData, setTimeData] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTimeData = async () => {
      const response = await fetch('/api/analytics/time');
      const data = await response.json();
      setTimeData(data.timeData);
    };
    
    fetchTimeData();
    // Refresh every minute
    const interval = setInterval(fetchTimeData, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  useEffect(() => {
    fetchAnalytics();
  }, []);
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60000);
    const remainingSeconds = Math.round((seconds % 60000) / 1000);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics/dashboard');
      const data = await response.json();
      setAnalyticsData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };
  const averageTimeSpent = analyticsData.timeSpent?.length 
  ? analyticsData.timeSpent.reduce((acc, curr) => acc + curr.avgDuration, 0) / analyticsData.timeSpent.length 
  : 0;

 
  const formatPagePath = (path) => {
    if (path === '/') return 'Home';
    return path.replace('/', '').charAt(0).toUpperCase() + path.slice(2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">داشبورد تحلیلی</h2>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">فعالیت‌های اخیر</h3>
          <p className="text-3xl font-bold text-blue-600">
            {analyticsData.recentActivityCount}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h3 className="text-lg font-semibold mb-4">صفحات پربازدید</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.topPages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" tickFormatter={formatPagePath} />
              <YAxis />
              <Tooltip 
                formatter={(value) => [value, 'تعداد بازدید']}
                labelFormatter={formatPagePath}
              />
              <Bar 
                dataKey="count" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h3 className="text-lg font-semibold mb-4">میانگین اسکرول صفحات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.scrollDepth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" tickFormatter={formatPagePath} />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${Math.round(value)}%`, 'عمق اسکرول']}
                labelFormatter={formatPagePath}
              />
              <Bar 
                dataKey="avgDepth" 
                fill="#10B981" 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">زمان حضور در صفحات</h3>
        {timeData.map(page => (
          <div key={page.path} className="bg-white p-4 rounded-lg shadow mb-2">
            <div className="flex justify-between items-center">
              <span>{page.path}</span>
              <span className="font-bold">{formatDuration(page.averageTime)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AnalyticsDashboard;
