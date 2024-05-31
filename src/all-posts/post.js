import {useState, useEffect, Fragment} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
// Constants
const MAX_TOPIC_DESCRIPTION_LENGTH = 2000;
export default function Post(){
    const [post, setPost] = useState();
    const { postId } = useParams();
    const [editPost, setEditPost] = useState({content: ''})
    const navigateTo = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatePost = {...editPost, [name]: value };
        setEditPost(updatePost);
    }
    function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:3001/posts/${postId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(editPost)
        }).then((data) => {
            navigateTo(-1)
            console.log(data)
        })
        .catch((e) => console.log(e))
    }
    function fetchPost(){
        fetch(`http://localhost:3001/posts/${postId}`,
          {
            method: 'GET'
          }).then(async (data) => {
            const dataObtained = await data.json();
            setPost(dataObtained);
            // let newURL = window.location.origin + '/posts/' + post.id;
            // window.history.replaceState(null, "", newURL);
          }).catch (e => console.log(e))
      };
      useEffect(() => {
        fetchPost()
      })
      return (
        <Fragment>
            {post && <div className='container-fluid p-5'>
                <h1 className='text-primary text-center' key={post.id}>{post.content.split('\n')[0]}</h1>
                <p className='text-center'>{post.content}</p>
                <time>{post.createdDate}</time>
                {post.images && (
                    <div className='container'>
                    <div className='row'>
                    {post.images.map((image, index) => {
                        return (
                        <Link key={index} to={`/posts/${post.id}/images/${image.id}`} className='col-md'>
                            <img className='img-fluid rounded' src={image.urlAddress} alt='images'/>
                        </Link>
                        )})}
                    </div>
                    </div>)}
                    <h2>Edit Post Content</h2>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Post</label>
                        <textarea type="text" 
                        name="content" 
                        maxLength={MAX_TOPIC_DESCRIPTION_LENGTH} 
                        rows={2} 
                        cols={40} 
                        value={editPost.content} 
                        onChange={handleChange} 
                        required />
                        </div>
                        <button type="submit">Submit</button>
                        </form>
            </div>}
        </Fragment>
      )
}