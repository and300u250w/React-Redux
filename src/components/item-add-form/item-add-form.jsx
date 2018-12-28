import React, {Component} from 'react';
import './item-add-form.css';


export default class AddNewItem extends Component {


    render (){

        return (
        
        <div className="item-add-form">
                <button type="submit" onClick={this.props.addItem} className="btn btn-outline-secondary"> Add New Item</button>


        </div>)
        
    }
}