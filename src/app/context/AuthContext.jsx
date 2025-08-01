import React, {createContext, useState, useContext, useEffect} from 'react';
import {supabase} from '../../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const {data: {session}} = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        const {data: {subscription}} = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return {data, error};
    };

    const logout = async () => {
        const {error} = await supabase.auth.signOut();
        return {error};
    };

    const signUp = async (email, password, userData) => {
        const {data, error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: userData
            }
        });
        return {data, error};
    };

    const value = {
        user,
        loading,
        login,
        logout,
        signUp,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
