// اینترفیس برای اقدام در تایم‌لاین
export interface Action {
  phase: string;
  performer: string;
  actionType: string;
  timestamp: string;
}

// اینترفیس برای مرحله در Stepper
export interface WorkflowStep {
  stepId: number; 
  stepName: string; 
  status: 'pending' | 'approved' | 'rejected' | string;
  approverRole: string;
}

// اینترفیس برای جزئیات کامل درخواست
export interface RequestDetails{
  requestId: number;
  title: string;
  description: string;
  currentStatus: string;
  currentStep: number;
  workflow: {
    workflowDefinitionId: number;
    workflowSteps: {
      stepId: number;
      stepName: string;
      approverRole: string;
    }[];
  };
  actions: Action[];
}