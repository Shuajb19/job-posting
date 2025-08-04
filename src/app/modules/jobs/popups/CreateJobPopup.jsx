import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema, formFields } from '../models/models';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { supabase } from "../../../../supabaseClient.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { uploadFileToStorage } from "../../../services/supabaseStorage.js";

const CreateJobPopup = ({ trigger, data }) => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      position_title: "Frontend Developer",
      company_name: "Google",
      deadline: new Date(),
      job_description: "",
      location: "Prishtine",
      category: "IT",
      employment_type: "Full-time",
      image_url: "",
    },
  });

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

  const onSubmit = async (params) => {
    try {
      const { data, error } = await supabase
        .from('job_positions')
        .insert([
          {
            ...params,
            created_by: user.id
          },
        ])

      if (error) {
        console.error('Insert error:', error)
      } else {
        console.log('Job created:', data)
        close();
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const open = () => setVisible(true);
  const close = () => {
    reset();
    setUploadedFile(null);
    setVisible(false);
  }

  const triggerWithClick = React.cloneElement(trigger, {
    onClick: open,
  });

  return (
    <>
      {triggerWithClick}

      <Dialog className="w-1/2" header="Create Job" visible={visible} onHide={close} draggable={false} modal>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-8">

            {formFields.map(({ name, label, component: Component, options, placeholder, classes }) => (
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
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={close} severity='secondary' label='Close' />
            <Button 
              type='submit' 
              severity='info' 
              label='Save' 
              disabled={isUploading}
            />
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default CreateJobPopup;
