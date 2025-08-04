import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {applicationFormFields, applicationFormSchema} from "@/app/modules/jobs/models/models.jsx";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from "primereact/fileupload";
import {Button} from "primereact/button";
import React, {useEffect, useState} from "react";
import {uploadFileToStorage} from "@/app/services/supabaseStorage.js";
import {useAuth} from "@/app/context/AuthContext.jsx";
import {Image} from "primereact/image";
import {supabase} from "@/supabaseClient.js";
import {useParams} from "react-router-dom";

function ApplicationPage() {
    const { id } = useParams()
    const [jobs, setJobs] = useState(null)
    const [loading, setLoading] = useState(true)
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(applicationFormSchema),
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            gender: "",
            birth_date: new Date(),
            city: "",
            phone_number: "",
            language: "",
            cv: "",
            additional_data: ""
        },
    });

    const getJobById = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('job_positions')
                .select('*')
                .eq('id', id)
                .single();

            setJobs(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getJobById();
    }, [])

    const uploadImage = async (file) => {
        try {
            setIsUploading(true);

            const result = await uploadFileToStorage(file);

            if (result.success) {
                setValue('image_url', result.url);
                setUploadedFile({ name: file.name, url: result.url });

                console.log('File uploaded successfully:', result.url);
                return result.url;
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        } finally {
            setIsUploading(false);
        }
    };

    const onSubmit = (param) => {
        console.log(param)
    }

    return (
        <div className="flex p-2 px-8">
            <div className="fixed">
                <div className="h-[300px] w-[300px] border border-gray-700 rounded-md p-2">
                    <Image src={jobs?.image_url} preview />
                </div>
                <p className="mt-2 text-gray-400 w-[300px]">You're applying for <strong>{jobs?.position_title}</strong> at <strong>{jobs?.company_name}</strong></p>
            </div>
            <div className="w-full ml-[320px] mb-10">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))] gap-8">
                        {applicationFormFields.map(({ name, label, component: Component, options, placeholder, classes }) => (
                            <div key={name} className={classes} >
                                <label className="block font-medium mb-1">{label}</label>
                                <Controller
                                    name={name}
                                    control={control}
                                    render={({ field }) => (
                                        <Component
                                            {...field}
                                            className={classes ? classes : 'w-full'}
                                            options={options}
                                            value={field.value}
                                            onChange={(e) =>
                                                Component === Dropdown ? field.onChange(e.value) : field.onChange(e.value ?? e)
                                            }
                                            onSelect={Component === FileUpload ? async (e) => {
                                                const file = e.files[0];
                                                if (file) {
                                                    try {
                                                        await uploadImage(file);
                                                    } catch (error) {
                                                        console.error('Upload failed:', error);
                                                    }
                                                }
                                            } : undefined}
                                            placeholder={placeholder}
                                            accept="image/*"
                                            maxFileSize={5000000}
                                            customUpload={true}
                                            auto
                                            emptyTemplate={<p className="m-0">Drag and drop an image here to upload.</p>}
                                        />
                                    )}
                                />

                                {errors[name] && (
                                    <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
                                )}

                                {name === 'image_url' && uploadedFile && (
                                    <div className="mt-2">
                                        <p className="text-sm text-green-600">✓ {uploadedFile.name} uploaded successfully</p>
                                        {uploadedFile.url && (
                                            <img
                                                src={uploadedFile.url}
                                                alt="Uploaded preview"
                                                className="mt-2 w-20 h-20 object-cover rounded"
                                            />
                                        )}
                                    </div>
                                )}

                                {name === 'image_url' && isUploading && (
                                    <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-start gap-2 mt-6">
                        <Button
                            type='submit'
                            severity='info'
                            label='Apply'
                            disabled={isUploading}
                        />
                    </div>
                </form>
            </div>
        </div>

    )
}

export default ApplicationPage