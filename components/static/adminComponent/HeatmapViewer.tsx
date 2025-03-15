// 'use client';

// import { useState, useEffect } from 'react';
// import heatmap from 'heatmap.js';

// const HeatmapViewer = () => {
//   const [clickData, setClickData] = useState([]);
//   const [selectedPath, setSelectedPath] = useState('/');
//   const [availablePaths, setAvailablePaths] = useState([]);
//   const [heatmapInstance, setHeatmapInstance] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetch('/api/analytics/heatmap')
//       .then(res => res.json())
//       .then(data => {
//         setClickData(data);
//         const paths = [...new Set(data.map(point => point.path))];
//         setAvailablePaths(paths);
//       });
//   }, []);

//   const initHeatmap = () => {
//     const container = document.querySelector('.heatmap-container');
//     if (!container) return;

//     const instance = heatmap.create({
//       container: container as HTMLElement,
//       radius: 40,
//       maxOpacity: 0.6,
//       minOpacity: 0.3,
//       blur: 0.75,
//       gradient: {
//         '.5': 'blue',
//         '.8': 'red',
//         '.95': 'white'
//       }
//     });

//     setHeatmapInstance(instance);
//     updateHeatmapData(instance);
//   };

//   const updateHeatmapData = (instance = heatmapInstance) => {
//     if (!instance) return;
//     const filteredData = clickData.filter(point => point.path === selectedPath);
//     instance.setData({
//       max: Math.max(...filteredData.map(point => point.value)),
//       min: 0,
//       data: filteredData
//     });
//   };

//   const showHeatmap = () => {
//     setShowModal(true);
//     setTimeout(initHeatmap, 100);
//   };

//   return (
//     <div className="p-6">
//       <div className="flex gap-4 mb-6">
//         <select 
//           value={selectedPath}
//           onChange={(e) => {
//             setSelectedPath(e.target.value);
//             if (heatmapInstance) updateHeatmapData();
//           }}
//           className="p-2 border rounded"
//         >
//           {availablePaths.map(path => (
//             <option key={path} value={path}>{path}</option>
//           ))}
//         </select>
//         <button 
//           onClick={showHeatmap}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           نمایش نقشه حرارتی
//         </button>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg w-[90vw] h-[90vh] overflow-auto">
//             <button 
//               onClick={() => setShowModal(false)}
//               className="sticky top-2 right-2 z-50 p-2 bg-red-500 text-white rounded float-right"
//             >
//               ✕
//             </button>
            
//             <div className="relative">
//               <iframe 
//                 src={`${window.location.origin}${selectedPath}`}
//                 className="w-full"
//                 style={{ height: '200vh' }}
//               />
//               <div 
//                 className="heatmap-container absolute top-0 left-0 w-full h-full"
//                 style={{ 
//                   pointerEvents: 'none',
//                   mixBlendMode: 'multiply',
//                   zIndex: 10
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeatmapViewer;
