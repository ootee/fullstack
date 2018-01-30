import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            palautteita: 0,
            positiivisuus: 0
        }
    }

    palaute = (arvo) => {
        if (arvo === 1) {
            this.setState({
                hyva: this.state.hyva + 1,
                palautteita: this.state.palautteita + 1,
                positiivisuus: this.state.positiivisuus + 1
            })
        } else if (arvo === 0) {
            this.setState({
                neutraali: this.state.neutraali + 1,
                palautteita: this.state.palautteita + 1
            })
        } else if (arvo === -1) {
            this.setState({
                huono: this.state.huono + 1,
                palautteita: this.state.palautteita + 1,
                positiivisuus: this.state.positiivisuus - 1
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Unicafe palautejärjestelmä</h1>
                <p><strong>Anna palautetta</strong></p>
                <Button
                    handleClick={() => this.palaute(1)}
                    text="Hyvä"
                />
                <Button
                    handleClick={() => this.palaute(0)}
                    text="Neutraali"
                />
                <Button
                    handleClick={() => this.palaute(-1)}
                    text="Huono"
                />
                <div>
                    <br />
                    <Statistics
                        tila={this.state}
                    />
                </div>
            </div >
        )
    }
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ nimi, arvo }) => (
    <tr><td>{nimi}</td><td>{arvo}</td></tr>
)

const Statistics = ({ tila }) => {
    if (tila.palautteita > 0) {
        return (
            <div>
                <table>
                    <tbody>
                        <Statistic
                            nimi="Hyvä"
                            arvo={tila.hyva}
                        />
                        <Statistic
                            nimi="Neutraali"
                            arvo={tila.neutraali}
                        />
                        <Statistic
                            nimi="Huono"
                            arvo={tila.huono}
                        />
                        <Statistic
                            nimi="Keskiarvo"
                            arvo={(tila.positiivisuus / tila.palautteita).toFixed(1)}
                        />
                        <Statistic
                            nimi="Positiivisia"
                            arvo={(tila.hyva / tila.palautteita * 100).toFixed(1) + " %"}
                        />
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div>
            <em>Ei palautteita</em>
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
