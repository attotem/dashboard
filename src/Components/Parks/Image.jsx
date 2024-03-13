import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('data', JSON.stringify({ key: 'value' }));

        try {
            const response = await fetch('https://ttestt.shop/cars/api/parks/image/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error uploading image');
        }
    };

    return (
        <Container>
            <Form onSubmit={handleUpload}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Select image</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Upload
                </Button>
            </Form>
        </Container>
    );
}

export default ImageUpload;
