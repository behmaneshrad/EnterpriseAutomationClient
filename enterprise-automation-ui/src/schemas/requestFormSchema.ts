import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 مگ
const  ACCEDPTED_FILE_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
];

export const requestFormSchema = z.object({
    title: z
    .string()
    .min(5,{message: 'عنوان حداقل باید ۵ کاراکتر باشد.'})
    .max(100, {message: 'عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد.'}),
    description: z
    .string()
    .min(20, {message: 'شرح باید حداقل ۲۰ کاراکتر داشته باشد.'})
    .max(500, {message: 'شرح نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد.'}),
    workflowId: z.string().min(1, "انتخاب فرایند الزامی است"),

    startDate: z.string().nonempty("تاریخ شروع الزامی است"),
    endDate: z.string().nonempty("تاریخ پایان الزامی است"),
    file: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: "حجم فایل نباید بیشتر از 5 مگابایت باشد.",
    })
    .refine((file) => !file || ACCEDPTED_FILE_TYPES.includes(file.type), {
        message: "باشد pdf یا  (jpg, png) فرمت فایل باید "
    })
})
.refine(
    (data) => {
        if (!data.startDate || !data.endDate) return true;
        const start = new Date(data.startDate);
        const end = new Date(data.endDate);
        return start <= end;
    },
    {
        message: "تاریخ پایان باید بعد از تاریخ شروع باشد.",
        path: ["endDate"],
    }
);


export type RequestFormSchema = z.infer<typeof requestFormSchema>;