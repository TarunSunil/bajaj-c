import React, { useState } from 'react';
import { ConsultationType, SortType } from '../types/doctor';

const SPECIALTIES = [
  'General Physician', 'Dentist', 'Dermatologist', 'Paediatrician',
  'Gynaecologist', 'ENT', 'Diabetologist', 'Cardiologist',
  'Physiotherapist', 'Endocrinologist', 'Orthopaedic', 'Ophthalmologist',
  'Gastroenterologist', 'Pulmonologist', 'Psychiatrist', 'Urologist',
  'Dietitian/Nutritionist', 'Psychologist', 'Sexologist', 'Neurologist',
  'Oncologist', 'Ayurveda', 'Homeopath'
];

interface FilterPanelProps {
  selectedSpecialties: string[];
  consultationType: ConsultationType;
  sortBy: SortType | null;
  onSpecialtyChange: (specialty: string) => void;
  onConsultationTypeChange: (type: ConsultationType) => void;
  onSortChange: (sort: SortType) => void;
}

export const FilterPanel = ({
  selectedSpecialties,
  consultationType,
  sortBy,
  onSpecialtyChange,
  onConsultationTypeChange,
  onSortChange,
}: FilterPanelProps) => {
  const [specialtySearch, setSpecialtySearch] = useState('');
  
  const filteredSpecialties = SPECIALTIES.filter(specialty =>
    specialty.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  const hasActiveFilters = selectedSpecialties.length > 0 || consultationType !== 'all' || sortBy !== null;

  return (
    <div className="w-64 bg-white rounded-lg">
      {/* Sort By Section */}
      <div className="p-4 border-b">
        <h3 className="text-base font-medium text-gray-900 mb-4">Sort by</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              checked={sortBy === 'fees'}
              onChange={() => onSortChange('fees')}
              className="form-radio text-blue-600"
            />
            <span className="text-sm text-gray-700">Price: Low-High</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              checked={sortBy === 'experience'}
              onChange={() => onSortChange('experience')}
              className="form-radio text-blue-600"
            />
            <span className="text-sm text-gray-700">Experience - Most Experience first</span>
          </label>
        </div>
      </div>

      {/* Filters Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-medium text-gray-900">
            Filters
            {hasActiveFilters && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </h3>
          {hasActiveFilters && (
            <button
              onClick={() => {
                onConsultationTypeChange('all');
                onSortChange(null);
                selectedSpecialties.forEach(s => onSpecialtyChange(s));
                setSpecialtySearch('');
              }}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Specialities Section */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Specialities
            {selectedSpecialties.length > 0 && (
              <span className="ml-2 text-xs text-blue-600">
                ({selectedSpecialties.length} selected)
              </span>
            )}
          </h4>
          <div className="relative">
            <input
              type="text"
              value={specialtySearch}
              onChange={(e) => setSpecialtySearch(e.target.value)}
              placeholder="Search specialities"
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {specialtySearch ? (
                <button
                  onClick={() => setSpecialtySearch('')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                    <path d="M12 4L4 12M4 4L12 12" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                  <path d="M15.5 15.5L11.5 11.5M13.5 7C13.5 10.5899 10.5899 13.5 7 13.5C3.41015 13.5 0.5 10.5899 0.5 7C0.5 3.41015 3.41015 0.5 7 0.5C10.5899 0.5 13.5 3.41015 13.5 7Z"/>
                </svg>
              )}
            </div>
          </div>
          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {filteredSpecialties.length > 0 ? (
              filteredSpecialties.map((specialty) => (
                <label key={specialty} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedSpecialties.includes(specialty)}
                    onChange={() => onSpecialtyChange(specialty)}
                    className="form-checkbox text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">{specialty}</span>
                </label>
              ))
            ) : (
              <div className="text-sm text-gray-500 text-center py-2">
                No specialties found
              </div>
            )}
          </div>
        </div>

        {/* Mode of Consultation */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Mode of consultation</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                checked={consultationType === 'video'}
                onChange={() => onConsultationTypeChange('video')}
                className="form-radio text-blue-600"
              />
              <span className="text-sm text-gray-700">Video Consultation</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                checked={consultationType === 'in-clinic'}
                onChange={() => onConsultationTypeChange('in-clinic')}
                className="form-radio text-blue-600"
              />
              <span className="text-sm text-gray-700">In-clinic Consultation</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                checked={consultationType === 'all'}
                onChange={() => onConsultationTypeChange('all')}
                className="form-radio text-blue-600"
              />
              <span className="text-sm text-gray-700">All</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}; 