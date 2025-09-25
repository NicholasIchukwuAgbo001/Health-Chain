export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface EmergencyContact {
  name?: string;
  relationship?: string;
  phoneNumber?: string;
}

export interface InsuranceInfo {
  provider?: string;
  policyNumber?: string;
  groupNumber?: string;
}

export interface Patient {
  _id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email?: string;
  address?: Address;
  emergencyContact?: EmergencyContact;
  bloodType?: string;
  allergies?: string[];
  medicalHistory?: string[];
  currentMedications?: string[];
  insuranceInfo?: InsuranceInfo;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}