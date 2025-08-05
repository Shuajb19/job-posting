import React, { useEffect, useState } from 'react';
import { supabase } from "../../../../supabaseClient.js";
import Loading from '../../../components/loading.jsx'
import { Image } from 'primereact/image';
import { useNavigate } from 'react-router-dom';
import {formatDate} from "@/app/services/helpers.js";

function Jobs() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const getJobs = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('job_positions')
                .select('*')

            setJobs(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getJobs();
    }, [])

    const goToJob = (id) => {
        navigate(`/job-details/` + id)
    }

    return (
        <div className="p-4 relative h-[calc(100vh_-_var(--header-height))]">
            {loading ? <Loading /> : ''}
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-8 mt-4">
                {jobs.map((data, index) => (
                    <div key={index} onClick={() => goToJob(data?.id)} className="flex min-h-[94px] gap-2 border border-transparent hover:border hover:border-blue-300 rounded-md bg-gray-900 cursor-pointer p-2">
                        <div className="w-[94px]">
                            <img src={data?.image_url} className="w-full h-full object-cover" alt="Image" />
                        </div>
                        <div className="flex flex-col justify-between w-full px-2">
                            <div>
                                <p className="text-[15px] text-gray-200">{data?.position_title}</p>
                                <p className="text-[13px] text-gray-400">{data?.company_name}</p>
                            </div>
                            <div className="flex pt-1 gap-4 text-gray-400">
                                <div className="flex gap-2">
                                    <i className="pi pi-clock"></i>
                                    <p className="text-[12px]">{formatDate(data?.deadline)}</p>
                                </div>
                                <div className="flex gap-2">
                                    <i className="pi pi-map-marker"></i>
                                    <p className="text-[12px]">{data?.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Jobs;