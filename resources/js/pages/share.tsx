import PasswordTool from '@/components/PasswordTool';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

type PasswordData = {
    password: string;
    tries: number;
    expiresIn?: number;
};

export default function Share() {
    const [password, setPassword] = useState<PasswordData>({ password: '', tries: 1, expiresIn: 24 });
    const [receivedPassword, setReceivedPassword] = useState('');
    const [url, setUrl] = useState('');
    const [mode, setMode] = useState('input');

    const { uuid } = usePage().props as { uuid?: string };

    const handleSubmit = () => {
        axios
            .post('/share', {
                password: password.password,
                tries: password.tries,
                expires_in: password.expiresIn,
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

    useEffect(() => {
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
    }, [uuid]);

    return (
        <>
            {mode === 'input' && (
                <PasswordTool
                    title="Password Sharing Tool"
                    subtitle="Deel jouw eigen wachtwoorden veilig met anderen mensen zonder erover na te hoeven denken."
                >
                    <div className="flex w-full gap-4">
                        <input
                            type="text"
                            id="default-input"
                            className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-violet-600 focus:ring-0 focus:outline-none"
                            placeholder="Voer hier je wachtwoord in"
                            value={password.password}
                            onChange={(e) => setPassword({ ...password, password: e.target.value })}
                        />
                        <select
                            name="tries"
                            id=""
                            className="block rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-violet-600 focus:ring-0 focus:outline-none"
                            value={password.tries}
                            onChange={(e) => setPassword({ ...password, tries: Number(e.target.value) })}
                        >
                            <option value="1">1 keer</option>
                            <option value="3">3 keer</option>
                            <option value="5">5 keer</option>
                        </select>

                        <select
                            name="tries"
                            id=""
                            className="block rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-violet-600 focus:ring-0 focus:outline-none"
                            value={password.expiresIn}
                            onChange={(e) => setPassword({ ...password, expiresIn: Number(e.target.value) })}
                        >
                            <option value="24">24 uur</option>
                            <option value="48">48 uur</option>
                            <option value="72">72 uur</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        className="me-2 mb-2 w-1/3 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:cursor-pointer hover:bg-violet-700 focus:ring-1 focus:outline-none"
                        onClick={handleSubmit}
                    >
                        Creëer veilige link
                    </button>
                </PasswordTool>
            )}

            {mode === 'generated' && (
                <PasswordTool title="Uw link is gegenereerd!" subtitle="De link is geldig voor 24 uur en kan eenmalig gebruikt worden.">
                    <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900"
                        value={url}
                        disabled
                    />
                    <button
                        type="button"
                        className="w-1/3 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 focus:ring-1"
                        onClick={handleCopy}
                    >
                        Kopieer naar klembord
                    </button>
                </PasswordTool>
            )}

            {mode === 'opened' && (
                <PasswordTool title="Wachtwoord Ontvangen" subtitle="Je hebt een wachtwoord ontvangen.">
                    <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900"
                        value={receivedPassword}
                        disabled
                    />
                    <button
                        type="button"
                        className="w-1/3 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 focus:ring-1"
                        onClick={handleCopy}
                    >
                        Kopieer naar klembord
                    </button>
                </PasswordTool>
            )}
        </>
    );
}
