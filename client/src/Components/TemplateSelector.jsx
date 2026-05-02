import React from 'react';

const templates = [
  { id: 'classic', name: 'Classic', image: '/template-classic.png' },
  { id: 'modern', name: 'Modern', image: '/template-modern.png' },
  { id: 'minimal', name: 'Minimal', image: '/template-minimal.png' },
  { id: 'professional', name: 'Professional', image: '/template-professional.png' }
];

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          onClick={() => onSelectTemplate(template.id)}
          className={`p-4 border-2 rounded-lg cursor-pointer transition ${
            selectedTemplate === template.id
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-green-300'
          }`}
        >
          <div className="aspect-[3/4] bg-gray-200 rounded mb-2"></div>
          <p className="text-center font-medium">{template.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;

