'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Doctor, ConsultationType, SortType, FilterState } from '@/types/doctor';
import { fetchDoctors } from '@/services/api';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { DoctorCard } from '@/components/DoctorCard';

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('search') || '',
    consultationType: (searchParams.get('consultationType') as ConsultationType) || 'all',
    specialties: searchParams.get('specialties')?.split(',').filter(Boolean) || [],
    sortBy: (searchParams.get('sortBy') as SortType) || null,
  });

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to load doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  useEffect(() => {
    // Update URL with filters
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.consultationType !== 'all') params.set('consultationType', filters.consultationType);
    if (filters.specialties.length > 0) params.set('specialties', filters.specialties.join(','));
    if (filters.sortBy) params.set('sortBy', filters.sortBy);

    router.push(`?${params.toString()}`);

    // Apply filters
    let filtered = [...doctors];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Consultation type filter
    if (filters.consultationType !== 'all') {
      filtered = filtered.filter(doctor =>
        filters.consultationType === 'video' ? doctor.video_consult : doctor.in_clinic
      );
    }

    // Specialties filter
    if (filters.specialties.length > 0) {
      filtered = filtered.filter(doctor =>
        filters.specialties.some(specialty => 
          doctor.specialities?.some(s => s.name === specialty) ?? false
        )
      );
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        if (filters.sortBy === 'fees') {
          // Convert string fees to numbers for comparison
          const aFees = parseFloat(a.fees.replace(/[^\d.]/g, ''));
          const bFees = parseFloat(b.fees.replace(/[^\d.]/g, ''));
          return aFees - bFees;
        } else {
          // Convert string experience to numbers for comparison
          const aExp = parseFloat(a.experience);
          const bExp = parseFloat(b.experience);
          return bExp - aExp;
        }
      });
    }

    setFilteredDoctors(filtered);
  }, [filters, doctors, router]);

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  const handleSpecialtyChange = (specialty: string) => {
    setFilters(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleConsultationTypeChange = (type: ConsultationType) => {
    setFilters(prev => ({ ...prev, consultationType: type }));
  };

  const handleSortChange = (sort: SortType) => {
    setFilters(prev => ({ ...prev, sortBy: sort }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-blue-600 text-lg mb-2">Loading...</div>
          <div className="text-gray-500">Fetching doctor information</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <div className="text-lg mb-2">Error</div>
          <div>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="bg-blue-700 p-4">
        <div className="max-w-7xl mx-auto">
          <SearchBar doctors={doctors} onSearch={handleSearch} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-6">
          <aside className="w-64 bg-white rounded-lg p-4 h-fit">
            <FilterPanel
              selectedSpecialties={filters.specialties}
              consultationType={filters.consultationType}
              sortBy={filters.sortBy}
              onSpecialtyChange={handleSpecialtyChange}
              onConsultationTypeChange={handleConsultationTypeChange}
              onSortChange={handleSortChange}
            />
          </aside>
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4">
              {filteredDoctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
            {filteredDoctors.length === 0 && (
              <div className="text-center py-8 text-gray-500 bg-white rounded-lg">
                No doctors found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 