import React,{Component} from 'react'

export default class LeftNav extends Component{



    render(){
        return (
            <div className='left-nav'>
                <div className='left-nav-header'>
                    <div className='left-nav-logo'>
                        <img src={this.props.logoUrl}/>
                    </div>
                </div>
            </div>
        )
    }
}
