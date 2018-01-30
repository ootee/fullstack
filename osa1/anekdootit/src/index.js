import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: []
        }
        const array = []

        for (let index = 0; index < anecdotes.length; index++) {
            array[index] = 0
        }

        this.state.votes = array
    }

    rndm = () => {
        const number = Math.floor(Math.random() * anecdotes.length)
        this.setState({
            selected: number
        })
    }

    vote = () => {
        const copy = { ...this.state.votes }
        copy[this.state.selected] += 1
        this.setState({
            votes: copy
        })
    }

    render() {
        return (
            <div>
                <em>
                    <strong>
                        <Anecdote
                            state={this.state}
                        />
                        <br />
                    </strong>
                </em>
                <CountVotes
                    state={this.state}
                />
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
                <MostVotes
                    state={this.state}
                />
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

const Anecdote = ({ state }) => (
    <div>
        {anecdotes[state.selected]}
    </div>
)

const CountVotes = ({ state }) => (
    <div>
        This masterpiece has {state.votes[state.selected]} votes.
    </div>
)

const MostVotes = ({ state }) => {
    let copy = { ...state.votes }
    copy.sort
    copy.reverse
    return (
        <div>
            {copy[0]}
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

