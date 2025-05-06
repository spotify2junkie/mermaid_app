// import { FlowChart, Clock, Network } from 'lucide-react'; // Example icons

// const DiagramControls = ({ onGenerateDiagram, isLoading }) => {
//   return (
//     <div className="flex flex-col gap-4">
//       <button
//         onClick={() => onGenerateDiagram('structure')}
//         disabled={isLoading}
//         className="flex items-center justify-between p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//       >
//         <div className="flex items-center gap-2">
//           <FlowChart className="h-5 w-5" />
//           <span className="font-medium">Structure</span>
//         </div>
//         <span className="text-xs">build diagram</span>
//       </button>

//       <button
//         onClick={() => onGenerateDiagram('timeStructure')}
//         disabled={isLoading}
//         className="flex items-center justify-between p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//       >
//         <div className="flex items-center gap-2">
//           <Clock className="h-5 w-5" />
//           <span className="font-medium">Time-Structure</span>
//         </div>
//         <span className="text-xs">build diagram</span>
//       </button>

//       <button
//         onClick={() => onGenerateDiagram('conceptMap')}
//         disabled={isLoading}
//         className="flex items-center justify-between p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//       >
//         <div className="flex items-center gap-2">
//           <Network className="h-5 w-5" />
//           <span className="font-medium">Concept Map</span>
//         </div>
//         <span className="text-xs">build diagram</span>
//       </button>
//     </div>
//   );
// };

// export default DiagramControls;