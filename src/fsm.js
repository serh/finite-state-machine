class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error();
        }
        this.state = config.initial;
        this.states = config.states;
        this.undoStates = [];
        this.redoStates = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {

        if(!this.states[state]){
            throw new Error();
        }
        this.undoStates.push(this.state);
        this.redoStates = [];

        this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.changeState(this.states[this.state].transitions[event]);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr = [];
        if (!event) {
            for (let key in this.states) {
                arr.push(key);
            }
        } else {
            for (let key in this.states) {
                for (let transition in this.states[key].transitions)
                    if (transition === event) {
                        arr.push(key);
                    }
            }
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {

        if (!this.undoStates.length) {
            return false;
        }

        this.redoStates.push(this.getState());
        this.state = this.undoStates.pop();

        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {

        if (!this.redoStates.length) {
            return false;
        }

        this.undoStates.push(this.getState());
        this.state = this.redoStates.pop();

        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoStates = [];
        this.redoStates = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
