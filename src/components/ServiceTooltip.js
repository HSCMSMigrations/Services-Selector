import React, { PureComponent } from 'react'
import ReactTooltip from 'react-tooltip';




class ServiceTooltip extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { additionalInfo } = this.props
        return (
            <div className="tooltip">
                <div data-tip={additionalInfo} data-html={true} ><i class="fas fa-info-circle"></i></div>
                <ReactTooltip type="light" border={true} borderColor="#21222a" effect="solid" event="click" clickable={true} />
            </div>

        )
    }
}

export default ServiceTooltip