
import React from 'react'
import {Phone, Mail, MapPin, Calendar, Heart, AlertTriangle, Pill, Edit, Trash2, Eye} from 'lucide-react'

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
}

interface Patient {
  _id: string
  patientId: string
  firstName: string
  lastName: string
  middleName?: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
  email?: string
  address?: Address       
  bloodType?: string
  allergies?: string[]
  medicalHistory?: string[]
  currentMedications?: string[]
  isActive: boolean
}

interface PatientCardProps {
  patient: Patient
  onEdit: (patient: Patient) => void
  onDelete: (patientId: string) => void
  onView: (patient: Patient) => void
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onEdit, onDelete, onView }) => {
  const getAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const getGenderColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'male': return 'bg-blue-100 text-blue-800'
      case 'female': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getBloodTypeColor = (bloodType: string) => {
    const colors = {
      'O+': 'bg-red-100 text-red-800',
      'O-': 'bg-red-200 text-red-900',
      'A+': 'bg-green-100 text-green-800',
      'A-': 'bg-green-200 text-green-900',
      'B+': 'bg-blue-100 text-blue-800',
      'B-': 'bg-blue-200 text-blue-900',
      'AB+': 'bg-purple-100 text-purple-800',
      'AB-': 'bg-purple-200 text-purple-900'
    }
    return colors[bloodType as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {patient.firstName} {patient.middleName} {patient.lastName}
          </h3>
          <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGenderColor(patient.gender)}`}>
            {patient.gender}
          </span>
          {patient.bloodType && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBloodTypeColor(patient.bloodType)}`}>
              {patient.bloodType}
            </span>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            patient.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {patient.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Age: {getAge(patient.dateOfBirth)} years</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="h-4 w-4" />
          <span>{patient.phoneNumber}</span>
        </div>
        {patient.email && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>{patient.email}</span>
          </div>
        )}
        {patient.address && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{patient.address.city}, {patient.address.state}</span>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        {patient.allergies && patient.allergies.length > 0 && (
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
            <div>
              <span className="text-sm font-medium text-red-700">Allergies:</span>
              <p className="text-sm text-red-600">{patient.allergies.join(', ')}</p>
            </div>
          </div>
        )}
        
        {patient.medicalHistory && patient.medicalHistory.length > 0 && (
          <div className="flex items-start space-x-2">
            <Heart className="h-4 w-4 text-blue-500 mt-0.5" />
            <div>
              <span className="text-sm font-medium text-blue-700">Medical History:</span>
              <p className="text-sm text-blue-600">{patient.medicalHistory.join(', ')}</p>
            </div>
          </div>
        )}
        
        {patient.currentMedications && patient.currentMedications.length > 0 && (
          <div className="flex items-start space-x-2">
            <Pill className="h-4 w-4 text-green-500 mt-0.5" />
            <div>
              <span className="text-sm font-medium text-green-700">Current Medications:</span>
              <p className="text-sm text-green-600">{patient.currentMedications.join(', ')}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => onView(patient)}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        >
          <Eye className="h-4 w-4" />
          <span>View</span>
        </button>
        <button
          onClick={() => onEdit(patient)}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors"
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(patient._id)}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}

export default PatientCard
