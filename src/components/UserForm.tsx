import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export const UserForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            setError(error.message);
        } else {
            setMessage('Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.');
        }
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message);
        } else {
            setMessage('Connexion réussie !');
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}

            <form onSubmit={handleLogin}>
                <h2>Connexion</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded-md mb-2"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded-md mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                    Se connecter
                </button>
            </form>
        </div>
    );
};
