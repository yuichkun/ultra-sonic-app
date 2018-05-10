import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/menu.css';

export default class Menu extends Component {
    render() {
        return (
            <div id="menu">
                <Link to='/sender'>Sender</Link>
                <Link to='/receiver'>Receiver</Link>
            </div>
        );
    }
}