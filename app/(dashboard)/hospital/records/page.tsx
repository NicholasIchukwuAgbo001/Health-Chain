"use client"
import React, { useState } from 'react';
import { Search, Plus, Shield, Calendar, User, FileText, Eye, AlertTriangle } from 'lucide-react';
import MedicalRecordForm from '@/components/dashboard/hospital/MedicalRecordForm';
import { Patient } from '@/types/patient';

// Interfaces
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
  _id: string;
  recordId: string;
  patientId: string;
  doctorName: string;
  recordType: string;
  recordDate: string;
  diagnosis?: string;
  symptoms?: string[];
  treatment?: string;
  prescription?: Prescription[];
  vitalSigns?: VitalSigns;
  notes?: string;
  blockchainHash?: string;
  isVerified: boolean;
  createdAt: string;
}

// Dummy Data
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
    createdAt: new Date('2025-09-25T12:09:00.000+01:00').toISOString(),
    updatedAt: new Date('2025-09-25T12:09:00.000+01:00').toISOString(),
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
    createdAt: new Date('2025-09-25T12:09:00.000+01:00').toISOString(),
    updatedAt: new Date('2025-09-25T12:09:00.000+01:00').toISOString(),
  },
];

const initialRecords: MedicalRecord[] = [
  {
    _id: '1',
    recordId: 'REC001',
    patientId: 'PAT001',
    doctorName: 'Amaka Eze',
    recordType: 'diagnosis',
    recordDate: '2025-09-20T10:00:00.000+01:00',
    diagnosis: 'Hypertension',
    symptoms: ['Headache', 'Dizziness'],
    treatment: 'Lifestyle changes and medication',
    prescription: [{ medication: 'Lisinopril', dosage: '10mg daily', duration: 'Ongoing' }],
    vitalSigns: { bloodPressure: '140/90 mmHg', temperature: '36.6°C', heartRate: '80 bpm', weight: '70 kg' },
    notes: 'Patient advised to reduce salt intake.',
    blockchainHash: '0x123abc...',
    isVerified: true,
    createdAt: new Date('2025-09-20T10:00:00.000+01:00').toISOString(),
  },
  {
    _id: '2',
    recordId: 'REC002',
    patientId: 'PAT002',
    doctorName: 'Chukwuemeka Obi',
    recordType: 'prescription',
    recordDate: '2025-09-22T14:30:00.000+01:00',
    prescription: [{ medication: 'Salbutamol Inhaler', dosage: '2 puffs as needed', duration: '3 months' }],
    vitalSigns: { heartRate: '75 bpm', temperature: '36.8°C' },
    notes: 'Prescribed for asthma management.',
    blockchainHash: '0x456def...',
    isVerified: true,
    createdAt: new Date('2025-09-22T14:30:00.000+01:00').toISOString(),
  },
  {
    _id: '3',
    recordId: 'REC003',
    patientId: 'PAT001',
    doctorName: 'Ngozi Adebayo',
    recordType: 'lab_result',
    recordDate: '2025-09-25T12:00:00.000+01:00',
    diagnosis: 'Normal blood work',
    symptoms: [],
    treatment: 'No treatment needed',
    prescription: [],
    vitalSigns: { bloodPressure: '120/80 mmHg', temperature: '36.5°C', heartRate: '72 bpm', weight: '68 kg' },
    notes: 'Routine check-up results.',
    blockchainHash: '0x789ghi...',
    isVerified: false,
    createdAt: new Date('2025-09-25T12:00:00.000+01:00').toISOString(),
  },
];

const RecordItem: React.FC<{
  record: MedicalRecord;
  getPatientName: (patientId: string) => string;
  getRecordTypeColor: (type: string) => string;
  formatRecordType: (type: string) => string;
  onView: () => void;
}> = ({ record, getPatientName, getRecordTypeColor, formatRecordType, onView }) => (
  <div className="p-6 hover:bg-gray-50 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-4 mb-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="text-lg font-semibold text-gray-900">{getPatientName(record.patientId)}</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRecordTypeColor(record.recordType)}`}>
                {formatRecordType(record.recordType)}
              </span>
              {record.isVerified && (
                <div className="flex items-center space-x-1 text-green-600">
                  <Shield className="h-4 w-4" />
                  <span className="text-xs font-medium">Verified</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Patient ID:</span>
                <span>{record.patientId}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Dr. {record.doctorName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(record.recordDate).toLocaleDateString()}</span>
              </div>
            </div>
            {record.diagnosis && (
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-700">Diagnosis: </span>
                <span className="text-sm text-gray-600">{record.diagnosis}</span>
              </div>
            )}
            {record.symptoms && record.symptoms.length > 0 && (
              <div className="mt-1">
                <span className="text-sm font-medium text-gray-700">Symptoms: </span>
                <span className="text-sm text-gray-600">{record.symptoms.join(', ')}</span>
              </div>
            )}
            {record.blockchainHash && (
              <div className="mt-2 text-xs text-green-600 bg-green-50 p-2 rounded">
                <strong>Blockchain Hash:</strong> {record.blockchainHash}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={onView}
        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
        title="View Details"
      >
        <Eye className="h-5 w-5" />
      </button>
    </div>
  </div>
);

const RecordDetailsModal: React.FC<{
  record: MedicalRecord;
  getPatientName: (patientId: string) => string;
  formatRecordType: (type: string) => string;
  onClose: () => void;
}> = ({ record, getPatientName, formatRecordType, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Medical Record Details</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          ×
        </button>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Record Information</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Record ID</label>
                <p className="text-gray-900">{record.recordId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Patient</label>
                <p className="text-gray-900">{getPatientName(record.patientId)} ({record.patientId})</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Doctor</label>
                <p className="text-gray-900">Dr. {record.doctorName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Record Type</label>
                <p className="text-gray-900">{formatRecordType(record.recordType)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Record Date</label>
                <p className="text-gray-900">{new Date(record.recordDate).toLocaleString()}</p>
              </div>
            </div>
          </div>
          {record.vitalSigns && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Vital Signs</h3>
              <div className="space-y-3">
                {Object.entries(record.vitalSigns).filter(([_, value]) => value).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-sm font-medium text-gray-500">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <p className="text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {record.diagnosis && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Diagnosis</h3>
            <p className="text-gray-900 bg-blue-50 p-4 rounded-lg">{record.diagnosis}</p>
          </div>
        )}
        {record.treatment && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Treatment</h3>
            <p className="text-gray-900 bg-green-50 p-4 rounded-lg">{record.treatment}</p>
          </div>
        )}
        {record.symptoms && record.symptoms.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {record.symptoms.map((symptom, index) => (
                <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        )}
        {record.prescription && record.prescription.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Prescriptions</h3>
            <div className="space-y-3">
              {record.prescription.map((med, index) => (
                <div key={index} className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Medication</label>
                      <p className="text-gray-900">{med.medication}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Dosage</label>
                      <p className="text-gray-900">{med.dosage}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Duration</label>
                      <p className="text-gray-900">{med.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {record.notes && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Additional Notes</h3>
            <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{record.notes}</p>
          </div>
        )}
        {record.blockchainHash && (
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Blockchain Verification
            </h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium text-green-700">Hash</label>
                <p className="text-green-900 font-mono text-sm break-all">{record.blockchainHash}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-green-700">Status</label>
                <p className="text-green-900">{record.isVerified ? 'Verified' : 'Pending Verification'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-green-700">Created</label>
                <p className="text-green-900">{new Date(record.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Main Component
const MedicalRecords: React.FC = () => {
  const [records] = useState<MedicalRecord[]>(initialRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecordType, setSelectedRecordType] = useState('');
  const [showRecordForm, setShowRecordForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const userRole = 'ADMIN';
  if (userRole !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">This page is only accessible to hospital staff.</p>
        </div>
      </div>
    );
  }

  const getPatientName = (patientId: string): string => {
    const patient = patients.find((p) => p.patientId === patientId);
    return patient ? patient.firstName : 'Unknown Patient';
  };

  const getRecordTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      diagnosis: 'bg-blue-100 text-blue-800',
      prescription: 'bg-green-100 text-green-800',
      lab_result: 'bg-purple-100 text-purple-800',
      treatment: 'bg-orange-100 text-orange-800',
      immunization: 'bg-pink-100 text-pink-800',
      visit_note: 'bg-gray-100 text-gray-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const formatRecordType = (type: string): string =>
    type
      .replace('_', ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getPatientName(record.patientId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.diagnosis && record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = !selectedRecordType || record.recordType === selectedRecordType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
            <p className="text-gray-600 mt-2">Manage patient medical records and blockchain verification</p>
          </div>
          <button
            onClick={() => setShowRecordForm(true)}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Medical Record</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient ID, doctor, or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
             title='btn'
              value={selectedRecordType}
              onChange={(e) => setSelectedRecordType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Record Types</option>
              {['diagnosis', 'prescription', 'lab_result', 'treatment', 'immunization', 'visit_note'].map((type) => (
                <option key={type} value={type}>
                  {formatRecordType(type)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Medical Records ({filteredRecords.length})</h3>
          </div>
          {filteredRecords.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {searchTerm || selectedRecordType ? 'No records found matching your criteria.' : 'No medical records yet.'}
              </p>
              {!searchTerm && !selectedRecordType && (
                <button
                  onClick={() => setShowRecordForm(true)}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Add your first medical record
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <RecordItem
                  key={record._id}
                  record={record}
                  getPatientName={getPatientName}
                  getRecordTypeColor={getRecordTypeColor}
                  formatRecordType={formatRecordType}
                  onView={() => setSelectedRecord(record)}
                />
              ))}
            </div>
          )}
        </div>

        <MedicalRecordForm isOpen={showRecordForm} onClose={() => setShowRecordForm(false)} />
        {selectedRecord && (
          <RecordDetailsModal
            record={selectedRecord}
            getPatientName={getPatientName}
            formatRecordType={formatRecordType}
            onClose={() => setSelectedRecord(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
