import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setImage(file)
            const preview = URL.createObjectURL(file)
            setPreviewUrl(preview)
        }
    }

    const handleRemoveImage = () => {
        setImage(null)
        setPreviewUrl(null)
    }

    return (
        <div className='flex justify-center mb-6'>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />
            {!image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-green-100 rounded-full relative cursor-pointer' onClick={() => inputRef.current.click()}>
                    <LuUser className='text-4xl text-green-600' />
                    <button
                        type='button'
                        className='w-7 h-7 flex items-center justify-center bg-green-600 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-green-700 transition-colors'
                        onClick={(e) => { e.stopPropagation(); inputRef.current.click() }}
                    >
                        <LuUpload size={14} />
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img src={previewUrl} alt="profile photo" className='w-20 h-20 rounded-full object-cover ring-2 ring-green-500' />
                    <button
                        type='button'
                        className='w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-red-600 transition-colors'
                        onClick={handleRemoveImage}
                    >
                        <LuTrash size={14} />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector
