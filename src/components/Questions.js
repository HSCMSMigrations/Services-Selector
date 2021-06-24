import React, { PureComponent } from 'react';
class Questions extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      nextPhase,
      department,
      handleClick,
      tierData,
      serviceGroup,
      onboardingProfessionalServices,
      handleClickHasMore,
      phase,
    } = this.props;
    if (onboardingProfessionalServices === 'Onboarding' && phase === 3) {
      return (
        <div>
         <div className="product-select"><h3>Select the products that you have purchased or are considering purchasing</h3></div>
          {phase === 3 && onboardingProfessionalServices === 'Onboarding' ? (
            <button className="next" onClick={nextPhase}>
              Next
            </button>
          ) : null}
          <h3>Marketing</h3>
          <div className="questions-outer">
            {tierData
              .filter(data => {
                if (data.values.service_group) {
                  return data.values.service_group.name.includes(serviceGroup) && data.values.question.includes("Marketing");
                } else {
                  return null;
                }
              })
              .map(question => (
                <div className="item" onClick={handleClickHasMore}>
                  <div
                    className="question"
                    dangerouslySetInnerHTML={{
                      __html: question.values.question,
                    }}
                  ></div>
                </div>
              ))}
          </div>
          <h3>Sales</h3>
          <div className="questions-outer">
            {tierData
              .filter(data => {
                if (data.values.service_group) {
                  return data.values.service_group.name.includes(serviceGroup) && data.values.question.includes("Sales");
                } else {
                  return null;
                }
              })
              .map(question => (
                <div className="item" onClick={handleClickHasMore}>
                  <div
                    className="question"
                    dangerouslySetInnerHTML={{
                      __html: question.values.question,
                    }}
                  ></div>
                </div>
              ))}
          </div>
          <h3>Service</h3>
          <div className="questions-outer">
            {tierData
              .filter(data => {
                if (data.values.service_group) {
                  return data.values.service_group.name.includes(serviceGroup) && data.values.question.includes("Service");
                } else {
                  return null;
                }
              })
              .map(question => (
                <div className="item" onClick={handleClickHasMore}>
                  <div
                    className="question"
                    dangerouslySetInnerHTML={{
                      __html: question.values.question,
                    }}
                  ></div>
                </div>
              ))}
          </div>
          <h3>Operations</h3>
          <div className="questions-outer">
            {tierData
              .filter(data => {
                if (data.values.service_group) {
                  return data.values.service_group.name.includes(serviceGroup) && data.values.question.includes("Operations");
                } else {
                  return null;
                }
              })
              .map(question => (
                <div className="item" onClick={handleClickHasMore}>
                  <div
                    className="question"
                    dangerouslySetInnerHTML={{
                      __html: question.values.question,
                    }}
                  ></div>
                </div>
              ))}
          </div>
        </div>
      );
    } else if (onboardingProfessionalServices && serviceGroup && department) {
      return (
        <div className="questions-outer">
          {tierData
            .filter(data => {
              if (data.values.services_department) {
                return data.values.services_department.name.includes(
                  department,
                );
              } else {
                return null;
              }
            })
            .map(question => (
              <div className="item" onClick={handleClick}>
                <div
                  className="question"
                  dangerouslySetInnerHTML={{ __html: question.values.question }}
                ></div>
              </div>
            ))}
        </div>
      );
    } else if (onboardingProfessionalServices && serviceGroup && !department) {
      return (
        <div className="questions-outer">
          {tierData
            .filter(data =>
              data.values.service_group.name.includes(serviceGroup),
            )
            .map(question => (
              <div className="item" onClick={handleClick}>
                <div
                  className="question"
                  dangerouslySetInnerHTML={{ __html: question.values.question }}
                ></div>
              </div>
            ))}
        </div>
      );
    } else if (onboardingProfessionalServices && !serviceGroup && !department) {
      return (
        <div className="questions-outer">
          {tierData
            .filter(data =>
              data.values.onboarding_professional_service.name.includes(
                onboardingProfessionalServices,
              ),
            )
            .map(question => (
              <div className="item" onClick={handleClick}>
                <div
                  className="question"
                  dangerouslySetInnerHTML={{ __html: question.values.question }}
                ></div>
              </div>
            ))}
        </div>
      );
    } else {
      return (
        <div className="questions-outer">
          {tierData.map(question => (
            <div className="item" onClick={handleClick}>
              <div
                className="question"
                dangerouslySetInnerHTML={{ __html: question.values.question }}
              ></div>
            </div>
          ))}
        </div>
      );
    }
  }
}
export default Questions;
