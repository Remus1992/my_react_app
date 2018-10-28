import React, {PureComponent} from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'
import WithClass from '../hoc/WithClass';

class App extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[App.js] Inside Constructor', props);
        this.state = {
            persons: [
                {id: "01", name: "Max", age: 28},
                {id: "02", name: "Manu", age: 29},
                {id: "03", name: "Mudeegen", age: 26},
            ],
            otherState: "some other value",
            showPersons: false,
            toggleClicked: 0
        }
    }

    componentWillMount() {
        console.log('[App.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[App.js] Inside componentDidMount()');
    }

// Commenting out and changing "Component" to "PureComponent" because this function is already built in
//     shouldComponentUpdate(nextProps, nextState) {
//         console.log('[UPDATE App.js] Inside shouldComponentUpdate()', nextProps, nextState);
//         return nextState.persons !== this.state.persons ||
//             nextState.showPersons !== this.state.showPersons;
//         // return true;
//     }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState);
    }

    componentDidUpdate() {
        console.log('[UPDATE App.js] Inside componentDidUpdate()');
    }

    // state = {
    //     persons: [
    //         {id: "01", name: "Max", age: 28},
    //         {id: "02", name: "Manu", age: 29},
    //         {id: "03", name: "Mudeegen", age: 26},
    //     ],
    //     otherState: "some other value",
    //     showPersons: false
    // };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

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
        this.setState((prevState, props) => {
            return {
                showPersons: !doesShow,
                //  this is better than using this.state and writing over.
                // We do this by making a function where the prevState can be passed in
                toggleClicked: prevState.toggleClicked + 1
            }

        });
    };

    render() {
        console.log('[App.js] Inside render()');
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler}/>
        }

        return (
            <WithClass classes={classes.App}>
                <button onClick={() => {
                    this.setState({showPersons: true})
                }}>Show Persons
                </button>
                <Cockpit
                    // we do have a 'props' property already built by React (like setState) so 'this' is necessary
                    appTitle={this.props.title}
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    clicked={this.togglePersonsHandler}/>
                {persons}
            </WithClass>
        );
    }
}

export default App;
