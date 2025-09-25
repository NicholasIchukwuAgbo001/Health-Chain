import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Patient } from '@/types/patient';

interface VitalSigns {
  bloodPressure?: string;
  temperature?: string;
  heartRate?: string;
  weight?: string;
}

interface Prescription {
  medication: string;
  dosage: string;
  duration: string;
}

interface MedicalRecord {
  patientId: string;
  doctorId: string;
  doctorName: string;
  hospitalId: string;
  recordType: string;
  recordDate: string;
  diagnosis?: string;
  treatment?: string;
  prescription?: Prescription[];
  notes?: string;
  symptoms?: string[];
  vitalSigns?: VitalSigns;
  isVerified: boolean;
}

interface MedicalRecordFormProps {
  isOpen: boolean;
  onClose: () => void;
  patientId?: string;
}

const patients: Patient[] = [
  {
    _id: '1',
    patientId: 'PAT001',
    firstName: 'Adaora',
    middleName: 'Chinwe',
    lastName: 'Okafor',
    dateOfBirth: '1985-03-15T00:00:00.000Z',
    gender: 'Female',
    phoneNumber: '+2348012345678',
    email: 'adaora.okafor@email.com',
    address: { street: '123 Victoria Island', city: 'Lagos', state: 'Lagos', country: 'Nigeria', postalCode: '101241' },
    emergencyContact: { name: 'John Okafor', relationship: 'Husband', phoneNumber: '+2348098765432' },
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    medicalHistory: ['Hypertension'],
    currentMedications: ['Lisinopril 10mg', 'Hydrochlorothiazide 25mg'],
    insuranceInfo: { provider: 'NHIS', policyNumber: 'NHIS/2023/001', groupNumber: 'GRP001' },
    isActive: true,
    createdAt: new Date('2025-09-25T12:13:00.000+01:00').toISOString(),
    updatedAt: new Date('2025-09-25T12:13:00.000+01:00').toISOString(),
  },
  {
    _id: '2',
    patientId: 'PAT002',
    firstName: 'Chinedu',
    middleName: 'Ifeanyi',
    lastName: 'Nwosu',
    dateOfBirth: '1990-07-22T00:00:00.000Z',
    gender: 'Male',
    phoneNumber: '+2348023456789',
    email: 'chinedu.nwosu@email.com',
    address: { street: '456 Ikeja Road', city: 'Lagos', state: 'Lagos', country: 'Nigeria', postalCode: '100213' },
    emergencyContact: { name: 'Grace Nwosu', relationship: 'Wife', phoneNumber: '+2348076543210' },
    bloodType: 'A+',
    allergies: ['None'],
    medicalHistory: ['Asthma'],
    currentMedications: ['Salbutamol Inhaler'],
    insuranceInfo: { provider: 'Private Health Insurance', policyNumber: 'PHI/2023/002', groupNumber: 'GRP002' },
    isActive: true,
    createdAt: new Date('2025-09-25T12:13:00.000+01:00').toISOString(),
    updatedAt: new Date('2025-09-25T12:13:00.000+01:00').toISOString(),
  },
];

const SymptomInput: React.FC<{
  index: number;
  value: string;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  showRemove: boolean;
}> = ({ index, value, onChange, onRemove, showRemove }) => (
  <div className="flex items-center space-x-2">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(index, e.target.value)}
      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Enter symptom"
    />
    {showRemove && (
      <button 
       title='button'
      type="button" 
      onClick={() => onRemove(index)} 
      className="p-2 text-red-600 hover:text-red-700">
        <Trash2 className="h-4 w-4" />
      </button>
    )}
  </div>
);

const PrescriptionInput: React.FC<{
  index: number;
  prescription: Prescription;
  onChange: (index: number, field: keyof Prescription, value: string) => void;
  onRemove: (index: number) => void;
  showRemove: boolean;
}> = ({ index, prescription, onChange, onRemove, showRemove }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">Medication</label>
      <input
        type="text"
        value={prescription.medication}
        onChange={(e) => onChange(index, 'medication', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Medication name"
      />
    </div>
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">Dosage</label>
      <input
        type="text"
        value={prescription.dosage}
        onChange={(e) => onChange(index, 'dosage', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="e.g., 2 tablets"
      />
    </div>
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
      <input
        type="text"
        value={prescription.duration}
        onChange={(e) => onChange(index, 'duration', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="e.g., 7 days"
      />
    </div>
    {showRemove && (
      <button 
      title='button'
      type="button" 
      onClick={() => onRemove(index)} 
      className="p-2 text-red-600 hover:text-red-700">
        <Trash2 className="h-4 w-4" />
      </button>
    )}
  </div>
);

const MedicalRecordForm: React.FC<MedicalRecordFormProps> = ({ isOpen, onClose, patientId }) => {
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(patientId || '');
  const [symptoms, setSymptoms] = useState<string[]>(['']);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([{ medication: '', dosage: '', duration: '' }]);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const recordData: MedicalRecord = {
        patientId: selectedPatient,
        doctorId: 'DOC-001',
        doctorName: formData.get('doctorName') as string,
        hospitalId: 'HOSP-001',
        recordType: formData.get('recordType') as string,
        recordDate: new Date(formData.get('recordDate') as string).toISOString(),
        diagnosis: formData.get('diagnosis') as string || undefined,
        treatment: formData.get('treatment') as string || undefined,
        prescription: prescriptions.filter((p) => p.medication.trim() !== ''),
        notes: formData.get('notes') as string || undefined,
        symptoms: symptoms.filter((s) => s.trim() !== ''),
        vitalSigns: {
          bloodPressure: formData.get('bloodPressure') as string || undefined,
          temperature: formData.get('temperature') as string || undefined,
          heartRate: formData.get('heartRate') as string || undefined,
          weight: formData.get('weight') as string || undefined,
        },
        isVerified: false,
      };

      console.log('Created Record:', recordData);
      onClose();
      setSymptoms(['']);
      setPrescriptions([{ medication: '', dosage: '', duration: '' }]);
      setSelectedPatient(patientId || '');
    } catch (error) {
      console.error('Record creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSymptom = () => setSymptoms([...symptoms, '']);
  const removeSymptom = (index: number) => setSymptoms(symptoms.filter((_, i) => i !== index));
  const updateSymptom = (index: number, value: string) => {
    const updated = [...symptoms];
    updated[index] = value;
    setSymptoms(updated);
  };

  const addPrescription = () => setPrescriptions([...prescriptions, { medication: '', dosage: '', duration: '' }]);
  const removePrescription = (index: number) => setPrescriptions(prescriptions.filter((_, i) => i !== index));
  const updatePrescription = (index: number, field: keyof Prescription, value: string) => {
    const updated = [...prescriptions];
    updated[index] = { ...updated[index], [field]: value };
    setPrescriptions(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999999 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Add Medical Record</h2>
          <button
           title="button" 
          onClick={onClose} 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
              <select
                title='button'
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                required
                disabled={!!patientId}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient.patientId}>
                    {patient. firstName} ({patient.patientId})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name *</label>
              <input
                name="doctorName"
                type="text"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter doctor's name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Record Type *</label>
              <select
               title='button'
                name="recordType"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Record Type</option>
                {['diagnosis', 'prescription', 'lab_result', 'treatment', 'immunization', 'visit_note'].map((type) => (
                  <option key={type} value={type}>
                    {type
                      .replace('_', ' ')
                      .split(' ')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Record Date *</label>
              <input
                title='btn'
                name="recordDate"
                type="datetime-local"
                required
                defaultValue={new Date('2025-09-25T12:13:00.000+01:00').toISOString().slice(0, 16)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
              <textarea
                name="diagnosis"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter diagnosis"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Treatment</label>
              <textarea
                name="treatment"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter treatment plan"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Symptoms</h3>
              <button
                type="button"
                onClick={addSymptom}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Add Symptom</span>
              </button>
            </div>
            <div className="space-y-2">
              {symptoms.map((symptom, index) => (
                <SymptomInput
                  key={index}
                  index={index}
                  value={symptom}
                  onChange={updateSymptom}
                  onRemove={removeSymptom}
                  showRemove={symptoms.length > 1}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Prescriptions</h3>
              <button
                type="button"
                onClick={addPrescription}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Add Prescription</span>
              </button>
            </div>
            <div className="space-y-4">
              {prescriptions.map((prescription, index) => (
                <PrescriptionInput
                  key={index}
                  index={index}
                  prescription={prescription}
                  onChange={updatePrescription}
                  onRemove={removePrescription}
                  showRemove={prescriptions.length > 1}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Vital Signs</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['bloodPressure', 'temperature', 'heartRate', 'weight'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <input
                    name={field}
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={field === 'bloodPressure' ? '120/80 mmHg' : field === 'temperature' ? '36.5°C' : field === 'heartRate' ? '72 bpm' : '70 kg'}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              name="notes"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter any additional notes or observations"
            />
          </div>
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Creating...' : 'Create Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecordForm;