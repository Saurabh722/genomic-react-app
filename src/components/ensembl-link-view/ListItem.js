import React from "react";

function ListItem (props) {
    if (!props.link || !props.id) {
        throw new Error('Data is missing!')
    }

    return (
        <li className="list-item">
            <a href={props.link} className="list-item-link" rel="noopener noreferrer" target="_blank">
            {props.id}
            </a>
        </li>
    );
}

export default ListItem;