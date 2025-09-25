"use client"
import { FileText, Building2, Shield, Plus, Search } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Patient } from "@/types/patient";

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
  visitDate: string;
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
const patients: Patient[] = [
  {
    _id: "p1",
    patientId: "PT-1001",
    firstName: "John",
    lastName: "Doe",
    middleName: "Michael",
    dateOfBirth: "1990-05-14",
    gender: "Male",
    phoneNumber: "+2348012345678",
    email: "john.doe@email.com",
    address: {
      street: "12 Adekunle Street",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      postalCode: "100001",
    },
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Wife",
      phoneNumber: "+2348091122334",
    },
    bloodType: "O+",
    allergies: ["Penicillin"],
    medicalHistory: ["Malaria (2018)", "Hypertension (2021)"],
    currentMedications: ["Amlodipine"],
    insuranceInfo: {
      provider: "AXA Mansard",
      policyNumber: "AXA-123456",
      groupNumber: "GRP-7890",
    },
    isActive: true,
    createdAt: "2025-09-01T08:00:00Z",
    updatedAt: "2025-09-20T10:00:00Z",
  },
  {
    _id: "p2",
    patientId: "PT-1002",
    firstName: "Jane",
    lastName: "Smith",
    dateOfBirth: "1985-08-20",
    gender: "Female",
    phoneNumber: "+2348098765432",
    email: "jane.smith@email.com",
    address: {
      street: "45 Unity Road",
      city: "Abuja",
      state: "FCT",
      country: "Nigeria",
      postalCode: "900001",
    },
    emergencyContact: {
      name: "Peter Smith",
      relationship: "Husband",
      phoneNumber: "+2348076655443",
    },
    bloodType: "A-",
    allergies: ["Seafood"],
    medicalHistory: ["Asthma (2010)"],
    currentMedications: ["Salbutamol Inhaler"],
    insuranceInfo: {
      provider: "NHIS",
      policyNumber: "NHIS-98765",
      groupNumber: "GRP-2222",
    },
    isActive: false,
    createdAt: "2025-08-15T09:00:00Z",
    updatedAt: "2025-09-18T11:00:00Z",
  },
];

const stats: Stats = {
  totalPatients: patients.length,
  totalRecords: 3,
  totalHospitals: 2,
  activePatients: patients.filter((p) => p.isActive).length,
};

// 👉 Dummy Records
const recentRecords: MedicalRecord[] = [
  {
    _id: "r1",
    recordId: "REC-001",
    patientId: "PT-1001",
    doctorName: "Dr. Johnson",
    recordType: "consultation",
    visitDate: "2025-09-10",
    diagnosis: "Malaria",
    symptoms: ["Fever", "Headache"],
    treatment: "Artemisinin Combination Therapy",
    isVerified: true,
    createdAt: "2025-09-10T10:00:00Z",
  },
  {
    _id: "r2",
    recordId: "REC-002",
    patientId: "PT-1002",
    doctorName: "Dr. Lee",
    recordType: "diagnosis",
    visitDate: "2025-09-12",
    diagnosis: "Typhoid",
    symptoms: ["Abdominal Pain", "Fever"],
    treatment: "Antibiotics",
    isVerified: false,
    createdAt: "2025-09-12T12:00:00Z",
  },
  {
    _id: "r3",
    recordId: "REC-003",
    patientId: "PT-1001",
    doctorName: "Dr. Adams",
    recordType: "treatment",
    visitDate: "2025-09-15",
    treatment: "IV Fluids + Antibiotics",
    isVerified: true,
    createdAt: "2025-09-15T14:00:00Z",
  },
];

const monthlyRecords = [
  { month: "Jan", records: 45 },
  { month: "Feb", records: 52 },
  { month: "Mar", records: 48 },
  { month: "Apr", records: 61 },
  { month: "May", records: 55 },
  { month: "Jun", records: 67 },
];

const recordTypes = [
  { name: "Consultation", value: 40, color: "#10b981" },
  { name: "Diagnosis", value: 25, color: "#3b82f6" },
  { name: "Treatment", value: 20, color: "#f59e0b" },
  { name: "Surgery", value: 10, color: "#ef4444" },
  { name: "Immunization", value: 5, color: "#8b5cf6" },
];

const RecentRecordItem: React.FC<{ record: MedicalRecord }> = ({ record }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 shadow hover:scale-105 rounded-lg cursor-pointer transition-transform">
    <div>
      <p className="font-medium text-gray-900">
        {record.recordType.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </p>
      <p className="text-sm text-gray-600">Patient ID: {record.patientId}</p>
      <p className="text-sm text-gray-500">
        {new Date(record.visitDate).toLocaleDateString()}
      </p>
    </div>
    <div className="flex items-center space-x-2">
      {record.isVerified && <Shield className="h-4 w-4 text-green-600" />}
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          record.recordType === "consultation"
            ? "bg-blue-100 text-blue-800"
            : record.recordType === "diagnosis"
            ? "bg-green-100 text-green-800"
            : record.recordType === "treatment"
            ? "bg-orange-100 text-orange-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {record.recordType.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Records Trend
            </h3>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Record Types Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={recordTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
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

        {/* Recent Records */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Medical Records
              </h3>
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

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <Plus className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-700">Add New Patient</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-700">
                  Create Medical Record
                </span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <Search className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-700">Search Patients</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                <Building2 className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-700">
                  View Hospitals Dashboard
                </span>
              </button>
            </div>

            {/* System Status */}
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
