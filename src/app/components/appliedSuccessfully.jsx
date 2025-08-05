import {Image} from "primereact/image";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import successImage from '../../assets/successfully-applied.png';

function AppliedSuccessfully() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/jobs');
        }, 3000);
    }, [])

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <Image src={successImage} className="w-100" />
            <p className="text-4xl text-gray-200">Your application was successful</p>
        </div>
    )
}

export default AppliedSuccessfully;