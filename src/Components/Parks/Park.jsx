import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditPark from './EditPark';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import nophoto from "./nophoto.jpg"

const Park = ({ brandName, name, id, image, onParkUpdated }) => {
    const navigate = useNavigate();

    const [showEditModal, setShowEditModal] = useState(false);



    return (
        <div className="col">
            <div className="card" onClick={() => setShowEditModal(true)}>
                <div className="card-body text-center">
                    {image == null ?
                        <div className='image_container'>
                            <img src={nophoto} alt={brandName} className="card-img-top" />

                        </div>
                        :
                        <div className='image_container'>
                            <img src={image} alt={brandName} className="card-img-top" />

                        </div>
                    }


                    <h5 className="card-title">{name}</h5>
                </div>
            </div>
            {showEditModal && <EditPark onParkUpdated={onParkUpdated} parkId={id} show={showEditModal} onHide={() => setShowEditModal(false)} />}

        </div>
    );
};

export default Park;
