import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponentin tila',
                tehtavia: 14
            }
        ]
    }
    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <div>
            <p>{props.kurssi}</p>
        </div>
    )
}

const Sisalto = (props) => {
    
    return (
        <div>
            <Osa nimi={props.osat[0].nimi} tehtavia={props.osat[0].tehtavia} />
            <Osa nimi={props.osat[1].nimi} tehtavia={props.osat[1].tehtavia} />
            <Osa nimi={props.osat[2].nimi} tehtavia={props.osat[2].tehtavia} />
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>Osa: {props.nimi}, tehtäviä {props.tehtavia}</p>
        </div>
    )
}


const Yhteensa = (props) => {
    return (
        <div>
            <p>Tehtäviä yht: {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia}</p>
        </div>
    )

}

ReactDOM.render(<App />, document.getElementById('root'));

