import React from 'react';

function Step5InsuranceContact({ patientData, updatePatientData, prevStep, submitCheckIn }) {
  const insuranceProviders = [
    'Blue Cross Blue Shield',
    'Aetna',
    'United Healthcare',
    'Cigna',
    'Humana',
    'Medicare',
    'Medicaid',
    'Kaiser Permanente',
    'Other',
    'No Insurance'
  ];

  const relationships = [
    'Spouse',
    'Parent',
    'Child',
    'Sibling',
    'Friend',
    'Other'
  ];

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const handleEmergencyPhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    updatePatientData('emergencyPhone', formatted);
  };

  const handleSubmit = () => {
    // Validation
    if (!patientData.insuranceProvider) {
      alert('Please select an insurance provider');
      return;
    }

    if (patientData.insuranceProvider !== 'No Insurance' && !patientData.policyNumber) {
      alert('Please enter your insurance policy number');
      return;
    }

    if (!patientData.emergencyName) {
      alert('Please provide an emergency contact name');
      return;
    }

    if (!patientData.emergencyPhone) {
      alert('Please provide an emergency contact phone number');
      return;
    }

    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(patientData.emergencyPhone)) {
      alert('Emergency phone must be in format: xxx-xxx-xxxx');
      return;
    }

    if (!patientData.confirmed) {
      alert('Please confirm that all information is accurate');
      return;
    }

    submitCheckIn();
  };

  return (
    <div className="step-container">
      <h3>Step 5: Insurance & Emergency Contact</h3>

      <div className="section-title">Insurance Information</div>

      <div className="form-group">
        <label>Insurance Provider: <span className="required">*</span></label>
        <select
          value={patientData.insuranceProvider}
          onChange={(e) => updatePatientData('insuranceProvider', e.target.value)}
          className="input-field"
          required
        >
          <option value="">Select provider...</option>
          {insuranceProviders.map(provider => (
            <option key={provider} value={provider}>{provider}</option>
          ))}
        </select>
      </div>

      {patientData.insuranceProvider && patientData.insuranceProvider !== 'No Insurance' && (
        <>
          <div className="form-group">
            <label>Policy Number: <span className="required">*</span></label>
            <input
              type="text"
              value={patientData.policyNumber}
              onChange={(e) => updatePatientData('policyNumber', e.target.value)}
              placeholder="BC12345678"
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label>Co-pay Amount: $</label>
            <input
              type="number"
              value={patientData.copay}
              onChange={(e) => updatePatientData('copay', e.target.value)}
              placeholder="25"
              className="input-field"
              min="0"
            />
          </div>
        </>
      )}

      <div className="section-title">Emergency Contact</div>

      <div className="form-group">
        <label>Contact Name: <span className="required">*</span></label>
        <input
          type="text"
          value={patientData.emergencyName}
          onChange={(e) => updatePatientData('emergencyName', e.target.value)}
          placeholder="Jane Smith"
          className="input-field"
          required
        />
      </div>

      <div className="form-group">
        <label>Relationship: <span className="required">*</span></label>
        <select
          value={patientData.emergencyRelation}
          onChange={(e) => updatePatientData('emergencyRelation', e.target.value)}
          className="input-field"
          required
        >
          <option value="">Select relationship...</option>
          {relationships.map(rel => (
            <option key={rel} value={rel}>{rel}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Phone Number: <span className="required">*</span></label>
        <input
          type="tel"
          value={patientData.emergencyPhone}
          onChange={handleEmergencyPhoneChange}
          placeholder="206-555-5678"
          className="input-field"
          maxLength="12"
          required
        />
        <p className="help-text">Format: xxx-xxx-xxxx</p>
      </div>

      <div className="section-title">Review & Confirm</div>

      <div className="review-summary">
        <p><strong>Patient:</strong> {patientData.name || 'N/A'}</p>
        <p><strong>Date of Birth:</strong> {patientData.dob || 'N/A'}</p>
        <p><strong>Appointment:</strong> {patientData.appointmentDate || 'N/A'} at {patientData.appointmentTime || 'N/A'}</p>
        <p><strong>Department:</strong> {patientData.department || 'N/A'}</p>
        <p><strong>Insurance:</strong> {patientData.insuranceProvider || 'N/A'}</p>
      </div>

      <div className="form-group">
        <label className="checkbox-label-large">
          <input
            type="checkbox"
            checked={patientData.confirmed}
            onChange={(e) => updatePatientData('confirmed', e.target.checked)}
          />
          <span>I confirm that all information provided is accurate <span className="required">*</span></span>
        </label>
      </div>

      <div className="button-group">
        <button onClick={prevStep} className="btn-secondary">
          ← Back
        </button>
        <button onClick={handleSubmit} className="btn-success">
          ✓ Complete Check-In
        </button>
      </div>
    </div>
  );
}

export default Step5InsuranceContact;
