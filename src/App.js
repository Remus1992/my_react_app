import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
    state = {
        persons: [
            {id: "01", name: "Max", age: 28},
            {id: "02", name: "Manu", age: 29},
            {id: "03", name: "Mudeegen", age: 26},
        ],
        otherState: "some other value",
        showPersons: false
    };

    // No longer going to be used
    // switchNameHandler = (newName) => {
    //     //console.log('was clicked');
    //     // DON'T DO THIS:  this.state.persons[0].name = "Maximilian"
    //     // Shouldn't mutate state directly because React can't pick it up
    //     this.setState({
    //         persons: [
    //             {name: newName, age: 28},
    //             {name: "Manutastic", age: 29},
    //             {name: "Megan", age: 26},
    //         ]
    //     })
    // };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        // const person = Object.assign({}, this.state.persons[personIndex]); // alternative dated method

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({persons: persons});
    };

    deletePersonHandler = (personIndex) => {
        // this method (without .slice() in 4- line) works but is not advised because it can lead to
        // unpredictable apps this is because it manipulates the original list when a better
        // method would be to copy the original to a new set and manipulate that one.

        // 4- const persons = this.state.persons.slice();
        const persons = [...this.state.persons]; // this is an ES6 method of creating a new array w/ another arrays data
        // this is otherwise known as updating the state immutably
        persons.splice(personIndex, 1);
        this.setState({persons: persons})
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    render() {
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1x solid blue',
            padding: '8px',
            cursor: 'pointer'

        };

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                            click={() => this.deletePersonHandler(index)}
                            name={person.name}
                            age={person.age}
                            key={person.id}
                            changed={(event) => this.nameChangedHandler(event, person.id)}/> // key is to allow react the ability to differentiate between person elements
                    })}

                </div>
            );

            //    to change CSS elements conditionally/ dynamically, one can add the change here at the end of the if statement
            style.backgroundColor = 'red'
        }

        const classes = [];

        if (this.state.persons.length <= 2) {
            classes.push('red') // classes = ['red']
        }
        if (this.state.persons.length <= 1) {
            classes.push('bold') // classes = ['red', 'bold']
        }

        return (
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <p className={classes.join(' ')}>This is really working</p>
                <button
                    style={style}
                    onClick={this.togglePersonsHandler}>Toggle Persons
                </button>
                {persons}

            </div>
        );
        // "onClick" is only capitalized in this capacity for REACT
        // don't put parentheses on the end of the function click event since that will call the function when loading
        // instead what is being created is a "reference" to the function for later use
        // return React.createElement('div', null, React.createElement('h1', null, 'Hi, I\'m a React App'))
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'))
    }
}

export default App;

/*
    // this method is the better method than the one below but can be shorted further to the one above
                    <Person
                        name={this.state.persons[0].name}
                        age={this.state.persons[0].age}/>
                    <Person
                        name={this.state.persons[1].name}
                        age={this.state.persons[1].age}
                        click={this.switchNameHandler.bind(this, 'Max')}
                        changed={this.nameChangedHandler}>My Hobbies: Racing</Person>

                    <Person
                        name={this.state.persons[2].name}
                        age={this.state.persons[2].age}/>
*/

/*
    //a different method (goes under button in JSX)
    {
        this.state.showPersons ? // this is creating an if/ else statement
        //'this.state.showPersons === true ? React.createElement()' is also valid but is redundant
        <div>
            <Person
                name={this.state.persons[0].name}
                age={this.state.persons[0].age}/>
            <Person
                name={this.state.persons[1].name}
                age={this.state.persons[1].age}
                click={this.switchNameHandler.bind(this, 'Max')}
                changed={this.nameChangedHandler}>My Hobbies: Racing</Person>
            <Person
                name={this.state.persons[2].name}
                age={this.state.persons[2].age}/>
        </div> : null // this ':' is an 'else' statement in JSX
    }
*/