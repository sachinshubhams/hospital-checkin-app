import React from 'react';

function Step3MedicalInfo({ patientData, updatePatientData, nextStep, prevStep }) {
  const commonAllergies = ['Penicillin', 'Latex', 'Peanuts', 'Shellfish'];

  const handleAllergyChange = (allergy) => {
    const currentAllergies = patientData.allergies || [];
    if (currentAllergies.includes(allergy)) {
      // Remove allergy
      updatePatientData('allergies', currentAllergies.filter(a => a !== allergy));
    } else {
      // Add allergy
      updatePatientData('allergies', [...currentAllergies, allergy]);
    }
  };

  const handleNext = () => {
    // Optional validation - medical info can be empty for some patients
    nextStep();
  };

  return (
    <div className="step-container">
      <h3>Step 3: Medical Information</h3>

      {patientData.isReturning && (
        <p className="info-text">
          ℹ️ Please verify your medical information and update if anything has changed.
        </p>
      )}

      <div className="form-group">
        <label>Do you have any allergies?</label>
        <div className="checkbox-group">
          {commonAllergies.map(allergy => (
            <label key={allergy} className="checkbox-label">
              <input
                type="checkbox"
                checked={(patientData.allergies || []).includes(allergy)}
                onChange={() => handleAllergyChange(allergy)}
              />
              <span>{allergy}</span>
            </label>
          ))}
        </div>

        <div className="form-group">
          <label>Other Allergies:</label>
          <input
            type="text"
            value={patientData.otherAllergy}
            onChange={(e) => updatePatientData('otherAllergy', e.target.value)}
            placeholder="Enter other allergies"
            className="input-field"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Current Medications:</label>
        <textarea
          value={patientData.medications}
          onChange={(e) => updatePatientData('medications', e.target.value)}
          placeholder="List your current medications and dosages"
          className="textarea-field"
          rows="3"
        />
        <p className="help-text">Example: Lisinopril 10mg daily, Aspirin 81mg daily</p>
      </div>

      <div className="form-group">
        <label>Pre-existing Conditions:</label>
        <textarea
          value={patientData.conditions}
          onChange={(e) => updatePatientData('conditions', e.target.value)}
          placeholder="List any pre-existing medical conditions"
          className="textarea-field"
          rows="3"
        />
        <p className="help-text">Example: Hypertension, Diabetes Type 2, Asthma</p>
      </div>

      <div className="form-group">
        <label>Previous Surgeries:</label>
        <textarea
          value={patientData.surgeries}
          onChange={(e) => updatePatientData('surgeries', e.target.value)}
          placeholder="List any previous surgeries and dates"
          className="textarea-field"
          rows="3"
        />
        <p className="help-text">Example: Appendectomy (2010), Knee surgery (2015)</p>
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

export default Step3MedicalInfo;
