import { Doctor } from '@/types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const getClinicDisplay = () => {
    if (!doctor.clinic) return '';
    return doctor.clinic.name || '';
  };

  const getLocationDisplay = () => {
    if (!doctor.clinic?.address) return '';
    const address = doctor.clinic.address;
    return `${address.locality}, ${address.city}`;
  };

  const getQualifications = () => {
    if (!doctor.doctor_introduction) return '';
    // Match qualifications like MBBS, MD, etc.
    const match = doctor.doctor_introduction.match(/[A-Z]+(?:[,-]\s*[A-Z]+)*/);
    return match ? match[0] : '';
  };

  const clinicDisplay = getClinicDisplay();
  const locationDisplay = getLocationDisplay();
  const qualifications = getQualifications();

  return (
    <div data-testid="doctor-card" className="p-4 bg-white mb-4">
      <div className="flex gap-4">
        {/* Left side with image */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <img
            src={doctor.photo || 'https://via.placeholder.com/64'}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Middle section with doctor info */}
        <div className="flex-grow">
          <div className="mb-1">
            <h3 data-testid="doctor-name" className="text-lg font-medium text-gray-900">
              {doctor.name}
            </h3>
            <div className="text-gray-600">
              {doctor.specialities?.[0]?.name}
            </div>
            {qualifications && (
              <div className="text-sm text-gray-500">
                {qualifications}
              </div>
            )}
          </div>

          <div data-testid="doctor-experience" className="text-sm text-gray-600 mb-2">
            {doctor.experience}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center text-sm text-gray-600">
              <img
                src="/hospital-icon.svg"
                alt="clinic"
                className="w-4 h-4 mr-2"
              />
              {clinicDisplay}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <img
                src="/location-icon.svg"
                alt="location"
                className="w-4 h-4 mr-2"
              />
              {locationDisplay}
            </div>
          </div>
        </div>

        {/* Right side with fee and button */}
        <div className="flex flex-col items-end justify-between min-w-[120px]">
          <div data-testid="doctor-fee" className="text-lg font-medium text-gray-900">
            {doctor.fees}
          </div>
          <button className="w-full text-center px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors text-sm">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}; 