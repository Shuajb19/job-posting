import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {supabase} from "../../../../supabaseClient.js";
import {Image} from 'primereact/image';
import moment from "moment/moment.js";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/app/context/AuthContext.jsx";
import {formatDate} from "@/app/services/helpers.js";
import Loading from "@/app/components/loading.jsx";

function JobDetails() {
    const {isAuthenticated} = useAuth();
    const {id} = useParams()
    const [jobs, setJobs] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const getJobById = async () => {
        try {
            setLoading(true)
            const {data, error} = await supabase
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
        if (isAuthenticated) {
            navigate(`/application-page/${id}`)
        } else {
            localStorage.setItem('url', `/application-page/${id}`);
            navigate('/login')
        }
    }

    return (
        <div className="max-lg:flex max-lg:flex-col max-lg:items-center max-lg:gap-10 p-2 px-8 h-[calc(100vh_-_var(--header-height))]">
            {loading ? <Loading/> : ''}
            <div className="min-lg:fixed h-[300px] w-[300px] border border-gray-700 rounded-md p-2">
                <Image src={jobs?.image_url} preview/>
            </div>
            <div className="flex flex-col gap-10 min-lg:ml-[320px]">
                <div className="">
                    <h1 className="text-4xl font-bold text-gray-100">{jobs?.position_title}</h1>
                    <p className="text-gray-400">Deadline: {formatDate(jobs?.deadline)}</p>
                    <p className="text-gray-400">Location: {jobs?.location}</p>
                </div>
                <div className="text-gray-200" dangerouslySetInnerHTML={{__html: jobs?.job_description}}></div>
                <div className="w-40 mb-10">
                    <Button severity="info" className="flex justify-center w-full"
                            onClick={() => goToApplicationPage(jobs?.id)}>Apply</Button>
                </div>
            </div>
        </div>
    )
}

export default JobDetails;