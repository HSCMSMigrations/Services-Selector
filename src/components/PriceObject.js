import React, { PureComponent } from 'react'
import PricingCalculator from './PricingCalculator'
class PriceObject extends PureComponent {
  constructor(props) {
      super(props);
  }

  render() {
      const {serviceObject, price, category} = this.props
          return (
              <div>
                <PricingCalculator serviceObject={serviceObject} category={category} servicePrice={price} />
              </div>

          )
      
    }
      
  }


export default PriceObject