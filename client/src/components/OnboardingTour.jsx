import React, { useState, useEffect } from 'react';

const OnboardingTour = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const steps = [
    {
      target: '.navbar',
      content: 'This is your navigation bar for accessing different sections.',
      position: 'bottom'
    },
    {
      target: '.dashboard-title',
      content: 'Welcome to your personalized open-source dashboard!',
      position: 'bottom'
    },
    {
      target: '.search-section',
      content: 'Filter issues by skills or difficulty here.',
      position: 'bottom'
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isRunning) {
      // Highlight the target element
      const targetElement = document.querySelector(steps[currentStep].target);
      targetElement?.classList.add('ring-4', 'ring-blue-500', 'rounded-lg');
      
      return () => {
        targetElement?.classList.remove('ring-4', 'ring-blue-500', 'rounded-lg');
      };
    }
  }, [currentStep, isRunning]);

  if (!isRunning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-md mx-4">
        <p className="mb-4 text-gray-800">{steps[currentStep].content}</p>
        <div className="flex justify-between">
          {currentStep > 0 && (
            <button 
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded-md ml-auto"
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;