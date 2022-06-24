import React, { Component } from 'react';
import './list.scss'
import status from '../../constants/status';
import Item from './Item';

class List extends Component {
    constructor(props) {
        super(props);
        this.handleShowContextMenu = this.handleShowContextMenu.bind(this);
    }
    state = {
        top: 0,
        left: 0,
        visibility: 'hidden',
        todo: {
            id: undefined,
            status: undefined,
            name: '',
        },
    };
    
    handleShowContextMenu(e, todo) {
        this.setState({
            top: e.clientY,
            left: e.clientX,
            visibility: 'visible',
            todo: {
                ...this.state.todo,
                ...todo,
            },
        });
    }
    handleCloseContextMenu() {
        this.setState({
            ...this.state,
            visibility: 'hidden',
        });
    }

    async handleSaveStatusTodo(status) {
        await this.setState({
            ...this.state,
            visibility: 'visible',
            todo: {
                ...this.state.todo,
                status: status,
            },
        });
        this.props.handleSaveTodo(this.state.todo);
    }
    render() {
        const { todos } = this.props;
        return (
            <>
                <ul>
                    {todos.map((todo, key) => {
                        return <Item
                            key={key}
                            todo={todo}
                            handleDelete={this.props.handleDelete}
                            handleShowContextMenu={
                                this.handleShowContextMenu
                            }
                            handlePrepareEdit={this.props.handlePrepareEdit}
                        />

                    })}
                </ul>
                <div
                    className={`status-context-cover ${this.state.visibility}`}
                    onClick={() => {
                        this.handleCloseContextMenu();
                    }}
                ></div>
                <div
                    className={`status-context-menu ${this.state.visibility}`}
                    style={{
                        top: `${this.state.top}px`,
                        left: `${this.state.left}px`,
                        transform: `${window.innerHeight - this.state.top <= 150
                            ? 'translateY(-100%)'
                            : ''
                            }`,
                    }}
                >
                    <button
                        className={`todo-status todo`}
                        onClick={() => {
                            this.handleSaveStatusTodo(status.TODO);
                        }}
                    >
                        Todo
                    </button>
                    <button
                        className={`todo-status process`}
                        onClick={() => {
                            this.handleSaveStatusTodo(status.PROCESS);
                        }}
                    >
                        Processing
                    </button>
                    <button
                        className={`todo-status completed`}
                        onClick={() => {
                            this.handleSaveStatusTodo(status.COMPLETED);
                        }}
                    >
                        Completed
                    </button>
                </div>
            </>

        );
    }
}

export default List;