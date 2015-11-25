import React, { Component } from 'react';
import { Link } from 'react-router';
import {FullScreen} from '../components/UI';
export default class Home extends Component {
    render(){
        return (
            <FullScreen id="home" scroll={true} >
            </FullScreen>
        )
    }
}