import React from 'react';

function Step2PersonalInfo({ patientData, updatePatientData, nextStep, prevStep }) {
  const handleNext = () => {
    // Validation
    if (!patientData.name || !patientData.dob || !patientData.phone) {
      alert('Please fill in all required fields (Name, Date of Birth, Phone)');
      return;
    }

    // Validate phone format
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(patientData.phone)) {
      alert('Please enter phone in format: xxx-xxx-xxxx');
      return;
    }

    // Validate email format if provided
    if (patientData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(patientData.email)) {
        alert('Please enter a valid email address');
        return;
      }
    }

    // Validate date of birth is in the past
    const dobDate = new Date(patientData.dob);
    const today = new Date();
    if (dobDate >= today) {
      alert('Date of Birth must be in the past');
      return;
    }

    nextStep();
  };

  const formatPhone = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format as xxx-xxx-xxxx
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    updatePatientData('phone', formatted);
  };

  return (
    <div className="step-container">
      <h3>Step 2: Personal Information</h3>

      {patientData.isReturning && (
        <p className="info-text">
          ℹ️ Please verify your information and update if anything has changed.
        </p>
      )}

      <div className="form-group">
        <label>Full Name: <span className="required">*</span></label>
        <input
          type="text"
          value={patientData.name}
          onChange={(e) => updatePatientData('name', e.target.value)}
          placeholder="John Smith"
          className="input-field"
          required
        />
      </div>

      <div className="form-group">
        <label>Date of Birth: <span className="required">*</span></label>
        <input
          type="date"
          value={patientData.dob}
          onChange={(e) => updatePatientData('dob', e.target.value)}
          className="input-field"
          max={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          value={patientData.address}
          onChange={(e) => updatePatientData('address', e.target.value)}
          placeholder="123 Main St, Seattle, WA 98101"
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>Phone Number: <span className="required">*</span></label>
        <input
          type="tel"
          value={patientData.phone}
          onChange={handlePhoneChange}
          placeholder="206-555-1234"
          className="input-field"
          maxLength="12"
          required
        />
        <p className="help-text">Format: xxx-xxx-xxxx</p>
      </div>

      <div className="form-group">
        <label>Email Address:</label>
        <input
          type="email"
          value={patientData.email}
          onChange={(e) => updatePatientData('email', e.target.value)}
          placeholder="john.smith@email.com"
          className="input-field"
        />
      </div>

      <div className="button-group">
        <button onClick={prevStep} className="btn-secondary">
          ← Back
        </button>
        <button onClick={handleNext} className="btn-primary">
          Next →
        </button>
      </div>
    </div>
  );
}

export default Step2PersonalInfo;
