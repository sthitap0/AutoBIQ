import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  title: string;
}

export function Container({ children, title }: ContainerProps) {
  return (
    <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      {children}
    </div>
  );
}