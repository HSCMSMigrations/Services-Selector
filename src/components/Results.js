import React, { PureComponent } from 'react'
import Questions from './Questions'
import ServiceOptions from './ServiceOptions'
class Results extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { nextPhase, handleClickHasMore, onChangeHandler, recommendedServices, handleClick, maxPhaseLevel, phase, serviceGroup, department, answers, tierData, departmentFilter, department_filter, checkGoodBadFit, servicesObjects, newServiceSelection, input, setGoodFit, setBadFit, hasGoodFit, onboardingProfessionalServices } = this.props
        if (Object.keys(department_filter).length > 0) {
            return (
                <ServiceOptions servicesObjects={servicesObjects} recommendedServices={recommendedServices} department={department} answers={answers} onChangeHandler={onChangeHandler} departmentFilter={departmentFilter} newServiceSelection={newServiceSelection} input={input} department_filter={department_filter} checkGoodBadFit={checkGoodBadFit} setBadFit={setBadFit} setGoodFit={setGoodFit} hasGoodFit={hasGoodFit} />
            )
        }
        else if (phase <= maxPhaseLevel) {
            return (
                <Questions nextPhase={nextPhase} handleClickHasMore={handleClickHasMore} tierData={tierData} department={department} handleClick={handleClick} serviceGroup={serviceGroup} onboardingProfessionalServices={onboardingProfessionalServices} phase={phase}/>
            )
        } else if (answers.length > 0) {
            return (
                <ServiceOptions servicesObjects={servicesObjects} recommendedServices={recommendedServices} department={department} answers={answers} onChangeHandler={onChangeHandler} departmentFilter={departmentFilter} newServiceSelection={newServiceSelection} input={input} department_filter={department_filter} checkGoodBadFit={checkGoodBadFit} setBadFit={setBadFit} setGoodFit={setGoodFit} hasGoodFit={hasGoodFit} />
            )
        } else {
            return (
                <div>
                    <div className="results-outer">
                        <h2 className="loading">... Loading</h2>
                    </div>
                </div>
            )
        }
    }
}
export default Results