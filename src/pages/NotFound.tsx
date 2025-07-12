
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Terminal, AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Matrix rain background effect */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="text-green-500 text-xs font-mono leading-3 break-all animate-pulse">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="float-left w-8">
              {Math.random().toString(36).substring(2, 15)}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center relative z-10">
        <div className="bg-gray-900/80 border-2 border-red-500/50 rounded-lg p-8 max-w-md mx-auto backdrop-blur-sm">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-400 mr-3 animate-pulse" />
            <Terminal className="h-12 w-12 text-green-400" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-red-400 font-mono">{">"} ERROR_404</h1>
          
          <div className="bg-black/50 border border-green-500/30 rounded p-4 mb-4">
            <p className="text-green-300 font-mono text-sm">
              {">"} SYSTEM_MESSAGE: PAGE_NOT_FOUND
            </p>
            <p className="text-green-500/60 font-mono text-xs mt-1">
              {">"} PATH: {location.pathname}
            </p>
            <p className="text-red-400/60 font-mono text-xs mt-1">
              {">"} STATUS: ACCESS_DENIED
            </p>
          </div>
          
          <p className="text-green-300/80 font-mono text-sm mb-6">
            {"// "} The requested resource does not exist in our database
          </p>
          
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-green-500/50 text-green-400 hover:bg-green-900/30 hover:border-green-400 font-mono text-sm transition-all duration-300 hover:scale-105"
          >
            <Home className="h-4 w-4 mr-2" />
            {">"} RETURN_TO_HOME.exe
          </a>
          
          <div className="mt-6 text-green-500/60 font-mono text-xs">
            <p>{">"} SUGGESTION: CHECK_URL_SYNTAX</p>
            <p>{">"} ALTERNATIVE: USE_NAVIGATION_MENU</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
