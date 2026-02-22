import React from 'react';

function ProgressBar({ currentStep, totalSteps }) {
  const steps = [
    { number: 1, label: 'Patient Lookup' },
    { number: 2, label: 'Personal Info' },
    { number: 3, label: 'Medical Info' },
    { number: 4, label: 'Appointment' },
    { number: 5, label: 'Insurance & Contact' }
  ];

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="progress-steps">
        {steps.map(step => (
          <div
            key={step.number}
            className={`progress-step ${currentStep >= step.number ? 'active' : ''} ${currentStep === step.number ? 'current' : ''}`}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>

      <div className="step-indicator">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}

export default ProgressBar;
