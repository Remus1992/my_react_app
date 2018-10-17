import React, {Component} from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
        const persons = [...this.state.persons]; // this is an ES6 method of creating a new array w/ another arrays data
        persons.splice(personIndex, 1);
        this.setState({persons: persons})
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    render() {

        let persons = null;
        let btnClass = '';

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        // key is moved to ErrorBoundary because it needs to be on outermost element for MAP function
                        return <ErrorBoundary key={person.id}>
                            <Person
                            click={() => this.deletePersonHandler(index)}
                            name={person.name}
                            age={person.age}
                            changed={(event) => this.nameChangedHandler(event, person.id)}/>
                        </ErrorBoundary>
                    })}

                </div>
            );

            btnClass = classes.Red;

        }

        const assignedClasses = [];

        if (this.state.persons.length <= 2) {
            assignedClasses.push(classes.red) // classes = ['red']
        }
        if (this.state.persons.length <= 1) {
            assignedClasses.push(classes.bold) // classes = ['red', 'bold']
        }

        return (
            <div className={classes.App}>
                <h1>Hi, I'm a React App</h1>
                <p className={assignedClasses.join(' ')}>This is really working</p>
                <button
                    className={btnClass}
                    onClick={this.togglePersonsHandler}>Toggle Persons
                </button>
                {persons}

            </div>
        );
    }
}

export default App;
