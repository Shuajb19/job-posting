import * as yup from "yup";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from 'primereact/fileupload';
import Tiptap from "../../../../Tiptap";
import { InputTextarea } from 'primereact/inputtextarea';

export const formSchema = yup.object({
    position_title: yup.string().required("Position title is required"),
    company_name: yup.string().required("Company name is required"),
    deadline: yup.date().required("Deadline is required"),
    job_description: yup.string().required("Job description is required"),
    location: yup.string().required("Location is required"),
    category: yup.string().required("Category is required"),
    employment_type: yup.string().required("Employment type is required"),
    image_url: yup.string(),
});

export const formFields = [
    {name: "position_title", label: "Position Title", component: InputText, placeholder: "Enter position title"},
    {name: "company_name", label: "Company Name", component: InputText, placeholder: "Enter company name"},
    {name: "deadline", label: "Deadline", component: Calendar, placeholder: "Select deadline"},
    {name: "location", label: "Location", component: InputText, placeholder: "Enter location"},
    {name: "category", label: "Category", component: InputText, placeholder: "Enter category"},
    {
        name: "employment_type",
        label: "Employment Type",
        component: Dropdown,
        options: [
            {label: "Full-time", value: "Full-time"},
            {label: "Part-time", value: "Part-time"},
        ],
        optionLabel: "label",
        placeholder: "Select employment type",
    },
    {
        name: "job_description",
        label: "Job Description",
        component: Tiptap,
        placeholder: "Enter job description",
        classes: 'col-span-full'
    },
    {name: 'image_url', label: 'Company Logo', component: FileUpload, classes: 'col-span-full'}
];

export const applicationFormSchema = yup.object({
    name: yup.string().required("Name is required"),
    surname: yup.string().required("Surname is required"),
    email: yup.string().required("Email is required"),
    gender: yup.string().required("Gender is required"),
    date_of_birth: yup.date().required("Birthdate is required"),
    city: yup.string().required("City is required"),
    phone_number: yup.string().required("Phone number is required"),
    language: yup.string().required("Language is required"),
    cv_url: yup.string().required("CV is required"),
    additional_data: yup.string(),
});

export const applicationFormFields = [
    {name: "name", label: "Name", component: InputText, placeholder: "Enter name"},
    {name: "surname", label: "Surname", component: InputText, placeholder: "Enter surname"},
    {name: "email", label: "Email", component: InputText, placeholder: "Enter email"},
    {
        name: "gender",
        label: "Gender",
        component: Dropdown,
        options: [
            {label: "Male", value: "Male"},
            {label: "Female", value: "Female"},
        ],
        optionLabel: "label",
        placeholder: "Select gender",
    },
    {name: "date_of_birth", label: "Date of birth", component: Calendar, placeholder: "Enter date of birth"},
    {name: "city", label: "City", component: InputText, placeholder: "Enter city name"},
    {name: "phone_number", label: "Phone number", component: InputText, placeholder: "Enter phone number"},
    {name: "language", label: "Language", component: InputText, placeholder: "Enter foreign language spoken"},
    {name: "additional_data", label: "Additional data", component: InputTextarea, placeholder: "Write additional data", classes: 'w-full col-span-full'},
    {name: "cv_url", label: "CV", component: FileUpload, placeholder: "Enter CV", classes: 'col-span-full'}
];