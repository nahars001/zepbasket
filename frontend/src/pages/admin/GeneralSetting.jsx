import React, { useState } from 'react'
import MetaData from '../../components/MetaData'
import Config from '../../helpers/Config'

const GeneralSetting = () => {
    const [settingInfo, setSettingInfo] = useState({
        title: Config.title,
        currency: Config.currency,
        currencyCode: Config.currencyCode,
    })

    const inputHandler = () => {

    }
    const submitHandler = () => {

    }
    return (
        <div className='container'>
            <MetaData pageName={"General Setting"} />
            <p className='fs-3'>General Setting</p>
            <p className='text-danger'>This Section Is Not Working Right Now</p>
            <div className=" pt-md-2 pb-2 justify-content-center">
                <div className="border auth-form border-1 p-3 ">
                    <form action="" className='row'>
                        <div className="pt-3 col-md-6">
                            <label htmlFor="" className="form-label fw-bold">
                                Title
                            </label>
                            <input
                                className="form-control rounded-0"
                                type="text"
                                name="title"
                                value={settingInfo.title}
                                placeholder="Please Enter Your Title"
                                onChange={(e) => inputHandler(e)}
                            />
                        </div>
                        <div className="pt-3 col-md-6">
                            <label htmlFor="" className="form-label fw-bold">
                                Currency
                            </label>
                            <select
                                className="form-control rounded-0"
                                type="text"
                                name="title"
                                value={settingInfo.currency}
                                placeholder="Please Enter Your Title"
                                onChange={(e) => inputHandler(e)}
                            >
                                <option value="$">US Dollar($)</option>
                                <option value="₹">Indian Rupees(₹)</option>
                            </select>
                        </div>
                        <div className="pt-3 col-md-6 align-content-end">
                            <button className="auth-btn bg-gn" onClick={submitHandler}>
                                Edit Details
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GeneralSetting
