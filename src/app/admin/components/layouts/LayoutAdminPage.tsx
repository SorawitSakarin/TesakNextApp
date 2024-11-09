import React from 'react';
import "./index.css"
interface LayoutAdminPageProps {
  children: JSX.Element;
}

const LayoutAdminPage: React.FC<LayoutAdminPageProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-screen min-h-screen items-center">{children}</div>
  );
};

export default LayoutAdminPage;
