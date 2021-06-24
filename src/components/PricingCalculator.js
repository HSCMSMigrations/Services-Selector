import React, { PureComponent } from 'react'

class PricingCalculator extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            pages: 0,
            price: 0,
            seats: 0,
            calculatorCompleted: false
        }
    }
    render() {
        const { serviceObject, servicePrice, category } = this.props
        const { isChecked, pages, price, calculatorCompleted, seats } = this.state
        const calculatorComplete = () => {
            this.setState({ calculatorCompleted: true })
        }
        const handleCheckbox = (e) => {
            this.setState({ isChecked: !isChecked })
        }
        const handlePages = (e) => {
            this.setState({
                pages: e.target.value
            })
        }
        const handleSeats = (e) => {
            this.setState({
                seats: e.target.value
            })
        }
        const togglePricing = (e) => {
            e.currentTarget.parentNode.parentNode.querySelector('.priceFormOuter').classList.add('popup')
        }
        const calculatePrice = (e) => {
            e.preventDefault();
            if (isChecked === true) {
                if (pages <= 20) {
                    this.setState({ price: 0 }, () => calculatorComplete({ price }))

                } else if (pages > 20) {
                    this.setState({ price: (pages - 20) * 20 }, () => calculatorComplete({ price }))
                }
            } else {
                this.setState({ price: pages * 20 }, () => calculatorComplete({ price }))
            }
        }
        const calculatePriceTraining = (servicePrice, seats) => (e) => {
            e.preventDefault();
            let priceInt = parseInt(servicePrice.replace(/[^0-9]+/g, ''), 10)
            this.setState({ price: priceInt * seats }, () => calculatorComplete({ price }))
        }
        if (serviceObject === 'Full Migration') {
            if (calculatorCompleted === false) {
                return (
                    <div>
                        <div className="pricing"><a href="javascript:;" className="calc" onClick={togglePricing}>Click Here for Pricing</a></div>
                        <div className="priceFormOuter">
                            <div className="priceFormInner">
                                <div className="priceWarning">
                                    <p>This price calculator only provides an estimate. The final amount will be calculated based on the migration approval request.</p>
                                </div>
                                <form action="#" className="priceCalculator">
                                    <label htmlFor="migration">Is this the customer's first migration?
                            <input type="checkbox" name="migration" id="migration" onClick={handleCheckbox} />
                                    </label>
                                    <label htmlFor="pages">How many pages does the site have?
                            <input type="number" name="pages" id="pages" onChange={handlePages} required />
                                    </label>
                                    <input type="submit" value="Calculate" onClick={calculatePrice} />
                                </form>
                            </div>
                        </div>
                    </div>

                )
            } else {
                return (
                    <p className="price">${price}</p>
                )
            }
        } else if (category === 'Customer Training') {
            if (calculatorCompleted === false) {
                return (
                    <div>
                        <div className="pricing"><a href="javascript:;" className="calc" onClick={togglePricing}>Click Here for Pricing</a></div>
                        <div className="priceFormOuter">
                            <div className="priceFormInner">
                                <div className="priceWarning">
                                    <p>This price calculator provides a price based on the number of seats looking to be purchased</p>
                                </div>
                                <form action="#" className="priceCalculator">
                                    <label htmlFor="pages">How many people are you looking to train?
                            <input type="number" name="seats" id="seats" onChange={handleSeats} required />
                                    </label>
                                    <input type="submit" value="Calculate" onClick={calculatePriceTraining(servicePrice, seats)} />
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
            else  {
                return (
                    <p className="price">${price}</p>
                )
            }
        }
        else {
            return (
                <p className="price">{servicePrice}</p>
            )
        }
    }

}


export default PricingCalculator