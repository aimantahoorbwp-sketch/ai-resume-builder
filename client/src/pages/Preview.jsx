import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../configs/api';
import ResumePreview from '../Components/ResumePreview';
import Navbar from '../Components/Navbar';
import { ArrowLeftIcon, Loader } from 'lucide-react';

const Preview = () => {
    const { resumeId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [resumeData, setResumeData] = useState(null);
    const loadResume = async () => {         
       try {
        const {data} = await api.get(`/api/resumes/public/${resumeId}`)
        setResumeData(data.resume)
       } catch (error) {
        console.log(error.message);
       }finally{
        setIsLoading(false)
       }
    };
    useEffect(() => {
        loadResume();
    }, [resumeId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!resumeData) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
                <p className="text-center text-4xl md:text-6xl text-slate-400 font-medium mb-8">Resume not found</p>
                <a href="/" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-3 ring-1 ring-green-400 ring-offset-2 flex items-center transition-all duration-200">
                    <ArrowLeftIcon className="mr-2 size-5" />
                    Go to Home Page
                </a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">{resumeData.title || 'Untitled Resume'}</h1>
                    <button 
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        📄 Download PDF
                    </button>
                </div>
                <ResumePreview 
                    data={resumeData} 
                    template={resumeData.template} 
                    accentColor={resumeData.accent_color} 
                />
            </div>
        </div>
    );
};

export default Preview;

