import {z} from 'zod';

export const workflowStepSchema = z.object({
    stepName: z.string().min(3, 'نام مرحله باید حداقل ۳ کاراکتر باشد.'),
    approverRole: z.string().min(1, 'نقش تائید کننده باید مشخص شود.')
});

export const workflowSchema = z.object({
    workflowName: z.string().min(5, 'نام فرآیند باید حداقل ۵ کاراکتر باشد.'),
    steps: z.array(workflowStepSchema).min(1, 'حداقل یک مرحله برای فرآیند باید تعریف شود.'),
});

export type WorkflowFormSchema = z.infer<typeof workflowSchema>;