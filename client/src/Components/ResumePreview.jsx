import React from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import MinimalImageTemplate from './templates/MinimalImageTemplate';

const ResumePreview = ({ data, template, accentColor }) => {
    const renderTemplate = () => {
        switch (template) {
            case 'modern':
                return <ModernTemplate data={data} accentColor={accentColor} />;
            case 'minimal':
                return <MinimalTemplate data={data} accentColor={accentColor} />;
            case 'minimal-image':
                return <MinimalImageTemplate data={data} accentColor={accentColor} />;
            case 'classic':
            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-[210/297] A4-page">
                {renderTemplate()}
            </div>
        </div>
    );
};

export default ResumePreview;

