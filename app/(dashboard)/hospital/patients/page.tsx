"use client";
import React, { useState, useEffect } from "react";
import PatientCard from "@/components/dashboard/hospital/PatientCard";
import PatientForm from "@/components/dashboard/hospital/PatientsForm";
import {
  Search,
  Plus,
  Filter,
  Users,
  Grid,
  List,
  Download,
  Upload,
} from "lucide-react";
import toast from "react-hot-toast";
import { Patient } from "@/types/patient";

const Patients: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterGender, setFilterGender] = useState<string>("");
  const [filterBloodType, setFilterBloodType] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const dummyPatients: Patient[] = [
        {
          _id: "1",
          patientId: "PAT001",
          firstName: "Adaora",
          middleName: "Chinwe",
          lastName: "Okafor",
          dateOfBirth: "1985-03-15T00:00:00.000Z",
          gender: "Female",
          phoneNumber: "+2348012345678",
          email: "adaora.okafor@email.com",
          address: {
            street: "123 Victoria Island",
            city: "Lagos",
            state: "Lagos",
            country: "Nigeria",
            postalCode: "101241",
          },
          emergencyContact: {
            name: "John Okafor",
            relationship: "Husband",
            phoneNumber: "+2348098765432",
          },
          bloodType: "O+",
          allergies: ["Penicillin", "Shellfish"],
          medicalHistory: ["Hypertension"],
          currentMedications: ["Lisinopril 10mg", "Hydrochlorothiazide 25mg"],
          insuranceInfo: {
            provider: "NHIS",
            policyNumber: "NHIS/2023/001",
            groupNumber: "GRP001",
          },
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          _id: "2",
          patientId: "PAT002",
          firstName: "Chinedu",
          middleName: "Ifeanyi",
          lastName: "Nwosu",
          dateOfBirth: "1990-07-22T00:00:00.000Z",
          gender: "Male",
          phoneNumber: "+2348023456789",
          email: "chinedu.nwosu@email.com",
          address: {
            street: "456 Ikeja Road",
            city: "Lagos",
            state: "Lagos",
            country: "Nigeria",
            postalCode: "100213",
          },
          emergencyContact: {
            name: "Grace Nwosu",
            relationship: "Wife",
            phoneNumber: "+2348076543210",
          },
          bloodType: "A+",
          allergies: ["None"],
          medicalHistory: ["Asthma"],
          currentMedications: ["Salbutamol Inhaler"],
          insuranceInfo: {
            provider: "Private Health Insurance",
            policyNumber: "PHI/2023/002",
            groupNumber: "GRP002",
          },
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          _id: "3",
          patientId: "PAT003",
          firstName: "Mary",
          middleName: "Ngozi",
          lastName: "Williams",
          dateOfBirth: "1978-11-08T00:00:00.000Z",
          gender: "Female",
          phoneNumber: "+2348034567890",
          email: "mary.williams@email.com",
          address: {
            street: "78 Lekki Phase 1",
            city: "Lagos",
            state: "Lagos",
            country: "Nigeria",
            postalCode: "105102",
          },
          emergencyContact: {
            name: "Peter Williams",
            relationship: "Son",
            phoneNumber: "+2348065432109",
          },
          bloodType: "B+",
          allergies: ["Latex"],
          medicalHistory: ["Diabetes Type 2"],
          currentMedications: ["Metformin 500mg"],
          insuranceInfo: {
            provider: "HMO Nigeria",
            policyNumber: "HMO/2023/003",
            groupNumber: "GRP003",
          },
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          _id: "4",
          patientId: "PAT004",
          firstName: "David",
          middleName: "Emeka",
          lastName: "Brown",
          dateOfBirth: "1995-01-30T00:00:00.000Z",
          gender: "Male",
          phoneNumber: "+2348045678901",
          email: "david.brown@email.com",
          address: {
            street: "23 Marina",
            city: "Lagos",
            state: "Lagos",
            country: "Nigeria",
            postalCode: "101231",
          },
          emergencyContact: {
            name: "Sarah Brown",
            relationship: "Mother",
            phoneNumber: "+2348054321098",
          },
          bloodType: "AB+",
          allergies: ["None"],
          medicalHistory: ["None"],
          currentMedications: [],
          insuranceInfo: {
            provider: "NHIS",
            policyNumber: "NHIS/2023/004",
            groupNumber: "GRP004",
          },
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          _id: "5",
          patientId: "PAT005",
          firstName: "Grace",
          middleName: "Amaka",
          lastName: "Okafor",
          dateOfBirth: "1982-09-12T00:00:00.000Z",
          gender: "Female",
          phoneNumber: "+2348056789012",
          email: "grace.okafor@email.com",
          address: {
            street: "12 Surulere",
            city: "Lagos",
            state: "Lagos",
            country: "Nigeria",
            postalCode: "101301",
          },
          emergencyContact: {
            name: "Samuel Okafor",
            relationship: "Brother",
            phoneNumber: "+2348043210987",
          },
          bloodType: "O-",
          allergies: ["Penicillin"],
          medicalHistory: ["Hypertension", "Thyroid issues"],
          currentMedications: ["Amlodipine 5mg", "Levothyroxine 50mcg"],
          insuranceInfo: {
            provider: "Private Health Insurance",
            policyNumber: "PHI/2023/005",
            groupNumber: "GRP005",
          },
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setPatients(dummyPatients);
      setLoading(false);
    }, 1000);
  }, []);

  const createPatient = (
    patientData: Omit<Patient, "_id" | "createdAt" | "updatedAt">
  ) => {
    const newPatient: Patient = {
      ...patientData,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPatients((prev) => [newPatient, ...prev]);
    toast.success("Patient created successfully");
  };

  const updatePatient = (patientId: string, updates: Partial<Omit<Patient, "_id" | "createdAt" | "updatedAt">>) => {
    setPatients((prev) =>
      prev.map((p) =>
        p._id === patientId
          ? { ...p, ...updates, updatedAt: new Date().toISOString() }
          : p
      )
    );
    toast.success("Patient updated successfully");
  };

  const deletePatient = (patientId: string) => {
    if (!confirm("Are you sure you want to delete this patient?")) return;
    setPatients((prev) => prev.filter((p) => p._id !== patientId));
    toast.success("Patient deleted successfully");
  };

  const searchPatients = (term: string) => setSearchTerm(term);

  const filteredPatients = patients.filter((p) => {
    const genderMatch =
      !filterGender || p.gender.toLowerCase() === filterGender.toLowerCase();
    const bloodTypeMatch = !filterBloodType || p.bloodType === filterBloodType;
    const searchMatch =
      !searchTerm ||
      p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phoneNumber.includes(searchTerm) ||
      (p.email && p.email.toLowerCase().includes(searchTerm.toLowerCase()));
    return genderMatch && bloodTypeMatch && searchMatch;
  });

  const handleSubmitPatient = async (
    patientData: Omit<Patient, "_id" | "createdAt" | "updatedAt">
  ): Promise<void> => {
    if (editingPatient && editingPatient._id) {
      updatePatient(editingPatient._id, patientData);
    } else {
      createPatient(patientData);
    }
    setShowForm(false);
    setEditingPatient(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to view and manage patient records.
          </p>
          <button
            aria-label="Sign In"
            onClick={() => setIsAuthenticated(true)}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
            <p className="text-gray-600 mt-2">
              Manage patient records and information
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button
              aria-label="Add Patient"
              onClick={() => {
                setEditingPatient(null);
                setShowForm(true);
              }}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Patient</span>
            </button>
            <button
              aria-label="Import Patients"
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </button>
            <button
              aria-label="Export Patients"
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients by name, ID, phone, or email..."
                value={searchTerm}
                onChange={(e) => searchPatients(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <select
                  title="Filter by Gender"
                  value={filterGender}
                  onChange={(e) => setFilterGender(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <select
                title="Filter by Blood Type"
                value={filterBloodType}
                onChange={(e) => setFilterBloodType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Blood Types</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  aria-label="Grid View"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  aria-label="List View"
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredPatients.length} of {patients.length} patients
            </span>
            {(filterGender || filterBloodType || searchTerm) && (
              <button
                aria-label="Clear Filters"
                onClick={() => {
                  setFilterGender("");
                  setFilterBloodType("");
                  searchPatients("");
                }}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        )}

        {!loading && (
          <>
            {filteredPatients.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredPatients.map((patient) => (
                  <PatientCard
                    key={patient._id}
                    patient={patient}
                    onEdit={() => {
                      setEditingPatient(patient);
                      setShowForm(true);
                    }}
                    onDelete={() => deletePatient(patient._id)}
                    onView={() => setSelectedPatient(patient)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No patients found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterGender || filterBloodType
                    ? "Try adjusting your search criteria or filters"
                    : "Get started by adding your first patient"}
                </p>
                {!searchTerm && !filterGender && !filterBloodType && (
                  <button
                    onClick={() => {
                      setEditingPatient(null);
                      setShowForm(true);
                    }}
                    aria-label="Add First Patient"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add First Patient
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {showForm && (
          <PatientForm
            patient={editingPatient}
            onSubmit={handleSubmitPatient}
            onClose={() => {
              setShowForm(false);
              setEditingPatient(null);
            }}
            isLoading={loading}
          />
        )}

        {selectedPatient && (
          <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-[9999999] p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Patient Details
                  </h2>
                  <button
                    aria-label="Close details"
                    onClick={() => setSelectedPatient(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {selectedPatient.firstName} {selectedPatient.middleName && `${selectedPatient.middleName} `}{selectedPatient.lastName}
                    </h3>
                    <p className="text-gray-600">
                      ID: {selectedPatient.patientId}
                    </p>
                    <p className="text-gray-600">
                      DOB: {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Basic Information
                      </h4>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p>Gender: {selectedPatient.gender}</p>
                        <p>
                          Blood Type:{" "}
                          {selectedPatient.bloodType || "Not specified"}
                        </p>
                        <p>Phone: {selectedPatient.phoneNumber}</p>
                        <p>Email: {selectedPatient.email || "Not provided"}</p>
                      </div>
                    </div>

                    {selectedPatient.address && (
                      <div>
                        <h4 className="font-medium text-gray-900">Address</h4>
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          {selectedPatient.address.street && (
                            <p>{selectedPatient.address.street}</p>
                          )}
                          {selectedPatient.address.city && (
                            <p>
                              {selectedPatient.address.city},{" "}
                              {selectedPatient.address.state}
                            </p>
                          )}
                          <p>{selectedPatient.address.country}</p>
                          {selectedPatient.address.postalCode && (
                            <p>Postal: {selectedPatient.address.postalCode}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedPatient.emergencyContact && (
                    <div>
                      <h4 className="font-medium text-gray-900">Emergency Contact</h4>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        {selectedPatient.emergencyContact.name && (
                          <p>Name: {selectedPatient.emergencyContact.name}</p>
                        )}
                        {selectedPatient.emergencyContact.relationship && (
                          <p>Relationship: {selectedPatient.emergencyContact.relationship}</p>
                        )}
                        {selectedPatient.emergencyContact.phoneNumber && (
                          <p>Phone: {selectedPatient.emergencyContact.phoneNumber}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedPatient.insuranceInfo && (
                    <div>
                      <h4 className="font-medium text-gray-900">Insurance Information</h4>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        {selectedPatient.insuranceInfo.provider && (
                          <p>Provider: {selectedPatient.insuranceInfo.provider}</p>
                        )}
                        {selectedPatient.insuranceInfo.policyNumber && (
                          <p>Policy #: {selectedPatient.insuranceInfo.policyNumber}</p>
                        )}
                        {selectedPatient.insuranceInfo.groupNumber && (
                          <p>Group #: {selectedPatient.insuranceInfo.groupNumber}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedPatient.allergies &&
                    selectedPatient.allergies.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900">Allergies</h4>
                        <p className="mt-1 text-sm text-red-600">
                          {selectedPatient.allergies.join(", ")}
                        </p>
                      </div>
                    )}

                  {selectedPatient.medicalHistory &&
                    selectedPatient.medicalHistory.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Medical History
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {selectedPatient.medicalHistory.join(", ")}
                        </p>
                      </div>
                    )}

                  {selectedPatient.currentMedications &&
                    selectedPatient.currentMedications.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Current Medications
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {selectedPatient.currentMedications.join(", ")}
                        </p>
                      </div>
                    )}

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Status: {selectedPatient.isActive ? "Active" : "Inactive"} | 
                      Last Updated: {new Date(selectedPatient.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    aria-label="Close Patient Details"
                    onClick={() => setSelectedPatient(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;