import React, { PureComponent } from "react";

class ServiceFilter extends PureComponent {
    constructor(props) {
        super(props);
        }
    
        render () {
            return (
                <div className="filter-container">
                    <span className="search-heading">Filter your results: </span>
                    <input type="text" className="search-filter" onChange={this.props.onChangeFilter}/>
                </div>
            )
        }

}
export default ServiceFilter