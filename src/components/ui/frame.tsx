
import React from 'react';
import { cn } from "@/lib/utils";

interface FrameProps {
  className?: string;
  paths: Array<{
    show: boolean;
    style: {
      strokeWidth: string;
      stroke: string;
      fill: string;
    };
    path: Array<[string, ...string[]]>;
  }>;
}

export const Frame = ({ className, paths }: FrameProps) => {
  const createPathString = (pathCommands: Array<[string, ...string[]]>) => {
    return pathCommands.map(command => command.join(' ')).join(' ');
  };

  return (
    <svg 
      className={cn("absolute inset-0 w-full h-full", className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {paths.filter(pathData => pathData.show).map((pathData, index) => (
        <path
          key={index}
          d={createPathString(pathData.path)}
          stroke={pathData.style.stroke}
          fill={pathData.style.fill}
          strokeWidth={pathData.style.strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
};
