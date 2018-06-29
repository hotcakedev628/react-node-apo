import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { unPersistMyInfo } from '../../services/localStorage';
import { compose } from 'redux';

const Navbarr = ({isManager, isAuthenticated, logout}) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <NavLink className="navbar-brand" to="/"> Bikes Rental © </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" >
                {
                    isManager ?
                        <li className="nav-item">
                            <NavLink activeClassName="active" id="usersTab" to='/users' className="nav-link">Users</NavLink>
                        </li> :
                        null

                }
                <li className="nav-item">
                    <NavLink activeClassName="active" id="myProfileTab" to='/myProfile' className="nav-link">My profile</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="active" id="inviteUserTab" to='/bikes/listing' className="nav-link">Bikes</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="active" id="bikesForReservationTab" to='/bikesForReservation' className="nav-link">Bikes For Reservation</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink activeClassName="active" id="mapTab" to='/map' className="nav-link">Map</NavLink>
                </li>
            </ul>
            {1 > 0 &&
                <h2>
                    You have sss unread messages.
                        </h2>
            }
            {
                isAuthenticated &&
                <ul className="navbar-nav ml-auto mr-5" >
                    <li className="nav-item" onClick={() => logout()}>
                        <a className="nav-link link">Logout</a>
                    </li>
                </ul>
            }
        </div>

    </nav>
)

Navbarr.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isManager: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
        isAuthenticated: state.authStoreState.isAuthenticated,
        isManager: state.authStoreState.role==='manager'
    })

const mapDispatchToProps = dispatch => ({
        logout: () => {
            unPersistMyInfo()
            dispatch({ type: 'LOGGED_OUT' })
        }
})

export const Navbar = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Navbarr)



