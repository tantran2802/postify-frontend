import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Constants
const MAX_TOPIC_DESCRIPTION_LENGTH = 2000;

export default function Posting()
{
    const handleImageChange = (index, event) => {
        const newImageUrls = [...posting.images];
        newImageUrls[index] = event.target.value;
        setPosting({ ...posting, images: newImageUrls });
      };
      const addImageInput = () => {
        setPosting({ ...posting, images: [...posting.images, ''] });
      };
    const [posting, setPosting] = useState({content: '', images: ['']})
    const navigateTo = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatePost = {...posting, [name]: value };
        setPosting(updatePost);
    }
    const deleteImageInput = (index) => {
      const newImages = [...posting.images];
      newImages.splice(index, 1);
      setPosting({ ...posting, images: newImages });
    };
    function handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:3001/posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(posting)
        }).then(async (data) => {
          const returnedData = await data.json();
          if(returnedData.statusCode === 401) navigateTo('/unauthorized')
          else{
            navigateTo('/posts');
          }
        })
        .catch((e) => console.log(e))
    }
    return(
      <div className="login-container">
        <h2>Posting</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Post</label>
            <textarea type="text" 
            name="content" 
            maxLength={MAX_TOPIC_DESCRIPTION_LENGTH} 
            rows={2} 
            cols={40} 
            value={posting.content} 
            onChange={handleChange} 
            required />
            <div>
              {posting.images.map((imageUrl, index) => (
                <div key={index}>
                  <label htmlFor={`image-${index}`}>Image URL:</label>
                  <input type="text" 
                  id={`image-${index}`} 
                  value={imageUrl} 
                  onChange={(e) => handleImageChange(index, e)} />
                  <div>
                  {index > 0 && (
                    <button className="bg-danger" type="button" onClick={() => deleteImageInput(index)}>Delete</button>
                    )}
                    </div>
                </div>
              ))}
      <button className="bg-info" type="button" onClick={addImageInput}>Add Image URL</button>
            </div>
          </div>
                <button type="submit">Submit</button>
        </form>
      </div>
    );
}