import React, { PureComponent, useState } from 'react';
import PriceObject from './PriceObject'

class SelectedServices extends PureComponent {
    constructor(props) {
        super(props);
    }
    render ()  {
        const { selectedServices } = this.props
        if (selectedServices) {
        return (
            <div className="selectedServices">
                 {selectedServices.map(service => 
            <div className="item">
            <span class="remove-service" onClick={this.props.removeSelectedServices} >X</span>
                <div className="answer">
                    <h2>{service.service}</h2>
                    <PriceObject price={service.price} serviceObject={ service.service } category={service.category} />
                </div>
            </div>
            )}
            </div>
       
        )
     } else {
     
         return false
     }
}
}

export default SelectedServices