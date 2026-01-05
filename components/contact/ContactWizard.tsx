/**
 * Contact Wizard Component
 * Multi-step contact form with animated transitions
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactFormData, contactFormSchema } from '@/lib/validations/contact';
import { SuccessState } from './SuccessState';
import { ErrorState } from './ErrorState';

// Step components (we'll create these next)
import { StepName } from './steps/StepName';
import { StepEmail } from './steps/StepEmail';
import { StepReason } from './steps/StepReason';
import { StepMessage } from './steps/StepMessage';

type WizardState = 'form' | 'submitting' | 'success' | 'error';

const TOTAL_STEPS = 4;

export function ContactWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardState, setWizardState] = useState<WizardState>('form');
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState<{ name: string; messageId: string } | null>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  const formData = watch();

  // Navigation functions
  const goToNextStep = async () => {
    const fieldsByStep: Record<number, keyof ContactFormData> = {
      1: 'name',
      2: 'email',
      3: 'reason',
      4: 'message',
    };

    const field = fieldsByStep[currentStep];
    const isStepValid = await trigger(field);

    if (isStepValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Form submission
  const onSubmit = async (data: ContactFormData) => {
    setWizardState('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message');
      }

      // Success
      setSuccessData({
        name: data.name,
        messageId: result.messageId,
      });
      setWizardState('success');
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
      setWizardState('error');
    }
  };

  // Reset wizard
  const resetWizard = () => {
    reset();
    setCurrentStep(1);
    setWizardState('form');
    setErrorMessage('');
    setSuccessData(null);
  };

  // Retry submission
  const retrySubmission = () => {
    setWizardState('form');
    setErrorMessage('');
  };

  // Render success state
  if (wizardState === 'success' && successData) {
    return (
      <SuccessState
        name={successData.name}
        messageId={successData.messageId}
        onClose={resetWizard}
      />
    );
  }

  // Render error state
  if (wizardState === 'error') {
    return (
      <ErrorState
        error={errorMessage}
        onRetry={retrySubmission}
        onClose={resetWizard}
      />
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index + 1 === currentStep
                ? 'w-8 bg-primary'
                : index + 1 < currentStep
                ? 'w-2 bg-accent-green'
                : 'w-2 bg-surface-border'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>

      {/* Step Counter */}
      <div className="mb-4 text-center font-mono text-sm text-text-tertiary">
        Step {currentStep} of {TOTAL_STEPS}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <StepName
              key="step-1"
              register={register}
              error={errors.name?.message}
              value={formData.name}
              onNext={goToNextStep}
            />
          )}

          {currentStep === 2 && (
            <StepEmail
              key="step-2"
              register={register}
              error={errors.email?.message}
              value={formData.email}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          )}

          {currentStep === 3 && (
            <StepReason
              key="step-3"
              value={formData.reason}
              error={errors.reason?.message}
              onChange={(value) => {
                setValue('reason', value, { shouldValidate: true });
                setTimeout(goToNextStep, 300); // Auto-advance after selection
              }}
              onBack={goToPreviousStep}
            />
          )}

          {currentStep === 4 && (
            <StepMessage
              key="step-4"
              register={register}
              error={errors.message?.message}
              value={formData.message}
              onBack={goToPreviousStep}
              isSubmitting={wizardState === 'submitting'}
            />
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
