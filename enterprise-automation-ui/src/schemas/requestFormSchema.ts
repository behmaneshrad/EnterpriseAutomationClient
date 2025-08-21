import * as z from "zod";

export const requestFormSchema = z.object({
    title: z
    .string()
    .min(5,{message: 'عنوان حداقل باید ۵ کاراکتر باشد.'})
    .max(100, {message: 'عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد.'}),
    description: z
    .string()
    .min(20, {message: 'شرح باید حداقل ۲۰ کاراکتر داشته باشد.'})
    .max(500, {message: 'شرح نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد.'}),
    workflowId: z.string().min(1, "انتخاب فرایند الزامی است")
});

export type RequestFormSchema = z.infer<typeof requestFormSchema>;