import React from 'react'
import { Helmet } from "react-helmet";
import Config from '../helpers/Config';

const MetaData = ({ pageName, description }) => {
    const desp = description || "At Zepbasket, we're revolutionizing the online shopping experience by combining cutting-edge technology with a user-centric approach."
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{pageName} - {Config.title}</title>
            <meta name="description" content={desp} />
        </Helmet>
    )
}

export default MetaData
