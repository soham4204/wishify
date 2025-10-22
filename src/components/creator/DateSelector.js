// src/components/creator/DateSelector.js
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCreatorStore } from '../../hooks/useCreatorStore';

const DateSelector = () => {
  const birthdayDate = useCreatorStore((state) => state.birthdayDate);
  const setBirthdayDate = useCreatorStore((state) => state.setBirthdayDate);

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-6">
        <label className="block text-2xl font-bold text-gray-900 mb-2 items-center gap-2">
          <span className="text-3xl">🎂</span>
          Set Birthday Time
          <span className="text-sm font-normal text-gray-400 ml-2">(Optional)</span>
        </label>
        <div className="flex items-start gap-2 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-gray-700 leading-relaxed">
            Set a specific date and time to create a countdown to the big moment. 
            Leave blank to make your birthday page visible immediately.
          </p>
        </div>
      </div>
      
      {/* DatePicker Container */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        <DatePicker
          selected={birthdayDate}
          onChange={(date) => setBirthdayDate(date)}
          showTimeSelect
          timeFormat="h:mm aa"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="w-full pl-12 pr-4 py-4 text-base font-medium text-gray-800 
                     bg-white border-2 border-gray-200 rounded-xl shadow-sm
                     transition-all duration-200 ease-in-out
                     hover:border-blue-300 hover:shadow-md
                     focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500
                     placeholder:text-gray-400"
          placeholderText="Click to select a date and time"
          isClearable
          wrapperClassName="w-full"
        />
      </div>

      {/* Selected Date Display */}
      {birthdayDate && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                Selected Birthday Time
              </p>
              <p className="text-lg font-bold text-gray-900">
                {birthdayDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                at {birthdayDate.toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit', 
                  hour12: true 
                })}
              </p>
            </div>
            <div className="text-4xl animate-pulse">🎉</div>
          </div>
        </div>
      )}

      {/* Custom Styles for react-datepicker */}
      <style jsx global>{`
        .react-datepicker-wrapper {
          width: 100%;
        }
        
        .react-datepicker {
          font-family: inherit;
          border: 2px solid #e5e7eb;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .react-datepicker__header {
          background-color: #3b82f6;
          border-bottom: none;
          border-radius: 0.875rem 0.875rem 0 0;
          padding-top: 1rem;
        }
        
        .react-datepicker__current-month,
        .react-datepicker-time__header {
          color: white;
          font-weight: 600;
          font-size: 1rem;
        }
        
        .react-datepicker__day-name {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
        }
        
        .react-datepicker__day {
          border-radius: 0.5rem;
          transition: all 0.2s;
        }
        
        .react-datepicker__day:hover {
          background-color: #dbeafe;
          transform: scale(1.05);
        }
        
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background-color: #3b82f6;
          font-weight: 600;
        }
        
        .react-datepicker__day--selected:hover {
          background-color: #2563eb;
        }
        
        .react-datepicker__time-container {
          border-left: 2px solid #e5e7eb;
        }
        
        .react-datepicker__time-list-item:hover {
          background-color: #dbeafe !important;
        }
        
        .react-datepicker__time-list-item--selected {
          background-color: #3b82f6 !important;
          font-weight: 600;
        }
        
        .react-datepicker__close-icon::after {
          background-color: #ef4444;
          font-size: 1.25rem;
          padding: 0.25rem;
        }
        
        .react-datepicker__navigation {
          top: 1rem;
        }
        
        .react-datepicker__navigation-icon::before {
          border-color: white;
          border-width: 2px 2px 0 0;
        }
        
        @media (max-width: 640px) {
          .react-datepicker {
            font-size: 0.875rem;
          }
          
          .react-datepicker__day,
          .react-datepicker__time-list-item {
            padding: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DateSelector;