
"use client"
import React, { useState } from 'react';
import { Users, FileText, Building2, Activity, Shield, Plus, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Patient } from '@/types/patient';

interface User {
  userName: string;
}

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
  visitDate: string; // Changed to visitDate to match original component
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

interface Stats {
  totalPatients: number;
  totalRecords: number;
  totalHospitals: number;
  activePatients: number;
}

// Dummy Data
const user: User = { userName: 'Dr. Amaka Eze' };
const isAuthenticated = true;

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
    createdAt: new Date('2025-09-25T13:50:00.000+01:00').toISOString(),
    updatedAt: new Date('2025-09-25T13:50:00.000+01:00').toISOString(),
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
    createdAt: new Date('2025-09-25T13:50:00.000+01:00').toISOString(),
    updatedAt: new Date('2025-09-25T13:50:00.000+01:00').toISOString(),
  },
];

const stats: Stats = {
  totalPatients: patients.length,
  totalRecords: 3,
  totalHospitals: 2,
  activePatients: patients.filter((p) => p.isActive).length,
};

const recentRecords: MedicalRecord[] = [
  {
    _id: '1',
    recordId: 'REC001',
    patientId: 'PAT001',
    doctorName: 'Amaka Eze',
    recordType: 'diagnosis',
    visitDate: '2025-09-20T10:00:00.000+01:00',
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
    visitDate: '2025-09-22T14:30:00.000+01:00',
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
    visitDate: '2025-09-25T12:00:00.000+01:00',
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

const monthlyRecords = [
  { month: 'Jan', records: 45 },
  { month: 'Feb', records: 52 },
  { month: 'Mar', records: 48 },
  { month: 'Apr', records: 61 },
  { month: 'May', records: 55 },
  { month: 'Jun', records: 67 },
];

const recordTypes = [
  { name: 'Consultation', value: 40, color: '#10b981' },
  { name: 'Diagnosis', value: 25, color: '#3b82f6' },
  { name: 'Treatment', value: 20, color: '#f59e0b' },
  { name: 'Surgery', value: 10, color: '#ef4444' },
  { name: 'Immunization', value: 5, color: '#8b5cf6' },
];

// Reusable Components
const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const RecentRecordItem: React.FC<{
  record: MedicalRecord;
}> = ({ record }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div>
      <p className="font-medium text-gray-900">{record.recordType.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</p>
      <p className="text-sm text-gray-600">Patient ID: {record.patientId}</p>
      <p className="text-sm text-gray-500">{new Date(record.visitDate).toLocaleDateString()}</p>
    </div>
    <div className="flex items-center space-x-2">
      {record.isVerified && <Shield className="h-4 w-4 text-green-600" />}
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          record.recordType === 'consultation' ? 'bg-blue-100 text-blue-800' :
          record.recordType === 'diagnosis' ? 'bg-green-100 text-green-800' :
          record.recordType === 'treatment' ? 'bg-orange-100 text-orange-800' :
          record.recordType === 'lab_result' ? 'bg-purple-100 text-purple-800' :
          'bg-gray-100 text-gray-800'
        }`}
      >
        {record.recordType.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
      </span>
    </div>
  </div>
);

// Main Component
const Dashboard: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(isAuthenticated);

  const signIn = () => {
    console.log('Simulating sign-in...');
    setShowDashboard(true);
  };

  if (!showDashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to HealthRecords Nigeria</h1>
          <p className="text-gray-600 mb-6">
            Secure digital patient records management system for Nigerian healthcare facilities.
            Sign in to access your dashboard.
          </p>
          <button
            onClick={signIn}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Sign In to Continue
          </button>
          <div className="mt-6 text-sm text-gray-500">
            <p>✓ Blockchain-verified records</p>
            <p>✓ HIPAA compliant security</p>
            <p>✓ Multi-hospital access</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={<Users className="h-6 w-6 text-blue-600" />}
            color="bg-blue-100"
          />
          <StatCard
            title="Medical Records"
            value={stats.totalRecords}
            icon={<FileText className="h-6 w-6 text-green-600" />}
            color="bg-green-100"
          />
          <StatCard
            title="Hospitals"
            value={stats.totalHospitals}
            icon={<Building2 className="h-6 w-6 text-purple-600" />}
            color="bg-purple-100"
          />
          <StatCard
            title="Active Patients"
            value={stats.activePatients}
            icon={<Activity className="h-6 w-6 text-orange-600" />}
            color="bg-orange-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Records Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRecords}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="records" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Record Types Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={recordTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {recordTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Medical Records</h3>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentRecords.length > 0 ? (
                recentRecords.map((record) => (
                  <RecentRecordItem key={record._id} record={record} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent medical records</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <Plus className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-700">Add New Patient</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-700">Create Medical Record</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <Search className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-700">Search Patients</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                <Building2 className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-700">View Hospitals</span>
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">System Status</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blockchain Sync</span>
                  <span className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Security</span>
                  <span className="flex items-center text-sm text-green-600">
                    <Shield className="w-3 h-3 mr-2" />
                    Secured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;