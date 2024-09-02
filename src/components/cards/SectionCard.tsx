import React from 'react';

interface SectionCardProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ header, content }) => {
  return (
    <div className="bg-off-white rounded-xl p-6">
      <div>{header}</div>
      <div>{content}</div>
    </div>
  );
};

export default SectionCard;