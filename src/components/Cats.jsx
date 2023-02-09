import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import '../cats.css'
import { Loader } from './Loader';

const Cats = () => {

    const [photos, setPhotos] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    function data(){
        return(
            photos.map((photo,i) => (
                <>
                <div className="pictures" key={i}>
                    <div className="container" >
                    <img src={photo} alt="" className='cats'/>
                    </div>
                </div>
                </>
            ))
        )
    }

    useEffect(()=>{
        getCats();
    },[])
async function getCats(){
    try{
        setIsLoading(true)
        let data = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        let res = await data.json();
        // console.log(res)
        let array = res.map(r => r.url)
        setIsLoading(false)
        setPhotos(array)
    }catch(e){
        console.log(`Error: ${e}`)
    }
    console.log(photos)
}
function handleSearch(){
    setIsLoading(true);
    setTimeout(()=>{
        setIsLoading(false)
        getCats();
    },1000)
}

  return (
    <>
        {data()}
        {isLoading?
            <Loader/>:data()
        }
        <button className='get'onClick={handleSearch}>Get another cats </button>
    </>
  )
}
export {Cats}
