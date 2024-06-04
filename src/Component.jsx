import React, {useState} from "react";

export default function Component(){
    const [text,setText] = useState()
    const [search,setSearch] = useState() 
    const textOnChange = (event) => {
      setText(event.target.value)
    }
    const buttonOnClick = () => {
        setSearch(text)
      }
    return(
        <div>
            <input type="text" value={text} onChange={textOnChange}/>
            <button onClick={buttonOnClick}>Actualizar</button>
            <p>Texto input: {search}</p>
        </div>
    )
}