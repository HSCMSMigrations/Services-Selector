import React, { PureComponent } from 'react';
import './Questions.scss';
import Results from './Results';
import DepartmentFilter from './DepartmentFilter';
import DepartmentNavigation from './DepartmentNavigation';
class GetHubdbTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hubdb_data: [],
      hubdb_table: props.HubdbTable,
      services_table: props.Services,
      phase: 1,
      maxPhaseLevel: 0,
      answers: [],
      serviceGroup: '',
      department: '',
      positiveServices: {},
      negativeServices: {},
      recommendedServices: {},
      exclusions: {},
      department_filter: {},
      departments: [],
      input: '',
      onboardingProfessionalServices: '',
      products: []
    };
  }
  componentDidMount() {
    // Simple GET request using fetch
    fetch('/_hcms/api/get_questions_table', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.hubdb_table),
    })
      .then(response => response.json())
      .then(data => this.setState({ hubdb_data: data.response.results }))
      .then(() => {
        let hubdb_data = this.state.hubdb_data;
        let maxPhaseLevel = 0;
        for (var phaseData of hubdb_data) {
          if (phaseData.values.positive_service_category) {
            for (var services of phaseData.values.positive_service_category) {
              let posServe = this.state.positiveServices;
              let posServeComp = services.name;
              let include = key => Object.keys(posServe).includes(key);
              if (include(posServeComp) === false) {
                this.setState(prevState => ({
                  positiveServices: {
                    ...prevState.positiveServices,
                    [posServeComp]: 0,
                  },
                  recommendedServices: {
                    ...prevState.recommendedServices,
                    [posServeComp]: 0,
                  },
                }));
              }
            }
          }
          if (phaseData.values.negative_service_category) {
            for (var negServices of phaseData.values
              .negative_service_category) {
              let negServe = this.state.negativeServices;
              let negServeComp = negServices.name;
              let negInclude = key => Object.keys(negServe).includes(key);
              if (negInclude(negServeComp) === false)
                this.setState(prevState => ({
                  negativeServices: {
                    ...prevState.negativeServices,
                    [negServeComp]: 0,
                  },
                }));
            }
          }
          if (phaseData.values.phase > maxPhaseLevel) {
            this.setState({
              maxPhaseLevel: phaseData.values.phase,
            });
          }
          if (phaseData.values.services_department) {
            let dep = this.state.departments;
            let depComp = phaseData.values.services_department.name;
            let depInclude = key => dep.includes(key);
            if (depInclude(depComp) === false)
              this.setState(prevState => ({
                departments: [...prevState.departments, depComp],
              }));
          }
        }
      });
  }
  render() {
    const {
      hubdb_data,
      phase,
      serviceGroup,
      department,
      answers,
      departments,
      department_filter,
      onboardingProfessionalServices,
      positiveServices
    } = this.state;
    const { servicesObjects, setGoodFit, setBadFit, hasGoodFit } = this.props;
    let tierData = [];
    for (var phaseData of hubdb_data) {
      if (phaseData.values.phase === phase) {
        tierData.push(phaseData);
      }
    }

    function hubdbFilter(value) {
      if (!value.values.services_department) {
        return false;
      }
      return value.values.services_department.name.includes(department);
    }
    const handleClick = e => {
        let quest = e.currentTarget.querySelector('p').innerText;
      this.setState({ phase: this.state.phase + 1 });
      this.setState(prevState => ({
        answers: [...prevState.answers, { question: quest }],
      }));
      for (var posData of tierData) {
        if (posData.values.question.replace(/(<([^>]+)>)/gi, '') === quest) {
          if (posData.values.positive_service_category) {
            for (var val of posData.values.positive_service_category) {
              let data = val.name;
              this.setState(prevState => ({
                positiveServices: {
                  ...prevState.positiveServices,
                  [data]: prevState.positiveServices[data] + 1,
                },
                recommendedServices: {
                  ...prevState.recommendedServices,
                  [data]: prevState.recommendedServices[data] + 1,
                },
              }));
            }
          }
          if (posData.values.negative_service_category) {
            for (var negVal of posData.values.negative_service_category) {
              let negData = negVal.name;
              this.setState(prevState => ({
                negativeServices: {
                  ...prevState.negativeServices,
                  [negData]: prevState.negativeServices[negData] - 1,
                },
                recommendedServices: {
                  ...prevState.recommendedServices,
                  [negData]: prevState.recommendedServices[negData] - 1,
                },
              }));
            }
          }
          if (posData.values.exclusion) {
            for (var exclusionVal of posData.values.exclusion) {
              let exclusionData = exclusionVal.name;
              this.setState(prevState => ({
                negativeServices: {
                  ...prevState.negativeServices,
                  [exclusionData]:
                    prevState.negativeServices[exclusionData] - 10,
                },
                recommendedServices: {
                  ...prevState.recommendedServices,
                  [exclusionData]:
                    prevState.recommendedServices[exclusionData] - 10,
                },
              }));
            }
          }
          if (posData.values.service_group) {
            let serviceGroup = posData.values.service_group.name;
            this.setState({
              serviceGroup: serviceGroup,
            });
          }
          if (posData.values.services_department) {
            let servicesDepartment = posData.values.services_department.name;

            this.setState({
              department: servicesDepartment,
            });
          }
          if (posData.values.onboarding_professional_service) {
            let onboardingProfessionalServices =
              posData.values.onboarding_professional_service.name;

            this.setState({
              onboardingProfessionalServices: onboardingProfessionalServices,
            });
          }
          if (department) {
            let maxPhaseAdj = 0;
            let depRows = hubdb_data.filter(hubdbFilter, department);
            maxPhaseAdj = depRows.reduce(
              (acc, row) =>
                (acc = acc > row.values.phase ? acc : row.values.phase),
              0,
            );
            this.setState({ maxPhaseLevel: maxPhaseAdj });
          }
        }
      }
    };
    const handleClickHasMore = e => {
      let itemClass = e.currentTarget.closest('.item').classList
      let quest = e.currentTarget.querySelector('p').innerText;
      this.setState(prevState => ({
        answers: [...prevState.answers, { question: quest }],
      }));
      for (var posData of tierData) {
        if (posData.values.question.replace(/(<([^>]+)>)/gi, '') == quest) {
          if (posData.values.positive_service_category) {
            for (var val of posData.values.positive_service_category) {
              let data = val.name;
              if (!itemClass.contains('selected')) {
                this.setState(prevState => ({
                    positiveServices: {
                      ...prevState.positiveServices,
                      [data]: prevState.positiveServices[data] + 1,
                    },
                    recommendedServices: {
                      ...prevState.recommendedServices,
                      [data]: prevState.recommendedServices[data] + 1,
                    },
                  }));
              } else {
                this.setState(prevState => ({
                    positiveServices: {
                      ...prevState.positiveServices,
                      [data]: prevState.positiveServices[data] - 1,
                    },
                    recommendedServices: {
                      ...prevState.recommendedServices,
                      [data]: prevState.recommendedServices[data] - 1,
                    },
                  }));
              }
              
            }
          }
          if (posData.values.negative_service_category) {
            for (var negVal of posData.values.negative_service_category) {
              let negData = negVal.name;
              if (!itemClass.contains('selected')) {
              this.setState(prevState => ({
                negativeServices: {
                  ...prevState.negativeServices,
                  [negData]: prevState.negativeServices[negData] - 1,
                },
                recommendedServices: {
                  ...prevState.recommendedServices,
                  [negData]: prevState.recommendedServices[negData] - 1,
                },
              }));
            } else {
                this.setState(prevState => ({
                    negativeServices: {
                      ...prevState.negativeServices,
                      [negData]: prevState.negativeServices[negData] + 1,
                    },
                    recommendedServices: {
                      ...prevState.recommendedServices,
                      [negData]: prevState.recommendedServices[negData] + 1,
                    },
                  }));
            }
            }
          }
          if (posData.values.exclusion) {
            for (var exclusionVal of posData.values.exclusion) {
              let exclusionData = exclusionVal.name;
              if (!itemClass.contains('selected')) {
              this.setState(prevState => ({
                negativeServices: {
                  ...prevState.negativeServices,
                  [exclusionData]:
                    prevState.negativeServices[exclusionData] - 10,
                },
                recommendedServices: {
                  ...prevState.recommendedServices,
                  [exclusionData]:
                    prevState.recommendedServices[exclusionData] - 10,
                },
              }));
            } else {
                this.setState(prevState => ({
                    negativeServices: {
                      ...prevState.negativeServices,
                      [exclusionData]:
                        prevState.negativeServices[exclusionData] + 10,
                    },
                    recommendedServices: {
                      ...prevState.recommendedServices,
                      [exclusionData]:
                        prevState.recommendedServices[exclusionData] + 10,
                    },
                  }));
            }
            }
          }
          if (posData.values.services_department) {
            
              let servicesDepartment = posData.values.services_department.name;
              this.setState({
                department: servicesDepartment,
              });
            
          }
        }
      }
      e.currentTarget.closest('.item').classList.toggle('selected')
    };
    const nextPhase = () => {
        let selectedServices = []
        let servicesAll = document.querySelectorAll('.selected p')
       
        for (var service of servicesAll) {
            
            selectedServices.push(service.innerText)
        }
        if (selectedServices.filter(data => data.includes('Marketing')).length === 0) {
            
            for (const [key, value] of Object.entries(positiveServices) ) {
          
                if (key.includes('Marketing')) {
                    this.setState(prevState => ({
                        recommendedServices: {
                            ...prevState.recommendedServices,
                            [key]:
                              prevState.recommendedServices[key] - 10,
                          },
                    }))
                }
            }
        }
        if (selectedServices.filter(data => data.includes('Sales')).length === 0) {
            for (const [key, value] of Object.entries(positiveServices) ) {
               
                if (key.includes('Sales')) {
                    this.setState(prevState => ({
                        recommendedServices: {
                            ...prevState.recommendedServices,
                            [key]:
                              prevState.recommendedServices[key] - 10,
                          },
                    }))
                }
            }
        }
        if (selectedServices.filter(data => data.includes('Service')).length === 0) {
            for (const [key, value] of Object.entries(positiveServices) ) {
        
                if (key.includes('Service')) {
                    this.setState(prevState => ({
                        recommendedServices: {
                            ...prevState.recommendedServices,
                            [key]:
                              prevState.recommendedServices[key] - 10,
                          },
                    }))
                }
            }
        }
        
      this.setState({ phase: phase + 1 });
    };
    const onChangeHandler = e => {
      this.setState({
        input: e.target.value,
      });
    };
    const setDepartmentNavFilter = e => {
      let filter = e.currentTarget.closest('a').innerText;
      this.setState({
        department_filter: {
          department: filter,
        },
      });
    };
    const setDepartmentFilter = () => {
      this.setState({
        department_filter: {
          department: this.state.department,
        },
      });
    };
    const setNewServiceSelection = e => {
      this.setState(
        {
          phase: 1,
          answers: [],
          serviceGroup: '',
          department: '',
          exclusions: {},
          positiveServices: {},
          recommendedServices: {},
          input: '',
          department_filter: {},
          onboardingProfessionalServices: '',
        },
        () => {
          let hubdb_data = this.state.hubdb_data;
          let maxPhaseLevel = 0;
          for (var phaseData of hubdb_data) {
            if (phaseData.values.phase > maxPhaseLevel) {
              this.setState({
                maxPhaseLevel: phaseData.values.phase,
              });
            }
            if (phaseData.values.positive_service_category) {
              for (var services of phaseData.values.positive_service_category) {
                let posServe = this.state.positiveServices;
                let posServeComp = services.name;
                let include = key => Object.keys(posServe).includes(key);
                if (include(posServeComp) === false) {
                  this.setState(prevState => ({
                    positiveServices: {
                      ...prevState.positiveServices,
                      [posServeComp]: 0,
                    },
                    recommendedServices: {
                      ...prevState.recommendedServices,
                      [posServeComp]: 0,
                    },
                  }));
                }
              }
            }
          }
        },
      );
    };
    return (
      <div>
        <DepartmentNavigation
          setDepartmentFilter={setDepartmentNavFilter}
          departments={departments}
          setNewServiceSelection={setNewServiceSelection}
          departmentFilter={department_filter}
        />
        <Results
          nextPhase={nextPhase}
          handleClickHasMore={handleClickHasMore}
          handleClick={handleClick}
          onChangeHandler={onChangeHandler}
          {...this.state}
          tierData={tierData}
          setSelectedServices={this.props.setSelectedServices}
          newServiceSelection={setNewServiceSelection}
          departmentFilter={setDepartmentFilter}
          servicesObjects={servicesObjects}
          checkGoodBadFit={this.props.checkGoodBadFit}
          setGoodFit={setGoodFit}
          setBadFit={setBadFit}
          hasGoodFit={hasGoodFit}
          department_filter={department_filter}
          onboardingProfessionalServices={onboardingProfessionalServices}
        />
      </div>
    );
  }
}
export default GetHubdbTable;
