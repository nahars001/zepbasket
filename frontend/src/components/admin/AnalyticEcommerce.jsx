import React from 'react'

const AnalyticEcommerce = ({ title, number }) => {
    return (
        <div className='col-md-3 p-1'>
            <div className='border rounded d-flex justify-content-between p-3 bg-body-secondary'>
                <p className='fs-6 align-content-center'>{title}</p>
                <p className='fs-1'>{number}</p>
            </div>
        </div>
    )
}

export default AnalyticEcommerce
