import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer(props){
    return (
        <div className='footer'>
            <Link to={props.backLink}>{props.backText}</Link>
            <Link onClick={props.onClick} to={props.forwardCondition[0] && props.forwardCondition[1] ? `/${props.forwardLink}` : "#" }>{props.forwardText}</Link>
        </div>
    )
}