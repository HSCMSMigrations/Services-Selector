import React, { PureComponent } from 'react'
import NewServiceSelection from './NewService'
import ServiceFilter from './ServiceFilter'
import DepartmentFilter from './DepartmentFilter'
import GoodBadFit from './GoodBadFit'
import ServiceTooltip from './ServiceTooltip'
class ServiceOptions extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { servicesObjects, recommendedServices, department, answers, onChangeHandler, departmentFilter, newServiceSelection, input, department_filter, checkGoodBadFit, setGoodFit, setBadFit, hasGoodFit } = this.props
        let recommended_services = recommendedServices
        const services = servicesObjects
        let final_services = []
        let service_descriptions = []
        for (var item in recommended_services) {
            if (recommended_services[item] > 0) {
                final_services.push([item, recommended_services[item]])
            }
        }
        if (final_services.length != 0) {
            final_services.sort((a, b) => a[1] - b[1]).reverse()
            for (var service of services) {
                for (var item of final_services) {
                    if (service.values.positive_service_category) {
                        for (var serviceCategory of service.values.positive_service_category) {
                            if (item[0] === serviceCategory.name) {
                                service_descriptions.push(service)
                            }
                        }
                    }
                }
            }
        } else {
            for (var service of services) {
                if ("Partner" === service.values.positive_service_category) {
                    service_descriptions.push(service)
                }
            }
        }
        let serviceDescriptions = service_descriptions
        if (department_filter.department) {
            serviceDescriptions = servicesObjects.filter(newService => newService.values.services_department.name.includes(department_filter.department)).filter(service => input === '' || service.values.name.toLowerCase().includes(input.toLowerCase()) || service.values.description.toLowerCase().includes(input.toLowerCase()))
        } else {
            serviceDescriptions = service_descriptions.filter(service => input === '' || service.values.name.toLowerCase().includes(input.toLowerCase()) || service.values.description.toLowerCase().includes(input.toLowerCase()))
        }
        return (
            <div>
                <div className="results-outer">
                    <h2 className="results">Service Options</h2>
                   
                    {answers.length > 0 ? (
                    <p>Based on the answers provided (below) we recommend one of the following services</p> ) : (null) }
                </div>
                <div className="options">
                    <div className="answers-outer">
                        <NewServiceSelection newServiceSelection={newServiceSelection} />
                        {!department_filter.department ? (
                            <DepartmentFilter department={department} departmentFilter={departmentFilter} />
                        ) : (
                                null
                            )}
                        <ServiceFilter onChangeFilter={onChangeHandler} />
                        {serviceDescriptions.map(service =>
                            <div className="item" onClick={checkGoodBadFit(servicesObjects)} goodBadFit={service.values.has_goodbad_fit}>
                                {service.values.additional_info ? (
                                    <ServiceTooltip additionalInfo={service.values.additional_info} />
                                ) : (
                                        null
                                    )
                                }
                                <div className="answer">
                                    <h2>{[service.values.name]}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: service.values.description }}></div>
                                    <p className="price">{service.values.price}</p>
                                </div>
                            </div>
                        )}
                        <GoodBadFit displayGoodBadFit={false} setGoodFit={setGoodFit} setBadFit={setBadFit} hasGoodFit={hasGoodFit} services={servicesObjects} />
                    </div>
                </div>
            </div>
        )
    }
}
export default ServiceOptions