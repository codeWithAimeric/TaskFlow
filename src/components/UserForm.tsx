import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

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
        <div className="flex justify-center items-center h-[80vh]"> 
            <div className="w-full max-w-md"> 
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <h2 className="text-center text-2xl font-bold mb-4">Connexion</h2> 

                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email..." 
                        className="w-full border border-green-500 p-2 rounded-md"
                    />

                    <Input
                        type="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe..." 
                        className="w-full border p-2 rounded-md"
                    />

                    <Button
                        variant="destructive"
                        size="lg"
                        className="w-full" 
                    >
                        Se connecter
                    </Button>
                </form>
            </div>
        </div>

    );
};
