import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageDropComponent = ({ onFileChange }) => {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        const mappedFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));

        setFiles(mappedFiles);

        onFileChange(mappedFiles.length > 0 ? mappedFiles[0] : null);
    }, [onFileChange]);


    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false
    });

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div {...getRootProps()} style={{ border: '2px solid #80808030', padding: '20px', cursor: 'pointer', width: "30%" }} className='d-flex justify-content-center' >
            <input {...getInputProps()} />
            {/* <InsertPhotoIcon className='image_drop' /> */}
            {files.length > 0 && (
                <aside style={{ marginTop: '20px' }}>
                    {files.map(file => (
                        <img src={file.preview} key={file.name} style={{ width: '100%', maxHeight: '300px' }} alt="Preview" />
                    ))}
                </aside>
            )}
        </div>
    );
};

export default ImageDropComponent;
