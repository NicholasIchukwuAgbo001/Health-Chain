import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Patient, Address, EmergencyContact, InsuranceInfo } from '@/types/patient';

interface PatientFormProps {
  patient?: Patient | null;
  onSubmit: (patient: Omit<Patient, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  onSubmit,
  onClose,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Omit<Patient, '_id' | 'createdAt' | 'updatedAt'>>({
    patientId: '',
    firstName: '',
    lastName: '',
    middleName: '',
    dateOfBirth: '',
    gender: 'male',
    phoneNumber: '',
    email: '',
    address: undefined,
    emergencyContact: undefined,
    bloodType: '',
    allergies: [],
    medicalHistory: [],
    currentMedications: [],
    insuranceInfo: undefined,
    isActive: true,
  });

  const [allergiesText, setAllergiesText] = useState('');
  const [medicalHistoryText, setMedicalHistoryText] = useState('');
  const [medicationsText, setMedicationsText] = useState('');

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    if (patient) {
      setFormData({
        patientId: patient.patientId,
        firstName: patient.firstName,
        lastName: patient.lastName,
        middleName: patient.middleName || '',
        dateOfBirth: patient.dateOfBirth.split('T')[0],
        gender: patient.gender,
        phoneNumber: patient.phoneNumber,
        email: patient.email || '',
        address: patient.address ? {
          street: patient.address.street || '',
          city: patient.address.city || '',
          state: patient.address.state || '',
          country: patient.address.country || 'Nigeria',
          postalCode: patient.address.postalCode || '',
        } : undefined,
        emergencyContact: patient.emergencyContact ? {
          name: patient.emergencyContact.name || '',
          relationship: patient.emergencyContact.relationship || '',
          phoneNumber: patient.emergencyContact.phoneNumber || '',
        } : undefined,
        bloodType: patient.bloodType || '',
        allergies: patient.allergies || [],
        medicalHistory: patient.medicalHistory || [],
        currentMedications: patient.currentMedications || [],
        insuranceInfo: patient.insuranceInfo ? {
          provider: patient.insuranceInfo.provider || '',
          policyNumber: patient.insuranceInfo.policyNumber || '',
          groupNumber: patient.insuranceInfo.groupNumber || '',
        } : undefined,
        isActive: patient.isActive,
      });
      setAllergiesText(patient.allergies?.join(', ') || '');
      setMedicalHistoryText(patient.medicalHistory?.join(', ') || '');
      setMedicationsText(patient.currentMedications?.join(', ') || '');
    } else {
      const year = new Date().getFullYear();
      const timestamp = Date.now().toString().slice(-6);
      setFormData((prev) => ({ ...prev, patientId: `PT-${year}-${timestamp}` }));
    }
  }, [patient]);

  const handleInputChange = (
    field: keyof Omit<Patient, '_id' | 'createdAt' | 'updatedAt'> | 'address.street' | 'address.city' | 'address.state' | 'address.country' | 'address.postalCode' | 'emergencyContact.name' | 'emergencyContact.relationship' | 'emergencyContact.phoneNumber' | 'insuranceInfo.provider' | 'insuranceInfo.policyNumber' | 'insuranceInfo.groupNumber',
    value: string | boolean
  ) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === 'address') {
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            [child]: value,
          } as Address,
        }));
      } else if (parent === 'emergencyContact') {
        setFormData((prev) => ({
          ...prev,
          emergencyContact: {
            ...prev.emergencyContact,
            [child]: value,
          } as EmergencyContact,
        }));
      } else if (parent === 'insuranceInfo') {
        setFormData((prev) => ({
          ...prev,
          insuranceInfo: {
            ...prev.insuranceInfo,
            [child]: value,
          } as InsuranceInfo,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dateOfBirth) {
      alert('Please enter a valid date of birth');
      return;
    }
    const processedData = {
      ...formData,
      allergies: allergiesText.split(',').map((item) => item.trim()).filter(Boolean),
      medicalHistory: medicalHistoryText.split(',').map((item) => item.trim()).filter(Boolean),
      currentMedications: medicationsText.split(',').map((item) => item.trim()).filter(Boolean),
      dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
    };
    await onSubmit(processedData);
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[999999999] p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{patient ? 'Edit Patient' : 'Add New Patient'}</h2>
          <button title="Close form" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="patientId" className="text-sm font-medium text-gray-700">Patient ID</label>
              <input
                type="text"
                id="patientId"
                value={formData.patientId}
                readOnly={!!patient}
                onChange={(e) => handleInputChange('patientId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="middleName" className="text-sm font-medium text-gray-700">Middle Name</label>
              <input
                type="text"
                id="middleName"
                value={formData.middleName}
                onChange={(e) => handleInputChange('middleName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="bloodType" className="text-sm font-medium text-gray-700">Blood Type</label>
              <select
                id="bloodType"
                value={formData.bloodType}
                onChange={(e) => handleInputChange('bloodType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Blood Type</option>
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="street" className="text-sm font-medium text-gray-700">Street Address</label>
              <input
                type="text"
                id="street"
                value={formData.address?.street || ''}
                onChange={(e) => handleInputChange('address.street', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="city" className="text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                value={formData.address?.city || ''}
                onChange={(e) => handleInputChange('address.city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="state" className="text-sm font-medium text-gray-700">State</label>
              <select
                id="state"
                value={formData.address?.state || ''}
                onChange={(e) => handleInputChange('address.state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select State</option>
                {nigerianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="postalCode" className="text-sm font-medium text-gray-700">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                value={formData.address?.postalCode || ''}
                onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="emergencyName" className="text-sm font-medium text-gray-700">Emergency Contact Name</label>
              <input
                type="text"
                id="emergencyName"
                value={formData.emergencyContact?.name || ''}
                onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="emergencyRelationship" className="text-sm font-medium text-gray-700">Emergency Contact Relationship</label>
              <input
                type="text"
                id="emergencyRelationship"
                value={formData.emergencyContact?.relationship || ''}
                onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="emergencyPhone" className="text-sm font-medium text-gray-700">Emergency Contact Phone</label>
              <input
                type="tel"
                id="emergencyPhone"
                value={formData.emergencyContact?.phoneNumber || ''}
                onChange={(e) => handleInputChange('emergencyContact.phoneNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="insuranceProvider" className="text-sm font-medium text-gray-700">Insurance Provider</label>
              <input
                type="text"
                id="insuranceProvider"
                value={formData.insuranceInfo?.provider || ''}
                onChange={(e) => handleInputChange('insuranceInfo.provider', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="insurancePolicy" className="text-sm font-medium text-gray-700">Insurance Policy Number</label>
              <input
                type="text"
                id="insurancePolicy"
                value={formData.insuranceInfo?.policyNumber || ''}
                onChange={(e) => handleInputChange('insuranceInfo.policyNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="insuranceGroup" className="text-sm font-medium text-gray-700">Insurance Group Number</label>
              <input
                type="text"
                id="insuranceGroup"
                value={formData.insuranceInfo?.groupNumber || ''}
                onChange={(e) => handleInputChange('insuranceInfo.groupNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="allergiesText" className="text-sm font-medium text-gray-700">Allergies (comma-separated)</label>
            <textarea
              id="allergiesText"
              value={allergiesText}
              onChange={(e) => setAllergiesText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="medicalHistoryText" className="text-sm font-medium text-gray-700">Medical History (comma-separated)</label>
            <textarea
              id="medicalHistoryText"
              value={medicalHistoryText}
              onChange={(e) => setMedicalHistoryText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="medicationsText" className="text-sm font-medium text-gray-700">Current Medications (comma-separated)</label>
            <textarea
              id="medicationsText"
              value={medicationsText}
              onChange={(e) => setMedicationsText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => handleInputChange('isActive', e.target.checked)}
              className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Active Patient</span>
          </label>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{isLoading ? 'Saving...' : 'Save Patient'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;