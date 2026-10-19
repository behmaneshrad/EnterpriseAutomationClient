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

// --- Per-type schemas used by RequestFormLeave / RequestFormEquipment ---
// The file input is registered with react-hook-form, so it yields a FileList.
const attachment = z
    .custom<FileList>((v) => v == null || (typeof FileList !== "undefined" && v instanceof FileList))
    .optional()
    .refine((files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE, {
        message: "حجم فایل نباید بیشتر از 5 مگابایت باشد.",
    })
    .refine((files) => !files || files.length === 0 || ACCEDPTED_FILE_TYPES.includes(files[0].type), {
        message: "فرمت فایل باید pdf یا تصویر (jpg, png) باشد.",
    });

export const requestFormSchemaLeave = z
    .object({
        startDate: z.string().nonempty("تاریخ شروع الزامی است"),
        endDate: z.string().nonempty("تاریخ پایان الزامی است"),
        description: z.string().max(500, { message: 'شرح نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد.' }).optional(),
        file: attachment,
    })
    .refine((d) => !d.startDate || !d.endDate || new Date(d.startDate) <= new Date(d.endDate), {
        message: "تاریخ پایان باید بعد از تاریخ شروع باشد.",
        path: ["endDate"],
    });

export const requestFormSchemaEquipment = z.object({
    equipmentName: z.string().min(2, { message: "نام تجهیز الزامی است" }).max(100),
    quantity: z.number({ message: "تعداد باید عدد باشد" }).int().min(1, { message: "حداقل تعداد ۱ است" }),
    description: z.string().max(500, { message: 'شرح نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد.' }).optional(),
    file: attachment,
});

export type RequestFormLeaveSchema = z.infer<typeof requestFormSchemaLeave>;
export type RequestFormEquipmentSchema = z.infer<typeof requestFormSchemaEquipment>;
