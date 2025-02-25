// src/shared/ImageContext.js
import React, { createContext, useState, useContext} from 'react';

const ImageContext = createContext();

export const useImageContext = () => {
    return useContext(ImageContext);
};

export const ImageProvider = ({ children }) => {
  // Load the initial image list from localStorage
    const initialImageList = JSON.parse(localStorage.getItem('imageList')) || [];
    
    const [imageList, setImageList] = useState(initialImageList);

    const addImage = (imageURL) => {
        const updatedList = [...imageList, imageURL];
        setImageList(updatedList);
        
        // Save the updated list to localStorage
        localStorage.setItem('imageList', JSON.stringify(updatedList));
    };

    return (
        <ImageContext.Provider value={{ imageList, addImage }}>
            {children}
        </ImageContext.Provider>
    );
};
