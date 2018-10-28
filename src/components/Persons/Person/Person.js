import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import WithClass from '../../../hoc/WithClass';

class Person extends Component {
    constructor(props) {
        super(props);
        console.log('[Person.js] Inside Constructor', props);
        // createRef new to React 16.3
        this.inputElement = React.createRef();
    }

    componentWillMount() {
        console.log('[Person.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Person.js] Inside componentDidMount()');
        // Old would have function here. 16.3 has separatability
        // this is actually being executed after the creation of inputElement
        // below in the render function
        // if (this.props.position === 0) {
        //     // 16.3 Version
        //     this.inputElement.current.focus();
        //     // Old Version
        //     // this.inputElement.focus();
        // }

        if (this.props.position === 0) {
            this.inputElement.current.focus();
        }
    }

    // 16.3
    focus() {
        this.inputElement.current.focus();
    }

    render() {
        console.log('[Person.js] Inside render()');
        return (
            <WithClass classes={classes.Person}>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input
                    // 16.3 Version
                    ref={this.inputElement}

                    // Old version
                    // ref={(inp) =>{this.inputElement = inp}}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}/>
            </WithClass>
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default Person;
