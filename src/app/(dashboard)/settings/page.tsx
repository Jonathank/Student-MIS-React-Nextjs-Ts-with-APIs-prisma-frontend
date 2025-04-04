"use client"
import { useState } from "react";

type SettingsProps = {
  limit: number;
  onLimitChange: (newLimit: number) => void;
};

const Settings: React.FC<SettingsProps> = ({ limit, onLimitChange }) => {
  const [selectedLimit, setSelectedLimit] = useState(limit);

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setSelectedLimit(newLimit);
    onLimitChange(newLimit);
  };

  return (
    <div className="flex items-center gap-2 p-4">
      <label htmlFor="limit" className="text-sm font-medium text-gray-700">
        Items per page:
      </label>
      <select
        id="limit"
        value={selectedLimit}
        onChange={handleLimitChange}
        className="p-1 border rounded-md bg-white text-gray-700"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default Settings;
