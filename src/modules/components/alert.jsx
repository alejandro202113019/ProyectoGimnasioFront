import React, { useEffect } from 'react';

export default function Alert({ alert1, mensaje, change }) {
    useEffect(() => {
        // Only set up the timeout if the alert is visible
        if (alert1) {
            const timer = setTimeout(() => {
                // Automatically close the alert after 5 seconds
                change();
            }, 5000);

            // Clean up the timer if the component unmounts or alert changes
            return () => clearTimeout(timer);
        }
    }, [alert1, change]);

    if (alert1) {
        return (
            <div role="alert" className="mb-4 relative p-4 text-sm text-white bg-indigo-500 rounded-lg shadow-lg flex justify-between items-center w-11/12 transition-all transform hover:scale-105">
                <span>{mensaje}</span>
                <button
                    onClick={change}
                    className="flex items-center justify-center transition-all w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 absolute top-2 right-2"
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5 text-white"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
        );
    } else {
        return null;
    }
}
