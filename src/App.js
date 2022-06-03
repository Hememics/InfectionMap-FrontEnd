import React, { useState, useEffect } from 'react'
import Map from './map.tsx'

function App() {
  const [data, setData] = useState([{}]);

  var jsx = [];

  useEffect(() =>
  {
    fetch("/datum").then(
      res => res.json()
    ).then(
      newData =>
      {
        setData(newData)
        console.log(newData)
      }
    )
  })


  

  if (typeof data.datum !== 'undefined'){

    data.datum.forEach((d)=>{
    
      jsx.push(<p>d</p>);
    })

}

  return(
    <div>
      <div>
        {jsx}
      </div>
      <div>
      {Map()}
      </div>
    </div>
  )
}

export default App