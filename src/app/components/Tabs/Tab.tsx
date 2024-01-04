import React, { useState } from "react";

const Tab = ({
  label,
  isActive,
  onClick,
  labelClasses,
  length,
}: {
  label: any;
  isActive: any;
  onClick: any;
  labelClasses?: string;
  length: any;
}) => {
  return (
    <li className={`me-2 ${isActive ? "active" : ""}`}>
      <a
        href="#"
        onClick={onClick}
        className={`inline-block p-4 rounded-t-lg  ${label} ${
          isActive
            ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500"
            : `hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${labelClasses}`
        }`}
      >
        {label}
        <small
          className={`text-black font-bold ${
            isActive && "!text-black"
          }  ${labelClasses}`}
        >
          {" "}
          {`(${length})`}
        </small>
      </a>
    </li>
  );
};

const TabList = ({
  tabs,
  activeTab,
  onTabClick,
  labelClasses,
}: {
  tabs: any;
  activeTab: any;
  onTabClick: any;
  labelClasses?: string;
}) => {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-black border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {tabs.map((tab: any, index: any) => (
        <Tab
          key={index}
          label={tab.label}
          isActive={activeTab === index}
          onClick={() => onTabClick(index)}
          labelClasses={labelClasses}
          length={tab.length}
        />
      ))}
    </ul>
  );
};

const TabPanel = ({
  children,
  tabClasses,
}: {
  children: React.ReactNode;
  tabClasses?: string;
}) => (
  <div className={`p-4 h-fit overflow-x-auto ${tabClasses}`}>{children}</div>
);

export const Tabs = ({
  tabs,
  labelClasses,
  tabClasses,
}: {
  tabs: { length: number; label: string; content: React.ReactNode }[];
  labelClasses?: string;
  tabClasses?: string;
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <TabList
        labelClasses={labelClasses}
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />
      <TabPanel tabClasses={tabClasses}>{tabs[activeTab].content}</TabPanel>
    </div>
  );
};
