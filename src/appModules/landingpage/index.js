import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getAll, getYearWiseData, getLaunchWiseData, getLandWiseData, getMultipleFilterWiseData
} from '../../actions/index';
import '../../scss/landingPageStyles.scss';

class LandingPage extends Component {
    state = {
        activeIndex: null,
        successlaunchIndex: null,
        successlandIndex: null,
        year: '',
        launch: '',
        land: '',
    }

    componentDidMount() {
        if (window.performance) {
            if (performance.navigation.type == 1) {
                this.props.getAll();
                this.props.history.push('/');
            } else {
                this.props.getAll();
            }
        }

    }

    handleMultipleFilters = () => {
        const { year, launch, land } = this.state;

        if (year !== '' && launch !== '' && land !== '') {
            this.props.history.push('/all');
            this.props.getMultipleFilterWiseData(year, launch, land);
        } else if (launch !== '' && land !== '') {
            this.props.history.push('/all');
            this.props.getMultipleFilterWiseData(null, launch, land);
        } else if (year !== '' && launch !== '') {
            this.props.history.push('/all');
            this.props.getMultipleFilterWiseData(year, launch, null);
        } else if (year !== '' && land !== '') {
            this.props.history.push('/all');
            this.props.getMultipleFilterWiseData(year, null, land);
        } else if (year !== 'null' && launch === '' && land === '') {
            this.props.getYearWiseData(year);
            this.props.history.push('/yearwise');
        } else if (launch !== 'null' && year === '' && land === '') {
            this.props.getLaunchWiseData(launch);
            this.props.history.push('/launchwise');
        } else if (land !== 'null' && year === '' && launch === '') {
            this.props.getLandWiseData(land);
            this.props.history.push('/landwise');
        } else {
            this.props.getAll();
        }
    }

    handleFilters = async (e, type, index, year, launch, land) => {
        e.preventDefault();
        const { activeIndex, successlaunchIndex, successlandIndex } = this.state;

        if (type === "year") {
            if (index === activeIndex) {
                this.setState({ activeIndex: null, year: '' }, () => {
                    this.handleMultipleFilters();
                });
            } else {
                this.setState({
                    activeIndex: index, year: year,
                }, () => {
                    this.props.history.push('/yearwise');
                    this.handleMultipleFilters();
                });
            }

        } else if (type === "launch") {
            if (index === successlaunchIndex) {
                this.setState({ successlaunchIndex: null, launch: '' }, () => {
                    this.handleMultipleFilters();
                });
            } else {
                this.setState({
                    successlaunchIndex: index, launch: launch,
                }, () => {
                    this.props.history.push('/launchwise');
                    this.handleMultipleFilters();
                });
            }
        } else if (type === "land") {
            if (index === successlandIndex) {
                this.setState({ successlandIndex: null, land: '' }, () => {
                    this.handleMultipleFilters();
                });
            } else {
                this.setState({
                    successlandIndex: index, land: land,
                }, () => {
                    this.props.history.push('/landwise');
                    this.handleMultipleFilters();
                });
            }
        }
    }

    returnTypeWiseData = (type, sv) => {
        let id1 = type === "launch" ? 0 : 2,
            id2 = type === "launch" ? 1 : 3;
        return (
            <div className="successflex">
                <span className="launch-year-title mt">Successful {type}</span>
                <hr className="hr-line" />
                <div className="grid-container">
                    <span className={sv === id1 ? "active-year" : "inactive-year"}
                        onClick={type === "launch" ?
                            (e) => this.handleFilters(e, "launch", 0, "null", true, false) :
                            (e) => this.handleFilters(e, "land", 2, "null", false, true)
                        } >
                        True
                            </span>
                    <span className={sv === id2 ? "active-year" : "inactive-year"}
                        onClick={type === "launch" ?
                            (e) => this.handleFilters(e, "launch", 1, "null", false, false) :
                            (e) => this.handleFilters(e, "land", 3, "null", false, false)
                        }>
                        False
                            </span>
                </div>
            </div>
        )
    }

    render() {
        const { activeIndex, successlaunchIndex, successlandIndex, year, land, launch } = this.state;
        const { getAllDetailsRes, getYearWiseDetailsRes, getLandWiseDetailsRes, getLaunchWiseDetailsRes, getMultipleFilterWiseDetailsRes } = this.props;
        const { pathname } = this.props.location;

        let data = '';
        if (pathname === '/yearwise' && year !== '') {
            data = getYearWiseDetailsRes;
        } else if (pathname === '/landwise' && land !== '') {
            data = getLandWiseDetailsRes;
        } else if (pathname === '/launchwise' && launch !== '') {
            data = getLaunchWiseDetailsRes;
        } else if (pathname === '/all' && year !== '' || launch !== '' || land !== '') {
            data = getMultipleFilterWiseDetailsRes;
        } else if (year === '' || land === '' || launch === '') {
            data = getAllDetailsRes;
        }
        const years = [
            { year: "2006" }, { year: "2007" }, { year: "2008" },
            { year: "2009" }, { year: "2010" }, { year: "2011" },
            { year: "2012" }, { year: "2013" }, { year: "2014" },
            { year: "2015" }, { year: "2016" }, { year: "2017" },
            { year: "2018" }, { year: "2019" }, { year: "2020" },
        ];

        return (
            <div className="mainDiv">
                <span className="title">SpaceX Launch Programs</span>
                <div className="cards-mainDiv">
                    <div className="filtersCard">
                        <span className="filter-title">Filters</span>
                        <span className="launch-year-title">Launch Year</span>
                        <hr className="hr-line" />
                        <div className="grid-container">
                            {
                                years.map((item, index) => (
                                    <div className={index === activeIndex ? "active-year" : "inactive-year"}
                                        onClick={(e) => this.handleFilters(e, "year", index, item.year, false, false)} key={index}>
                                        {item.year}
                                    </div>
                                ))
                            }
                        </div>
                        {this.returnTypeWiseData("launch", successlaunchIndex)}
                        {this.returnTypeWiseData("land", successlandIndex)}
                        <br /><br />
                    </div>
                    <div className="main-spacex-grid-container">
                        {

                            data.length === undefined ? <span className="loading">Loading...</span> :
                                data.length === 0 ?
                                    <div className="filtersdiv">
                                        <span className="nodatamsg">No data found with given filters</span>
                                        <span className="nodatamsg">(Please try with other filters)</span>
                                    </div>
                                    :
                                    <div className="spacex-grid-container">
                                        {
                                            data.length >= 1 && data.map((item, index) => (
                                                <div className="spacexDataCard" key={index}>
                                                    <div className="mission-image-bg">
                                                        <img src={item.links.mission_patch} className="mission-image" />
                                                    </div>
                                                    <div className="flexrow">
                                                        <span className="mission-title">{item.mission_name}</span>
                                                        <span className="mission-title">&nbsp;#{item.flight_number}</span>
                                                    </div>
                                                    <div className="flexrow">
                                                        <span className="mission-side-title">Mission Ids:&nbsp;</span>
                                                        {
                                                            item.mission_id.length > 0 ?
                                                                <ul>
                                                                    {
                                                                        item.mission_id.map((item, index) => (
                                                                            <li className="mission-data" key={index}>{item}</li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                                :
                                                                <span className="mission-data">No Mission IDs</span>

                                                        }
                                                    </div>
                                                    <div className="flexrow">
                                                        <span className="mission-side-title">Launch Year:&nbsp;</span>
                                                        <span className="mission-data">{item.launch_year}</span>
                                                    </div>
                                                    <div className="flexrow">
                                                        <span className="mission-side-title">Successful Landing:&nbsp;</span>
                                                        <span className="mission-data">{item.rocket.first_stage.cores[0].land_success}</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                        }
                    </div>
                </div>
                <div className="footerdiv mt">
                    <span className="filter-title">Developed By:</span>
                    <span>&nbsp;D Ranadheer Raju</span>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ userReducer }) {
    return {
        getAllDetailsRes: userReducer.getAllDetails,
        getYearWiseDetailsRes: userReducer.getYearWiseDetails,
        getLaunchWiseDetailsRes: userReducer.getLaunchWiseDetails,
        getLandWiseDetailsRes: userReducer.getLandWiseDetails,
        getMultipleFilterWiseDetailsRes: userReducer.getMultipleFilterWiseDetails
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getAll: getAll,
            getYearWiseData: getYearWiseData,
            getLaunchWiseData: getLaunchWiseData,
            getLandWiseData: getLandWiseData,
            getMultipleFilterWiseData: getMultipleFilterWiseData
        },
        dispatch
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);