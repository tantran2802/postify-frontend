import {useState, useEffect, Fragment} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
export default function Image(){
    const [image, setImage] = useState({});
    const { postId } = useParams();
    const { imageId } = useParams();
    const [updateImage, setUpdateImage] = useState({url: ''});
    const navigateTo = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateImage({...updateImage, [name]: value });
    }
    function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:3001/posts/${postId}/images/${imageId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(updateImage)
        }).then(() => {
            navigateTo(-1)
        })
        .catch((e) => console.log(e))
    }
    function fetchImage(){
        fetch(`http://localhost:3001/posts/${postId}/images/${imageId}`,
          {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          }).then(async (data) => {
            const dataObtained = await data.json();
            setImage(dataObtained);
            // let newURL =
            //     window.location.origin + '/p' + postId + '/images/' + imageId;
            //     window.history.replaceState(null, "", newURL);
          }).catch (e => console.log(e))
      };
      useEffect(() => {
        fetchImage()
      })
      return(
        <Fragment>
            <div key={image.id}>
                <img className='img-fluid rounded' src={image.urlAddress} alt='images'/>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                    value={updateImage.url} 
                    onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </Fragment>
      )
}