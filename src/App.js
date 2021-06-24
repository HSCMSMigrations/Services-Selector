import React, { PureComponent, useState } from 'react';
import './App.scss';
import GetHubdbTable from './components/GetHubdbTable';
import SelectedServices from './components/SelectedServices'
import GoodBadFit from './components/GoodBadFit'
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      moduleData: this.props.moduleData,
      services_table: this.props.moduleData.services,
      servicesObjects: [],
      selectedServices: [],
      hasGoodFit: [],
    }
  }
  componentDidMount() {
    fetch('/_hcms/api/get_questions_table', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.services_table)
    })
      .then(response => response.json())
      .then(data => this.setState({ servicesObjects: data.response.results })).then(() => {
      })
  }
  render() {
    const { selectedServices, moduleData, servicesObjects, hasGoodFit } = this.state
    const setSelectedServices = (servicesObjects, currentTarget) => {
      let target = currentTarget
      let service = target.querySelector('h2').innerText
      let category = servicesObjects.filter(category => category.values.name === service)
      let price = target.querySelector('p.price').innerText
      for (var obj of category) {
        if (target.classList.contains('selected')) {
          target.classList.remove('selected')
          this.setState(prevState => ({
            selectedServices: [...prevState.selectedServices.filter(currentService => currentService.service != service)]
          }))
        } else {
          target.classList.add('selected')
          this.setState(prevState => ({
            selectedServices: [...prevState.selectedServices, { service: service, price: price, category: obj.values.services_department.name }]
          }))
        }
      }
    }
    const removeSelectedServices = (e) => {
      let target = e.currentTarget
      if (target.classList.contains('remove-service')) {
        let service = target.parentNode.querySelector('h2').innerText
        var h2Tags = document.getElementsByTagName("h2");
        var searchText = service
        var found;
        for (var i = 0; i < h2Tags.length; i++) {
          if (h2Tags[i].textContent == searchText) {
            found = h2Tags[i];
            break;
          }
        }
        found.parentNode.parentNode.classList.remove('selected')
        this.setState(prevState => ({
          selectedServices: [...prevState.selectedServices.filter(currentService => currentService.service != service)]
        }))
      }
    }
    const setGoodFit = (services) => (e) => {
      let service = services.values.name
      let price = services.values.price
      let category = services.values.services_department.name
      var h2Tags = document.getElementsByTagName("h2");
      var searchText = service
      var found;
      for (var i = 0; i < h2Tags.length; i++) {
        if (h2Tags[i].textContent == searchText) {
          found = h2Tags[i];
          break;
        }
      }
      found.parentNode.parentNode.classList.add('selected')
      this.setState(prevState => ({
        hasGoodFit: [...prevState.hasGoodFit.filter(serviceNew => serviceNew.service != service)]
      }))
      this.setState(prevState => ({
        selectedServices: [...prevState.selectedServices, { service: service, price: price, category: category }]
      }))
    }
    const setBadFit = (services) => (e) => {
      let service = services.values.name
      this.setState(prevState => ({
        hasGoodFit: [...prevState.hasGoodFit.filter(serviceNew => serviceNew.service != service)]
      }))
    }
    const checkGoodBadFit = (servicesObjects) => (e) => {
      let target = e.currentTarget
      let serviceName = target.querySelector('h2').innerText
      let serviceObj = servicesObjects.filter(service => service.values.name === serviceName)
      for (var obj of serviceObj) {
        if (obj.values.has_goodbad_fit === 1) {
          this.setState(prevState => ({
            hasGoodFit: [...prevState.hasGoodFit, { service: obj.values.name, goodFit: 1 }]
          }))
        } else {
          setSelectedServices(servicesObjects, target)
        }
      }
    }
    if (selectedServices) {
      return (
        <div className="services_selector__container">
          <div className="services_selector">
          <h1>Services Selector</h1>
          <GetHubdbTable HubdbTable={moduleData.hubdb_table} Services={moduleData.services} setSelectedServices={setSelectedServices} checkGoodBadFit={checkGoodBadFit} servicesObjects={servicesObjects} setGoodFit={setGoodFit} setBadFit={setBadFit} hasGoodFit={hasGoodFit} /></div>
          <div className="selected_services">
            <SelectedServices selectedServices={selectedServices} removeSelectedServices={removeSelectedServices} />
          </div>
        </div>
      )
    } else {
      return (
        <div className="services_selector__container">
          <div className="services_selector">
          <h1>Services Selector</h1>
          <GetHubdbTable HubdbTable={moduleData.hubdb_table} Services={moduleData.services} setSelectedServices={setSelectedServices} checkGoodBadFit={checkGoodBadFit} servicesObjects={servicesObjects} setGoodFit={setGoodFit} setBadFit={setBadFit} hasGoodFit={hasGoodFit} /></div>
        </div>
      )
    }
  }
}
export default App
