import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "../../../../supabaseClient.js";
import { Image } from 'primereact/image';
import moment from "moment/moment.js";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

function JobDetails() {
    const { id } = useParams()
    const [jobs, setJobs] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

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

    const goToApplicationPage = (id) => {
        navigate('/application-page/' + id)
    }
    
    return (
        <div className="flex p-2 px-8">
            <div className="">
                <div className="fixed h-[300px] w-[300px] border border-gray-700 rounded-md p-2">
                    <Image src={jobs?.image_url} preview />
                </div>
            </div>
            <div className="flex flex-col gap-10 ml-[320px] mb-10">
                <div className="">
                    <h1 className="text-4xl font-bold text-gray-100">{jobs?.position_title}</h1>
                    <p className="text-gray-400">Deadline: {moment(jobs?.deadline).format('DD/MM/YYYY')}</p>
                    <p className="text-gray-400">Location: {jobs?.location}</p>
                </div>
                <div className="text-gray-200" dangerouslySetInnerHTML={{ __html: jobs?.job_description }}></div>
                <div className="w-40">
                    <Button severity="info" className="flex justify-center w-full" onClick={() => goToApplicationPage(jobs?.id)}>Apply</Button>
                </div>
            </div>
        </div>
    )
}

export default JobDetails;