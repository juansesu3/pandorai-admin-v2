import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '@/animattions/loading.json';

const LoadingPosting = () => {
    return (
        <div className="flex items-center justify-center h-full w-full dark:bg-base-100 bg-white">
            <div className="p-6 max-w-sm mx-auto dark:bg-base-200  bg-white rounded-xl shadow-md space-y-4 border border-gray-100 dark:border-base-100">
                <div className="flex flex-col items-center space-y-4">
                    <Lottie
                        animationData={loadingAnimation}
                        loop={true}
                        style={{ height: 200, width: 200 }}
                    />
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-purple-500">Subiendo tu publicación...</h3>
                        <p className="text-gray-400">Esto puede tardar unos segundos. Por favor, espera.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingPosting;

