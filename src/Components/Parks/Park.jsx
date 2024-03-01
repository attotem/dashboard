import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditPark from './EditPark';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Park = ({ brandLogo, brandName, distance, name, id, SuperUser }) => {
    const navigate = useNavigate();

    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <div className="col">



            <div className="card" onClick={() => setShowEditModal(true)}>
                <div className="card-body text-center">
                    <img src={brandLogo} alt={brandName} className="card-img-top" style={{ width: '50px' }} />
                    <h5 className="card-title">{name}</h5>
                </div>
            </div>
            {showEditModal && <EditPark parkId={id} show={showEditModal} onHide={() => setShowEditModal(false)} />}

        </div>
    );
};

export default Park;
