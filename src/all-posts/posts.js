import { Fragment, useEffect} from 'react';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
export default function Posts() {
    const [posts, setPosts] = useState([]);
    function fetchPosts(){
        fetch('http://localhost:3001/posts/all',
          {
            method: 'GET'
          }).then(async (data) => {
            const dataObtained = await data.json();
            setPosts(dataObtained);
          }).catch (e => console.log(e))
      };
      useEffect(() => {
        fetchPosts()
      }, [])
    return (
        <Fragment>
          {posts.length === 0 ? 
            (<Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>) : 
          (posts.map((item) => {
            return (<div className='container-fluid p-5' key={item.id}>
              <h1 className='text-primary text-center' key={item.id}>{item.content.split('\n')[0]}</h1>
              <p className='text-center'>{item.content}</p>
              <time>{item.createdDate}</time>
              {item.images && (
                <div className='container'>
                  <div className='row'>
                  {item.images.map((image, index) => {
                    return (
                      <div key={index} className='col-md'>
                        <img className='img-fluid rounded' src={image.urlAddress} alt='images'/>
                      </div>
                    )})}
                  </div>
                </div>)}
            </div>)}))
          }
        </Fragment>
    );
  }