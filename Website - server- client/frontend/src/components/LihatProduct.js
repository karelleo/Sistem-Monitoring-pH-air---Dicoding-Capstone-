import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LihatProduct = () => {
    const [title, setTitle] = useState('');
    const [foto, setFoto] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const { id } = useParams();

    useEffect(() => {
        getProductById();
    }, []);
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setFoto(base64);
      };
    
      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    };
    const getProductById = async () => {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setTitle(response.data.title);
        setFoto(response.data.Foto);
        setDeskripsi(response.data.deskripsi);
    }

    return (
<div className="container">
            <div className="hahaha">
                <h5>{ title }</h5>
                <img src={ uploadImage } className="featured-image"/>
                <p className="p-article">{ deskripsi }</p>
            </div>
</div>
    )
}

export default LihatProduct
