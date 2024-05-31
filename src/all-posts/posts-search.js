import { Fragment} from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function SearchingPost(){
    const [searchPost, setSearchingPost] = useState('');
    const [searchPostReturn, setSearchingPostReturn] = useState([]);
    const navigateTo = useNavigate();
    function handleChangeSearchingPost(e){
        // const { name, value } = e.target;
        const updateSearchingPost = e.target.value;
        setSearchingPost(updateSearchingPost);
    }
    function handleSubmitSearchingPost(e){
        e.preventDefault();
        fetch(`http://localhost:3001/posts/search?keyword=${searchPost}`,
          {
            method: 'GET'
          }).then(async (data) => {
            const dataObtained = await data.json();
            if(dataObtained.statusCode === 400) {
              navigateTo('/not-found');
            }
            else if (dataObtained.statusCode !== 400) setSearchingPostReturn([...dataObtained]);
          })
          .catch (e => console.log(e))
      };
      return(
        <Fragment>
            <div>
                <form onSubmit={handleSubmitSearchingPost}>
                <label>Searching</label>
                <input type="text"
                    value={searchPost}
                    onChange={handleChangeSearchingPost}
                />
                <button type='submit'>Search</button>
                </form>
            </div>
            <div>
              {searchPostReturn &&
                searchPostReturn.map((post, index) => {
                  return (<div key={index}>
                            <h1 key={post.id}>{post.content.split('\n')[0]}</h1>
                            <p>{post.content}</p>
                            <time>{post.createdDate}</time>
                            <div>
                              {post.images && (
                                <div>
                                  {post.images.map((image, index) => {
                                    return (<img key={index} width='300px' height='600' src={image.urlAddress} alt='images'/>)
                                  })
                                  }
                                </div>
                                )}
                            </div>
                          </div>)
                    
                })
                // )
              }
            </div>
        </Fragment>
      );
}