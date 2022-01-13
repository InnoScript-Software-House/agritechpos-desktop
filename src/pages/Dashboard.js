import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Navigation from '../components/navigation'

const menu = [
    {
        "label": "ပစ္စည်းစာရင်း",
        "link": "/inventory"
    },
    {
        "label": "အရောင်းစာရင်း",
        "link": "/sell-report"
    },
    {
        "label": "ဆက်တင်",
        "link": "/setting"
    }
];

export default class DashboardPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
       
    }

    render() {
        return (
            <>
                <Navigation props={this.props} />
            </>
        )
    }
}
