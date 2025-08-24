import React from 'react'
import {abilities} from "../constants/index.js";

export const FeatureCards = () => {
    return (
       <div className="w-full padding-x-lg">
           <div className="mx-auto grid-3-cols">
               {abilities.map(({imgPath,title,desc})=>(
                   <div key={title} className="card-border rounded-xl p-8 flex
                   flex-col gap-4">
                       <div className="size-14 flex items-center justify-center rounded-full">
                           <img src={imgPath} alt={title}/>
                       </div >
                       <div className="text-white text-2x font-semiboldmt-2">
                           <h3>{title}</h3>
                           <p className="text-white-50 text-lg">{desc} </p>
                       </div>

                   </div>
                       ))}
           </div>
       </div>
    )
}

