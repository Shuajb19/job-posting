import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {supabase} from "@/supabaseClient.js";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/app/context/AuthContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {formatDate} from "@/app/services/helpers.js";
import {Skeleton} from "primereact/skeleton";
import Loading from "@/app/components/loading.jsx";

function Candidates() {
    const [candidates, setCandidates] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const getCandidates = async () => {
        try {
            setLoading(true)
            const {data, error} = await supabase
                .from('applications')
                .select(`
      *,
      job_positions (
        position_title
      )
    `);

            setCandidates(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCandidates();
    }, [])

    const cvIcon = (rowData) => {
        return (
            <span
                className="cursor-pointer hover:text-blue-400"
                onClick={() => window.open(rowData?.cv_url, '_blank')}
            >
            <i className="pi pi-file"></i>
        </span>
        );
    };

    const formatDateCell = (rowData) => {
        return (
            <p>{formatDate(rowData?.date_of_birth)}</p>
        )
    }

    return (
        <div className="relative px-10 py-2 h-[calc(100vh_-_var(--header-height))]">
            {loading ? <Loading/> : ''}
            <p className="text-3xl font-bold pb-2">Candidates</p>
            <DataTable value={candidates} tableStyle={{minWidth: '50rem', borderRadius: '10px'}} className="">
                <Column field="job_positions.position_title" header="Position title" body={loading ? <Skeleton/> : ''}></Column>
                <Column field="name" header="Name" body={loading ? <Skeleton/> : ''}></Column>
                <Column field="surname" header="Surname" body={loading ? <Skeleton/> : ''}></Column>
                <Column field="email" header="Email" body={loading ? <Skeleton/> : ''}></Column>
                <Column field="gender" header="Gender" body={loading ? <Skeleton/> : ''}></Column>
                <Column header="Date of birth" body={loading ? <Skeleton/> : formatDateCell}></Column>
                <Column field="city" header="City" body={loading ? <Skeleton/> : ''}></Column>
                <Column field="phone_number" header="Phone number" body={loading ? <Skeleton/> : ''}></Column>
                <Column field="language" header="Language" body={loading ? <Skeleton/> : ''}></Column>
                <Column field="additional_data" header="Additional data" body={loading ? <Skeleton/> : ''}></Column>
                <Column header="CV" body={loading ? <Skeleton/> : cvIcon}></Column>
            </DataTable>
        </div>
    )
}

export default Candidates;