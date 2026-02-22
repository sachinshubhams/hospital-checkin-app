import React, { useState } from 'react';
import './App.css';
import Step1PatientLookup from './components/Step1PatientLookup';
import Step2PersonalInfo from './components/Step2PersonalInfo';
import Step3MedicalInfo from './components/Step3MedicalInfo';
import Step4AppointmentDetails from './components/Step4AppointmentDetails';
import Step5InsuranceContact from './components/Step5InsuranceContact';
import ProgressBar from './components/ProgressBar';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [patientData, setPatientData] = useState({
    isReturning: null,
    patientId: '',
    name: '',
    dob: '',
    address: '',
    phone: '',
    email: '',
    allergies: [],
    otherAllergy: '',
    medications: '',
    conditions: '',
    surgeries: '',
    appointmentDate: '',
    appointmentTime: '',
    department: '',
    reasonForVisit: '',
    insuranceProvider: '',
    policyNumber: '',
    copay: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    confirmed: false
  });

  const updatePatientData = (field, value) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitCheckIn = () => {
    alert('Check-in completed successfully!\n\nPatient: ' + patientData.name + '\nAppointment: ' + patientData.appointmentDate + ' at ' + patientData.appointmentTime);
    // Reset form
    setCurrentStep(1);
    setPatientData({
      isReturning: null,
      patientId: '',
      name: '',
      dob: '',
      address: '',
      phone: '',
      email: '',
      allergies: [],
      otherAllergy: '',
      medications: '',
      conditions: '',
      surgeries: '',
      appointmentDate: '',
      appointmentTime: '',
      department: '',
      reasonForVisit: '',
      insuranceProvider: '',
      policyNumber: '',
      copay: '',
      emergencyName: '',
      emergencyRelation: '',
      emergencyPhone: '',
      confirmed: false
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PatientLookup
          patientData={patientData}
          updatePatientData={updatePatientData}
          nextStep={nextStep}
        />;
      case 2:
        return <Step2PersonalInfo
          patientData={patientData}
          updatePatientData={updatePatientData}
          nextStep={nextStep}
          prevStep={prevStep}
        />;
      case 3:
        return <Step3MedicalInfo
          patientData={patientData}
          updatePatientData={updatePatientData}
          nextStep={nextStep}
          prevStep={prevStep}
        />;
      case 4:
        return <Step4AppointmentDetails
          patientData={patientData}
          updatePatientData={updatePatientData}
          nextStep={nextStep}
          prevStep={prevStep}
        />;
      case 5:
        return <Step5InsuranceContact
          patientData={patientData}
          updatePatientData={updatePatientData}
          prevStep={prevStep}
          submitCheckIn={submitCheckIn}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏥 Sunrise Hospital</h1>
        <h2>Patient Check-In System</h2>
      </header>

      <ProgressBar currentStep={currentStep} totalSteps={5} />

      <div className="form-container">
        {renderStep()}
      </div>

      <footer className="App-footer">
        <p>Sunrise Hospital - Leading Healthcare Provider</p>
        <p>Designed for fast, accurate patient check-in</p>
      </footer>
    </div>
  );
}

export default App;
