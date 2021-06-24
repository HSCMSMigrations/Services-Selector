import React, { PureComponent } from "react";
class NewServiceSelection extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { newServiceSelection } = this.props
        return (
            <button className="newServices" onClick={newServiceSelection} >Find a different service</button>
        )
    }
}
export default NewServiceSelection