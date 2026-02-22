import React from 'react';

function Step4AppointmentDetails({ patientData, updatePatientData, nextStep, prevStep }) {
  const departments = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'Oncology',
    'Emergency Medicine',
    'Internal Medicine',
    'Surgery',
    'Other'
  ];

  const timeSlots = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleNext = () => {
    // Validation
    if (!patientData.appointmentDate) {
      alert('Please select an appointment date');
      return;
    }

    if (!patientData.appointmentTime) {
      alert('Please select an appointment time');
      return;
    }

    if (!patientData.department) {
      alert('Please select a department');
      return;
    }

    if (!patientData.reasonForVisit) {
      alert('Please enter the reason for your visit');
      return;
    }

    // Validate appointment date is in the future
    const appointmentDate = new Date(patientData.appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointmentDate < today) {
      alert('Appointment date must be today or in the future');
      return;
    }

    nextStep();
  };

  return (
    <div className="step-container">
      <h3>Step 4: Appointment Details</h3>

      <p className="info-text">
        📅 Please provide details about today's appointment
      </p>

      <div className="form-group">
        <label>Appointment Date: <span className="required">*</span></label>
        <input
          type="date"
          value={patientData.appointmentDate}
          onChange={(e) => updatePatientData('appointmentDate', e.target.value)}
          className="input-field"
          min={new Date().toISOString().split('T')[0]}
          required
        />
        <p className="help-text">Must be today or a future date</p>
      </div>

      <div className="form-group">
        <label>Appointment Time: <span className="required">*</span></label>
        <select
          value={patientData.appointmentTime}
          onChange={(e) => updatePatientData('appointmentTime', e.target.value)}
          className="input-field"
          required
        >
          <option value="">Select time...</option>
          {timeSlots.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Department/Specialist: <span className="required">*</span></label>
        <select
          value={patientData.department}
          onChange={(e) => updatePatientData('department', e.target.value)}
          className="input-field"
          required
        >
          <option value="">Select department...</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Reason for Visit: <span className="required">*</span></label>
        <textarea
          value={patientData.reasonForVisit}
          onChange={(e) => updatePatientData('reasonForVisit', e.target.value)}
          placeholder="Please describe the reason for your visit"
          className="textarea-field"
          rows="4"
          required
        />
        <p className="help-text">
          Provide a brief description of your symptoms or reason for appointment
        </p>
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

export default Step4AppointmentDetails;
