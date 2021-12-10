import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const [title, setTitle] = useState('');
    const [foto, setFoto] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/products/${id}`,{
            title : title,
            foto : foto,
            deskripsi : deskripsi
        });
        navigate("/");
    }
    useEffect(() => {
        getProductById();
    }, []);

    

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setTitle(response.data.title);
        setFoto(response.data.Foto);
        setDeskripsi(response.data.deskripsi);
    }

    return (
        <div>
            <form onSubmit={ updateProduct }>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input 
                    class="form-control" 
                    type="text" 
                    placeholder="Masukan Title"
                    value={ title }
                    onChange={ (e) => setTitle(e.target.value)}    
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Foto</label>
                <input 
                    class="form-control" 
                    type="file" 
                    placeholder="Masukan Foto"
                    value={ foto }
                    onChange={ (e) => setFoto(e.target.value)}    
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Deskripsi</label>
                <input 
                    class="form-control" 
                    type="text" 
                    placeholder="Masukan Deskripsi"
                    value={ deskripsi }
                    onChange={ (e) => setDeskripsi(e.target.value)}
                />
            </div>

            <div className="mb-3">
            <button className="btn btn-warning">Edit</button>
            </div>

            </form>
        </div>
    )
}

export default EditProduct
