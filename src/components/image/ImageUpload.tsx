import React, { useState } from 'react';
import { Icon } from '@/components/icon/icon';

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="relative w-[200px] h-[200px]">
      <label className="w-full h-full rounded-full border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer">
        {image ? (
          <img src={image} alt="Uploaded" className="rounded-full w-full h-full object-cover" />
              ) : (
                      <div className='w-[105px] h-[164px] py-4'>
                          
                      <Icon svg={'camera'} height={100} width={100} />
                      <span>Upload image</span>
                      </div>
        )}
          </label>
      <input
        type="file"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;
