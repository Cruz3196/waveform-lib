import React, { createContext, useState, useContext, useEffect } from 'react';
import { storage } from '../../../features/firebase.config'; 
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

const ImageContext = createContext();

export const useImageContext = () => useContext(ImageContext);


export const ImageProvider = ({ children }) => {
    const [imageList, setImageList] = useState([]);

  // Fetch images from Firebase Storage on mount
    useEffect(() => {
        const fetchImages = async () => {
            const imageListRef = ref(storage, 'images/');
            const response = await listAll(imageListRef);

            const urls = await Promise.all(
                response.items.map(async (item) => await getDownloadURL(item))
            );

            setImageList(urls);
            localStorage.setItem('imageList', JSON.stringify(urls));
        };

        fetchImages();
    }, []);

  // Add new image URL
    const addImage = (imageURL) => {
        const updatedList = [...imageList, imageURL];
        setImageList(updatedList);
        localStorage.setItem('imageList', JSON.stringify(updatedList));
    };

  // Delete image
    const deleteImage = async (imageURL) => {
        try {
            const imageRef = ref(storage, decodeURIComponent(imageURL.split('/o/')[1].split('?')[0]));
            await deleteObject(imageRef);
            
            const updatedList = imageList.filter((url) => url !== imageURL);
            setImageList(updatedList);
            localStorage.setItem('imageList', JSON.stringify(updatedList));
        } catch (error) {
            console.error("Error deleting image: ", error);
        }
    };

    return (
        <ImageContext.Provider value={{ imageList, addImage, deleteImage }}>
            {children}
        </ImageContext.Provider>
    );
};
