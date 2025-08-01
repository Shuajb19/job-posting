import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Password} from "primereact/password";
import {supabase} from "../../../supabaseClient.js";

function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const {signUp} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!name || !surname || !email || !password || !confirmPassword) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const userData = {
                first_name: name,
                last_name: surname,
                full_name: `${name} ${surname}`,
                role: 'user'
            };

            const {data: session, error} = await signUp(email, password, userData);

            if (error) {
                setError(error.message);
            } else {
                setSuccess('Registration successful! Please check your email for verification.');

                setName('');
                setSurname('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold">
                    Welcome, sign up
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm/6 font-medium">Name</label>
                            <InputText id="name"
                                       className="w-full" value={name} placeholder="Name"
                                       onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="surname"
                                   className="text-sm/6 font-medium">Surname</label>
                            <InputText id="surname" value={surname} placeholder="Surname"
                                       onChange={(e) => setSurname(e.target.value)} className="w-full"/>
                        </div>

                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm/6 font-medium">Email
                            address</label>
                        <InputText id="email" type="email" name="email"
                                   className="w-full" value={email} placeholder="Email"
                                   onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm/6 font-medium">Password</label>
                        <InputText id="password" type="password" placeholder="Password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="text-sm/6 font-medium">Confirm Password</label>
                        <InputText id="confirmPassword" type="password" placeholder="Confirm password"
                                   value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <p className="text-green-500">{success}</p>
                        <p className="text-red-500">{error}</p>
                    </div>
                    <div>
                        <Button type="submit"
                                className="flex justify-center w-full" severity="success">Sign up
                        </Button>
                    </div>
                    <div>
                        <p className="text-sm/6 font-medium text-center">
                            Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;