import UnauthorizedPageImage from '../assets/img/unauthorized-page.jpg'
import { Fragment } from 'react';
export default function UnauthorizedPage(){
    return (
    <Fragment>
            <div className='container text-center'>

                <img src={UnauthorizedPageImage} alt='401image'/> 

            </div>
        </Fragment>

    )
}