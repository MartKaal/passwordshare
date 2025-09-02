import PasswordTool from '@/components/PasswordTool';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function Share() {
    const [password, setPassword] = useState('');
    const [receivedPassword, setReceivedPassword] = useState('');
    const [url, setUrl] = useState('');
    const [mode, setMode] = useState('input');

    const { uuid } = usePage().props as { uuid?: string };

    const handleSubmit = () => {
        axios
            .post('/share', {
                password,
            })
            .then((res) => {
                setUrl(res.data.link);
                setMode('generated');
            })
            .catch((error) => {});
    };

    const handleCopy = () => {
        if (url) {
            navigator.clipboard.writeText(url);
        }
    };

    if (uuid) {
        axios
            .get(`/api/share/${uuid}`)
            .then((res) => {
                setReceivedPassword(res.data.password);
                setMode('opened');
            })
            .catch((error) => {
                console.error('Error retrieving shared password:', error);
            });
    }

    return (
        <>
            {mode === 'input' && (
                <PasswordTool
                    mode="input"
                    title="Password Sharing Tool"
                    subtitle="Deel jouw eigen wachtwoorden veilig met anderen mensen zonder erover na te hoeven denken."
                    inputValue={password}
                    setInputValue={setPassword}
                    placeholder="Voer je wachtwoord in"
                    buttonText="Genereer link"
                    onButtonClick={handleSubmit}
                />
            )}

            {mode === 'generated' && (
                <PasswordTool
                    mode="generated"
                    title="Uw link is gegenereerd!"
                    subtitle="De link is geldig voor 24 uur en kan eenmalig gebruikt worden."
                    inputValue={url}
                    buttonText="Kopieer naar klembord"
                    onButtonClick={handleCopy}
                />
            )}

            {mode === 'opened' && (
                <PasswordTool
                    mode="opened"
                    title="Wachtwoord Ontvangen"
                    subtitle="Je hebt een wachtwoord ontvangen."
                    inputValue={receivedPassword}
                    buttonText="Kopieer naar klembord"
                    onButtonClick={handleCopy}
                />
            )}
        </>
    );
}
