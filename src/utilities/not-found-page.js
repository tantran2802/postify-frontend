import PageErrorImage from '../assets/img/not-found-page.jpg';
import { Fragment } from 'react';
export default function NotFoundPage(){
    return(
        <Fragment>
            <div className='container text-center'>

                <img src={PageErrorImage} alt='404image'/> 

            </div>
        </Fragment>
    );

}