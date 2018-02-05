import React from 'react'

const Osa = (props) => <li>{props.osa} {props.tehtavia}</li>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
  return (
    <ul>
      {props.osat.map(osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
    </ul>
  )
}
const Kurssi = (props) => {
  return (
    <div>
      <Otsikko kurssi={props} />
      <Sisalto osat={props.osat} />
      <Yhteensa tehtavia={props.osat.map(osa => osa.tehtavia)} />
    </div>
  )
}

const Yhteensa = (props) => <p>Yhteensä {props.tehtavia.reduce((a, b) => a + b)} tehtävää</p>

export default Kurssi