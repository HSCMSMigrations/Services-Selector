import React, { PureComponent } from 'react'

class DepartmentNavigation extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        const { departmentFilter, departments, setDepartmentFilter, setNewServiceSelection } = this.props
        return (
            <div>
                {departments.length > 0 ? (
                    <div className="department_navigation">
                        <h2>Services Department</h2>
                        <ul className="nav">
                            <li className="nav-item" ><a onClick={setNewServiceSelection}>Need Help finding your service?</a></li>
                            {departments.map(department =>
                                <li className="nav-item" ><a onClick={setDepartmentFilter}>{department}</a></li>
                            )}
                        </ul>
                    </div>
                ) : (
                        null
                    )}
            </div>
        )
    }
}

export default DepartmentNavigation