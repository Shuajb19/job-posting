import React, {useState} from 'react';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {supabase} from "../../../supabaseClient.js";
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../../context/AuthContext.jsx";
import {Link} from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('shuajb@gmail.com');
    const [password, setPassword] = useState('Shuajb123!');
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false)
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setErrorMsg(error.message);
                setLoading(false)
            } else {
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/jobs');
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }


    };

    return (
        <div className="h-screen flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold">
                    Welcome back, sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm/6 font-medium">Email address</label>
                        <InputText id="email" type="email" name="email"
                                   className="w-full" value={email} placeholder="Email"
                                   onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password"
                               className="text-sm/6 font-medium">Password</label>
                        <InputText id="password" type="password" placeholder="Password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                    </div>

                    <div>
                        <Button type="submit"
                                className="flex justify-center w-full" severity="success"
                                disabled={loading}>{loading ? 'Sign in...' : 'Sign in'}
                        </Button>
                    </div>
                    <div>
                        <p className="text-sm/6 font-medium text-center">
                            Don't have an account? <Link to="/register" className="text-blue-400">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
