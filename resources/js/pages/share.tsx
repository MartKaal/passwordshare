import React from 'react'

export default function Share() {

    return (
        <>
            <div className='flex bg-slate-900 flex-col items-center justify-center min-h-screen'>
                <h1 className='text-6xl font-black mb-2 text-cyan-400'>PasswordShare</h1>
                <p className='text-lg text-white'>Deel jouw eigen wachtwoord veilig en eenvoudig met anderen.</p>
                <div className="mb-6">
                    <input 
                        type="text" id="default-input" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Voer je wachtwoord in'
                    />
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Genereer link</button>
                </div>
            </div>            
        </>
    )
}