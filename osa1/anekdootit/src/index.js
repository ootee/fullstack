import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: [0, 0, 0, 0, 0, 0]
        }
    }

    rndm = () => {
        const number = Math.floor(Math.random() * anecdotes.length)
        this.setState({
            selected: number
        })
    }

    vote = () => {
        const copy = { ...this.state.votes }
        console.log(copy);

        copy[this.state.selected] += 1
        this.setState({
            votes: copy,
        })

    }

    indexOfMax = () => {
        const array = [...this.state.votes]
        return array.indexOf(Math.max(...array))
    }

    render() {
        return (
            <div>
                <em>
                    <p>{this.props.anecdotes[this.state.selected]}</p>
                </em>
                <p>Has {this.state.votes[this.state.selected]} votes.</p>
                <p>
                    <Button
                        handleClick={() => this.vote()}
                        text="Vote for this one"
                    />
                    <Button
                        handleClick={() => this.rndm()}
                        text="Give me another one"
                    />
                </p>
                <div>
                    <p>{this.props.anecdotes[this.indexOfMax()]}</p>
                    <p>{Math.max(...this.state.votes)}</p>
                </div>
            </div>
        )
    }
}


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
