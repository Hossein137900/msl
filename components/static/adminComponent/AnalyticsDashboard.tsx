"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  BarController,
} from "chart.js";
import { Scatter, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BarController,
  Tooltip,
  Legend
);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface TrackerData {
  _id: string;
  sessionId: string;
  page: string;
  startTime: number;
  duration: number;
  clicks: { x: number; y: number; timestamp: number }[];
  activities: { activityType: string; timestamp: number }[];
}

const TrackerDashboard: React.FC = () => {
  const [trackerData, setTrackerData] = useState<TrackerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/tracker");
        const data = await res.json();
        setTrackerData(data.events);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tracker data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <div className="text-center text-yellow-400">Loading...</div>;

  // Process data for charts and table
  const allClicks = trackerData.flatMap((session) => session.clicks);

  // Simulate phone vs desktop split (add viewportWidth to schema for accurate filtering)
  const halfIndex = Math.floor(allClicks.length / 2);
  const phoneHeatmapData = allClicks.slice(0, halfIndex).map((click) => ({
    x: click.x,
    y: click.y,
    value: 1, // For intensity
  }));
  const desktopHeatmapData = allClicks.slice(halfIndex).map((click) => ({
    x: click.x,
    y: click.y,
    value: 1,
  }));

  // Calculate click density for heatmap (simplified)
  const phoneClickDensity = phoneHeatmapData.reduce((acc, click) => {
    const key = `${Math.round(click.x / 20)}-${Math.round(click.y / 20)}`; // Grid of 20px
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const desktopClickDensity = desktopHeatmapData.reduce((acc, click) => {
    const key = `${Math.round(click.x / 40)}-${Math.round(click.y / 40)}`; // Grid of 40px
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const phoneHeatmapPoints = Object.entries(phoneClickDensity).map(
    ([key, value]) => {
      const [x, y] = key.split("-").map(Number);
      return { x: x * 20, y: y * 20, value };
    }
  );
  const desktopHeatmapPoints = Object.entries(desktopClickDensity).map(
    ([key, value]) => {
      const [x, y] = key.split("-").map(Number);
      return { x: x * 40, y: y * 40, value };
    }
  );

  // Page visit counts
  const pageCounts = trackerData.reduce((acc, session) => {
    acc[session.page] = (acc[session.page] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Session stats for table
  const sessionStats = trackerData.map((session) => {
    const bounce = session.activities.length === 0 && session.duration < 30000;
    return {
      sessionId: session.sessionId,
      page: session.page,
      bounceRate: bounce ? 100 : 0,
      avgTimeSpent: session.duration / 1000,
    };
  });

  const pageStats = Object.entries(
    sessionStats.reduce((acc, stat) => {
      if (!acc[stat.page]) {
        acc[stat.page] = { bounces: 0, totalTime: 0, sessions: 0 };
      }
      acc[stat.page].bounces += stat.bounceRate === 100 ? 1 : 0;
      acc[stat.page].totalTime += stat.avgTimeSpent;
      acc[stat.page].sessions += 1;
      return acc;
    }, {} as Record<string, { bounces: number; totalTime: number; sessions: number }>)
  ).map(([page, { bounces, totalTime, sessions }]) => ({
    page,
    bounceRate: ((bounces / sessions) * 100).toFixed(2),
    avgTimeSpent: (totalTime / sessions).toFixed(2),
  }));

  // Enhanced Heatmap Options
  const heatmapOptions = {
    scales: {
      x: {
        min: 0,
        max: 390,
        grid: { display: true, color: "rgba(255,255,255,0.1)" },
        title: { display: true, text: "X" },
      },
      y: {
        min: 0,
        max: 844,
        grid: { display: true, color: "rgba(255,255,255,0.1)" },
        title: { display: true, text: "Y" },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `Clicks: ${context.raw.value}`,
        },
      },
      legend: { display: false },
    },
    elements: {
      point: {
        radius: (context: any) => Math.min(20, context.raw.value * 5), // Size based on intensity
        backgroundColor: (context: any) => {
          const value = context.raw.value;
          return value > 5
            ? "rgba(255, 99, 132, 0.8)"
            : value > 2
            ? "rgba(255, 159, 64, 0.6)"
            : "rgba(54, 162, 235, 0.4)";
        },
      },
    },
  };

  const desktopHeatmapOptions = {
    scales: {
      x: {
        min: 0,
        max: 1920,
        grid: { display: true, color: "rgba(255,255,255,0.1)" },
        title: { display: true, text: "X" },
      },
      y: {
        min: 0,
        max: 1080,
        grid: { display: true, color: "rgba(255,255,255,0.1)" },
        title: { display: true, text: "Y" },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `Clicks: ${context.raw.value}`,
        },
      },
      legend: { display: false },
    },
    elements: {
      point: {
        radius: (context: any) => Math.min(30, context.raw.value * 5),
        backgroundColor: (context: any) => {
          const value = context.raw.value;
          return value > 5
            ? "rgba(255, 99, 132, 0.8)"
            : value > 2
            ? "rgba(255, 159, 64, 0.6)"
            : "rgba(54, 162, 235, 0.4)";
        },
      },
    },
  };

  // Enhanced Bar Chart Data
  const barData = {
    labels: Object.keys(pageCounts),
    datasets: [
      {
        label: "کاربران در هر صفحه",
        data: Object.values(pageCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(255,255,255,0.1)" },
        title: { display: true, text: "تعداد کاربران", color: "#fff" },
        ticks: { color: "#fff" },
      },
      x: {
        grid: { display: false },
        title: { display: true, text: "صفحه", color: "#fff" },
        ticks: { color: "#fff" },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
      legend: { labels: { color: "#fff" } },
      datalabels: {
        anchor: "end",
        align: "top",
        color: "#fff",
        font: { weight: "bold" },
        formatter: (value: number) => value,
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto mt-32 text-white"
    >
      <motion.h1
        variants={fadeIn}
        className="text-3xl font-bold text-[#a37462] text-center mb-8"
      >
        داشبورد تحلیلی
      </motion.h1>

      <div className="grid grid-cols-1 gap-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Phone View */}
          <motion.div
            variants={fadeIn}
            className=" rounded-2xl p-6  flex flex-col items-center justify-center"
          >
            <h2 className="text-xl font-semibold text-[#a37462] mb-4">
              نقشه حرارتی موبایل
            </h2>
            <div className="relative w-[450px] h-screen mx-auto bg-black  rounded-[35px] p-4">
              <iframe
                src="/"
                className="w-full h-full"
                style={{ pointerEvents: "none" }}
              />
              <div className="absolute top-0 left-0 w-full h-full">
                {phoneHeatmapPoints.map((point, index) => (
                  <div
                    key={index}
                    className="absolute w-4 h-4 rounded-full animate-pulse"
                    style={{
                      left: `${point.x}px`,
                      top: `${point.y}px`,
                      backgroundColor: `rgba(255, 99, 132, ${Math.min(
                        0.8,
                        point.value * 0.2
                      )})`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Desktop View */}
          <motion.div
            variants={fadeIn}
            className="bg-gray-800 rounded-2xl p-6 shadow-xl"
          >
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">
              نقشه حرارتی دسکتاپ
            </h2>
            <div className="relative w-full h-[600px] mx-auto bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src="/"
                className="w-full h-full"
                style={{ pointerEvents: "none" }}
              />
              <div className="absolute top-0 left-0 w-full h-full">
                {desktopHeatmapPoints.map((point, index) => (
                  <div
                    key={index}
                    className="absolute w-5 h-5 rounded-full animate-pulse"
                    style={{
                      left: `${(point.x / 1920) * 100}%`,
                      top: `${(point.y / 1080) * 100}%`,
                      backgroundColor: `rgba(255, 99, 132, ${Math.min(
                        0.8,
                        point.value * 0.2
                      )})`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bar Chart */}
      <motion.div
        variants={fadeIn}
        className="bg-gray-800 rounded-2xl p-6 shadow-xl mt-8"
      >
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">
          کاربران در هر صفحه
        </h2>
        <div className="w-full h-[400px]">
          <Bar data={barData} />
        </div>
      </motion.div>

      {/* Stats Table */}
      <motion.div
        variants={fadeIn}
        className="bg-gray-800 rounded-2xl p-6 shadow-xl mt-8"
      >
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">
          آمار جلسات به تفکیک صفحه
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700 text-yellow-400">
              <tr>
                <th className="p-4 rounded-tl-lg">صفحه</th>
                <th className="p-4">نرخ پرش (%)</th>
                <th className="p-4 rounded-tr-lg">میانگین زمان (ثانیه)</th>
              </tr>
            </thead>
            <tbody>
              {pageStats.map((stat, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="p-4">{stat.page}</td>
                  <td className="p-4">{stat.bounceRate}%</td>
                  <td className="p-4">{stat.avgTimeSpent}s</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Import ChartDataLabels plugin dynamically

export default TrackerDashboard;
