import React, { useState } from "react";
import { FileText, Loader2, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    const { token } = useSelector(state => state.auth)
    const [isGenerating,setIsGenerating] = useState(false)

    const generateSummary = async () => {
        try {
        setIsGenerating(true)
        const prompt = `enhance my professional summary "${data}"`;
        const  response = await api.post('/api/ai/enhance-pro-sum', {userContent: prompt}, { headers: {
            Authorization: token
        }})    
        setResumeData(prev => ({...prev, Professional_summary: response.data.enhancedContent}))
        } catch (error)
        {
         toast.error(error?.response?.data?.message || error.message)   
        }
        finally{
            setIsGenerating(false)
        }
    }
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <FileText className="size-5" />
                        Professional Summary
                    </h3>
                    <p className="text-sm text-gray-500">Write a brief summary of your professional background</p>
                </div>
                <button disabled={isGenerating} onClick={generateSummary} className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                {isGenerating ? (<Loader2 className="size-4 animate-spin"/>) : (
                     <Sparkles className="size-3" />
                )}
                   {isGenerating ? "Enhancing..." :"AI Enhance"}
                </button>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Summary
                </label>
                <textarea
                    value={data || ""}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm resize-none"
                    placeholder="Write a compelling professional summary that highlights your skills, experience, and career objectives..."
                />
                <p className="text-xs text-gray-500">
                    {data?.length || 0} characters
                </p>
            </div>
        </div>
    );
};

export default ProfessionalSummaryForm;

