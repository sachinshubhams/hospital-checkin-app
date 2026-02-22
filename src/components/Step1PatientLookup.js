import React, { useState } from 'react';

function Step1PatientLookup({ patientData, updatePatientData, nextStep }) {
  const [searchId, setSearchId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Mock patient database
  const mockPatients = {
    'P123456': {
      name: 'John Smith',
      dob: '1985-05-15',
      address: '123 Main St, Seattle, WA 98101',
      phone: '206-555-1234',
      email: 'john.smith@email.com',
      allergies: ['Penicillin'],
      medications: 'Lisinopril 10mg daily',
      conditions: 'Hypertension',
      surgeries: 'Appendectomy (2010)',
      insuranceProvider: 'Blue Cross Blue Shield',
      policyNumber: 'BC12345678',
      copay: '25',
      emergencyName: 'Jane Smith',
      emergencyRelation: 'Spouse',
      emergencyPhone: '206-555-5678'
    },
    'P789012': {
      name: 'Maria Garcia',
      dob: '1990-12-20',
      address: '456 Oak Ave, Seattle, WA 98102',
      phone: '206-555-9876',
      email: 'maria.garcia@email.com',
      allergies: ['Latex', 'Peanuts'],
      medications: 'None',
      conditions: 'None',
      surgeries: 'None',
      insuranceProvider: 'Aetna',
      policyNumber: 'AE98765432',
      copay: '30',
      emergencyName: 'Carlos Garcia',
      emergencyRelation: 'Father',
      emergencyPhone: '206-555-4321'
    }
  };

  const handleReturningSelection = (isReturning) => {
    updatePatientData('isReturning', isReturning);
    setErrorMessage('');
  };

  const handleSearch = () => {
    const patient = mockPatients[searchId];
    if (patient) {
      // Load patient data
      updatePatientData('patientId', searchId);
      Object.keys(patient).forEach(key => {
        updatePatientData(key, patient[key]);
      });
      setErrorMessage('');
      nextStep();
    } else {
      setErrorMessage('Patient ID not found. Please check and try again or register as new patient.');
    }
  };

  const handleNewPatient = () => {
    updatePatientData('isReturning', false);
    updatePatientData('patientId', 'NEW');
    nextStep();
  };

  return (
    <div className="step-container">
      <h3>Step 1: Patient Lookup</h3>

      <div className="form-group">
        <label className="question-label">Have you visited Sunrise Hospital before?</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="returning"
              checked={patientData.isReturning === true}
              onChange={() => handleReturningSelection(true)}
            />
            <span>Yes, I'm a returning patient</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="returning"
              checked={patientData.isReturning === false}
              onChange={() => handleReturningSelection(false)}
            />
            <span>No, this is my first visit</span>
          </label>
        </div>
      </div>

      {patientData.isReturning === true && (
        <div className="search-section">
          <div className="form-group">
            <label>Enter Patient ID:</label>
            <div className="search-input-group">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                placeholder="P123456"
                className="input-field"
              />
              <button onClick={handleSearch} className="btn-primary">
                Search
              </button>
            </div>
            <p className="help-text">
              💡 Try: P123456 or P789012 (demo patients)
            </p>
          </div>
          {errorMessage && (
            <div className="error-message">
              ⚠️ {errorMessage}
            </div>
          )}
        </div>
      )}

      {patientData.isReturning === false && (
        <div className="new-patient-section">
          <p className="info-text">
            Welcome! We'll collect your information to create a new patient record.
          </p>
          <button onClick={handleNewPatient} className="btn-primary">
            Continue as New Patient
          </button>
        </div>
      )}
    </div>
  );
}

export default Step1PatientLookup;
