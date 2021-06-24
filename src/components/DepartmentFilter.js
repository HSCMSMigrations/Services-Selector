import React, { PureComponent } from "react";
class DepartmentFilter extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button className="departmentFilter" onClick={this.props.departmentFilter} >See more {this.props.department} options</button>
        )
    }
}
export default DepartmentFilter