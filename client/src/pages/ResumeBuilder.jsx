 import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react'
import ProjectForm from '../Components/ProjectForm';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import ResumePreview from '../Components/ResumePreview'
import TemplateSelector from '../Components/TemplateSelector'
import ColorPicker from '../Components/ColorPicker'
import ProfessionalSummaryForm from '../Components/ProfessionalSummaryForm';
import ExperienceForm from '../Components/ExperienceForm';
import PersonalInfoForm from '../Components/PersonalInfoForm';
import EducationForm from '../Components/EducationForm';
import SkillsForm from '../Components/SkillsForm';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';

const ResumeBuilder = () => {
    const { resumeId } = useParams();
    const { token } = useSelector(state => state.auth);
    const [resumeData, setResumeData] = useState({
        _id: '',
        title: '',
        personal_info: {},
        professional_summary: "",
        experience: [],
        education: [],
        project: [],
        skills: [],
        template: "classic",
        accent_color: "#3B82F6",
        public: false,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadExistingResume = async () => {
        if (!resumeId || !token) {
            setError("Invalid session or resume ID");
            setIsLoading(false);
            return;
        }
        try {
            const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
                headers: { Authorization: token }
            });
            if (data.resume) {
                setResumeData(data.resume);
                document.title = data.resume.title || "Resume Builder";
            } else {
                setError("Resume not found");
            }
        } catch (error) {
            console.error("Load resume error:", error);
            toast.error(error?.response?.data?.message || "Failed to load resume");
            setError("Failed to load resume. Please check if backend is running.");
        } finally {
            setIsLoading(false);
        }
    };

    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [removeBackground, setRemoveBackground] = useState(false);

    const sections = [
        { id: "personal", name: "Personal Info", icon: User },
        { id: "summary", name: "Summary", icon: FileText },
        { id: "experience", name: "Experience", icon: Briefcase },
        { id: "education", name: "Education", icon: GraduationCap },
        { id: "projects", name: "Projects", icon: FolderIcon },
        { id: "skills", name: "Skills", icon: Sparkles },
    ]

    const activeSection = sections[activeSectionIndex]

    useEffect(() => {
        loadExistingResume();
    }, [resumeId, token]);

    const changeResumeVisibility = async () => {
        try {
            const formData = new FormData()
            formData.append("resumeId", resumeId)
            formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))
            const { data } = await api.put('/api/resumes/update', formData, {
                headers: {
                    Authorization: token
                }
            })
            setResumeData({ ...resumeData, public: !resumeData.public })
            toast.success(data.message)
        } catch (error) {
            console.error("Error changing visibility:", error)
            toast.error("Failed to change resume visibility")
        }
    }

    const handleShare = () => {
        const frontendUrl = window.location.href.split('/app/')[0];
        const resumeUrl = frontendUrl + '/view/' + resumeId;
        if (navigator.share) {
            navigator.share({ url: resumeUrl, text: "My Resume" })
        } else {
            alert('Share not supported on this browser.')
        }
    }

    const downloadResume = () => {
        window.print();
    }

    const saveResume = async () => {
        try {
            let updatedResumeData = structuredClone(resumeData)

            // remove image from updatedResumeData
            if (typeof resumeData.personal_info.image === 'object') {
                delete updatedResumeData.personal_info.image
            }

            const formData = new FormData();
            formData.append("resumeId", resumeId)
            formData.append('resumeData', JSON.stringify(updatedResumeData))
            removeBackground && formData.append("removeBackground", "yes");
            typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image)

            const { data } = await api.put('/api/resumes/update', formData, {
                headers: {
                    Authorization: token
                }
            })

            setResumeData(data.resume)
            toast.success(data.message)
        } catch (error) {
            console.error("Error saving resume:", error)
            toast.error("Failed to save resume")
        }
    }

    return (
        <>
            {isLoading ? (
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-lg text-gray-600">Loading resume...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-12">
                    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl text-red-500">!</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Resume Not Found</h1>
                        <p className="text-gray-600 mb-8">{error}</p>
                        <div className="space-y-3">
                            <Link
                                to="/app"
                                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 text-center"
                            >
                                Go to Dashboard
                            </Link>
                            <button
                                onClick={loadExistingResume}
                                className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='max-w-7xl mx-auto px-4 pb-8'>
                        <div className='grid lg:grid-cols-12 gap-8'>
                            {/* Left panel - Form */}
                            <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
                                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
                                    {/* progress bar using activeSectionIndex */}
                                    <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
                                    <hr className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000" style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }} />

                                    {/* section Navigation */}
                                    <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                                        <div></div>
                                        <div className='flex items-center gap-2'>
                                            {activeSectionIndex !== 0 && (
                                                <button type="button" onClick={() => setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'>
                                                    <ChevronLeft className="size-4" /> Previous
                                                </button>
                                            )}
                                            <button type="button" onClick={() => {
                                                if (activeSectionIndex < sections.length - 1) {
                                                    setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1))
                                                }
                                            }}
                                                className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50 cursor-not-allowed'}`}
                                                disabled={activeSectionIndex === sections.length - 1}>
                                                Next <ChevronRight className="size-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        <TemplateSelector selectedTemplate={resumeData.template} onSelectTemplate={(template) => setResumeData(prev => ({ ...prev, template }))} />
                                        <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                                    </div>

                                    {/* Form content */}
                                    <div className='space-y-6'>
                                        {activeSection.id === 'personal' && (
                                            <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                                                removeBackground={removeBackground}
                                                setRemoveBackground={setRemoveBackground} />
                                        )}

                                        {activeSection.id === 'summary' && (
                                            <ProfessionalSummaryForm data={resumeData.professional_summary}
                                                onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setResumeData} />
                                        )}

                                        {activeSection.id === 'experience' && (
                                            <ExperienceForm data={resumeData.experience}
                                                onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
                                        )}

                                        {activeSection.id === 'education' && (
                                            <EducationForm data={resumeData.education}
                                                onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
                                        )}

                                        {activeSection.id === 'projects' && (
                                            <ProjectForm data={resumeData.project}
                                                onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
                                        )}

                                        {activeSection.id === 'skills' && (
                                            <SkillsForm data={resumeData.skills}
                                                onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
                                        )}

                                        <button onClick={() => { toast.promise(saveResume(), { loading: 'Saving...', success: 'Saved!', error: 'Failed to save' }) }} className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm font-medium'>
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Right panel - preview */}
                            <div className='lg:col-span-7 max-lg:mt-6'>
                                <div className='relative w-full'>
                                    <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2 z-10'>
                                        {resumeData.public && (
                                            <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
                                                <Share2Icon className='size-4' /> Share
                                            </button>
                                        )}
                                        <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors'>
                                            {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
                                            {resumeData.public ? 'Public' : 'Private'}
                                        </button>
                                        <button onClick={downloadResume} className='flex items-center p-2 px-6 gap-2 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
                                            <DownloadIcon className='size-4' /> Download
                                        </button>
                                    </div>
                                </div>
                                <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ResumeBuilder