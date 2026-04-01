import React, { useState } from "react";
import { Feature } from "@/lib/api";

interface FeatureTab {
  id: Feature;
  label: string;
  icon: string;
}

const TABS: FeatureTab[] = [
  { id: "explain", label: "Explain", icon: "📖" },
  { id: "debug", label: "Debug", icon: "🐛" },
  { id: "complexity", label: "Complexity", icon: "📊" },
  { id: "convert", label: "Convert", icon: "🔄" },
  { id: "chat", label: "Chat", icon: "💬" },
  { id: "practice", label: "Practice", icon: "🏋️" },
];

interface FeatureTabsProps {
  activeFeature: Feature;
  onFeatureChange: (feature: Feature) => void;
}

const FeatureTabs: React.FC<FeatureTabsProps> = ({ activeFeature, onFeatureChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onFeatureChange(tab.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeFeature === tab.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <span className="mr-1.5">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FeatureTabs;
