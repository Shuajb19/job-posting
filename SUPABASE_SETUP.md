# Supabase Storage Setup for File Uploads

This guide will help you set up Supabase Storage for file uploads in your job posting application.

## Prerequisites

1. A Supabase project (create one at https://supabase.com)
2. Your Supabase URL and anon key

## Environment Variables

Make sure you have the following environment variables in your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Storage Bucket Setup

### 1. Create Storage Bucket

1. Go to your Supabase dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Name it `job_images`
5. Make it **public** (so uploaded images can be accessed via URL)
6. Click **Create bucket**

### 2. Configure Storage Policies

You need to set up Row Level Security (RLS) policies for your storage bucket.

#### For Public Read Access:
```sql
-- Allow public read access to job_images bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'job_images');
```

#### For Authenticated Upload Access:
```sql
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'job_images' AND auth.role() = 'authenticated');
```

#### For User-Specific Delete Access:
```sql
-- Allow users to delete their own uploaded files
CREATE POLICY "Users can delete own files" ON storage.objects 
FOR DELETE USING (bucket_id = 'job_images' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### 3. Database Table Setup

Make sure your `job_positions` table has an `image_url` column:

```sql
-- Add image_url column to job_positions table
ALTER TABLE job_positions ADD COLUMN image_url TEXT;
```

## Features Implemented

### File Upload Component
- **Location**: `src/app/modules/jobs/popups/CreateJobPopup.jsx`
- **Features**:
  - Drag and drop file upload
  - Image preview after upload
  - File size validation (5MB limit)
  - Loading states during upload
  - Error handling

### Storage Utility Functions
- **Location**: `src/app/services/supabaseStorage.js`
- **Functions**:
  - `uploadFileToStorage()` - Upload files to Supabase storage
  - `deleteFileFromStorage()` - Delete files from storage
  - `getFileUrl()` - Get public URL for files

### Form Integration
- **Location**: `src/app/modules/jobs/models/models.jsx`
- **Features**:
  - Required field validation for image upload
  - Integration with form validation schema

## Usage

1. **Upload Image**: Users can drag and drop or click to select an image
2. **Preview**: After upload, a preview thumbnail is shown
3. **Validation**: The form requires an image to be uploaded before submission
4. **Storage**: Images are stored in the `job_images` bucket under `job-logos/` folder

## File Structure

```
job-logos/
├── 1703123456789-abc123.jpg
├── 1703123456790-def456.png
└── ...
```

## Security Considerations

1. **File Type Validation**: Only image files are accepted
2. **File Size Limits**: 5MB maximum file size
3. **Unique Filenames**: Generated using timestamp and random string
4. **Public Access**: Images are publicly accessible for display
5. **Authentication**: Only authenticated users can upload files

## Troubleshooting

### Common Issues:

1. **Upload Fails**: Check if the storage bucket exists and policies are set correctly
2. **Images Not Displaying**: Verify the bucket is set to public
3. **Permission Errors**: Ensure RLS policies are properly configured
4. **CORS Issues**: Check if your Supabase project allows your domain

### Debug Steps:

1. Check browser console for error messages
2. Verify environment variables are set correctly
3. Test storage bucket access in Supabase dashboard
4. Check network tab for failed requests

## Additional Features to Consider

1. **Image Compression**: Add client-side image compression before upload
2. **Multiple File Upload**: Allow uploading multiple images
3. **Image Cropping**: Add image cropping functionality
4. **File Type Icons**: Show different icons for different file types
5. **Upload Progress**: Add progress bar for large files 