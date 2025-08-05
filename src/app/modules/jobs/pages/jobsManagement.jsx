import React, {useEffect, useRef, useState} from 'react';
import CreateJobPopup from '../popups/CreateJobPopup';
import {Button} from 'primereact/button';
import {supabase} from "../../../../supabaseClient.js";
import Loading from '../../../components/loading.jsx';
import {Image} from 'primereact/image';
import {useNavigate} from 'react-router-dom';
import {OverlayPanel} from 'primereact/overlaypanel';
import EditJobPopup from "@/app/modules/jobs/popups/EditJobPopup.jsx";
import {formatDate} from "@/app/services/helpers.js";
import DeleteJobPopup from "@/app/modules/jobs/popups/DeleteJobPopup.jsx";

function JobsManagement() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const navigate = useNavigate();
    const op = useRef(null);

    const getJobs = async () => {
        try {
            setLoading(true);
            const {data, error} = await supabase
                .from('job_positions')
                .select('*')
                .order('created_at', { ascending: false });
            setJobs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getJobs();
    }, []);

    const goToJob = (id) => {
        navigate(`/job-details/` + id);
    };

    const toggleMenu = (e, id) => {
        e.stopPropagation();
        setSelectedJobId(id);
        op.current.toggle(e);
    };

    return (
        <div className="p-4 relative h-[calc(100vh_-_var(--header-height))]">
            {loading ? <Loading/> : ''}

            <CreateJobPopup
                trigger={<Button className="h-10 text-white" label='Add Job' icon='pi pi-plus' severity='info'/>}
                data={{}}
                onCreate={getJobs}
            />

            <div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-8 mt-4">
                {jobs.map((data, index) => (
                    <div key={index} className="relative">
                        <div
                            onClick={() => goToJob(data?.id)}
                            className="flex min-h-[94px] gap-2 border border-transparent hover:border hover:border-blue-300 rounded-md bg-gray-900 cursor-pointer p-2"
                        >
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

                        <div className="absolute top-2 right-2 z-10">
                            <span
                                className="cursor-pointer"
                                onClick={(e) => toggleMenu(e, data?.id)}
                            >
                                <i className="pi pi-ellipsis-v"></i>
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <OverlayPanel ref={op} className="p-2">
                <EditJobPopup
                    trigger={
                        <span
                            className="flex items-center gap-2 hover:bg-red-500 p-2 rounded-md cursor-pointer"
                        >
                            <i className="pi pi-pencil"></i>
                            Edit
                        </span>
                    }
                    props={{id: selectedJobId}}
                    onCreate={getJobs}
                />
                <DeleteJobPopup
                    trigger={
                        <span
                            className="flex items-center gap-2 hover:bg-red-500 p-2 rounded-md cursor-pointer"
                        >
                            <i className="pi pi-trash"></i>
                            Delete
                        </span>
                    }
                    props={{id: selectedJobId}}
                    onCreate={getJobs}
                />
            </OverlayPanel>
        </div>
    );
}

export default JobsManagement;
