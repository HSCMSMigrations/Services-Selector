import React, { PureComponent } from "react";
class GoodBadFit extends PureComponent {
    constructor(props) {
        super(props);
        
    }
    render() {
        const { setGoodFit, services, setBadFit, hasGoodFit } = this.props
        console.log(hasGoodFit.length)
        if (!hasGoodFit.length > 0) {
            return null
        } else {
            console.log("hasGoodBadFit = " + hasGoodFit)
            let goodFit = ""
            for (var obj of hasGoodFit) {
                goodFit = obj.service
            }
            console.log(goodFit)
            let fit = services.filter(serviceNew => serviceNew.values.name === goodFit)
            return (
                <div className="goodBad-popup">
                    <div className="goodBad-poppup-inner">
                        {fit.filter(serviceNew => serviceNew.values.name === goodFit).map(service =>
                            <table>
                                <tr>
                                    <td>Good Fit</td>
                                    <td>Bad Fit</td>
                                </tr>
                                <tr>
                                    <td dangerouslySetInnerHTML={{ __html: service.values.good_fit }}></td>
                                    <td dangerouslySetInnerHTML={{ __html: service.values.bad_fit }}></td>

                                </tr>
                                <tr>
                                    <td><button onClick={setGoodFit(service)}>Good Fit</button></td>
                                    <td><button onClick={setBadFit(service)}>Bad Fit</button></td>
                                </tr>
                            </table>
                        )
                        }
                    </div>
                </div>
            )
        }


    }
}
export default GoodBadFit