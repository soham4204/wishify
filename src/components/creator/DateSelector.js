// src/components/creator/DateSelector.js
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS
import { useCreatorStore } from '../../hooks/useCreatorStore';

const DateSelector = () => {
  const birthdayDate = useCreatorStore((state) => state.birthdayDate);
  const setBirthdayDate = useCreatorStore((state) => state.setBirthdayDate);

  return (
    <div className="w-full">
      <label className="block text-xl font-medium text-gray-800 mb-3">
        Set Birthday Time (Optional)
      </label>
      <p className="text-sm text-gray-500 mb-2">
        If you set a time, the page will show a countdown until that exact moment.
        If you leave it blank, it will be visible immediately.
      </p>
      
      {/* FR-12.1: Date and Time Input */}
      <DatePicker
        selected={birthdayDate}
        onChange={(date) => setBirthdayDate(date)}
        showTimeSelect
        timeFormat="h:mm aa"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholderText="Click to select a date and time"
        isClearable
      />
    </div>
  );
};

export default DateSelector;