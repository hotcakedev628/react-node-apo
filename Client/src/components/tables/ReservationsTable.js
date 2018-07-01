import React from 'react'
import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';
import moment from 'moment'

const ReservationsTable = ({ reservations, onCancelClick }) => (
    <div>
        <table id="ReservationsTable" className="table table-hover">
            <thead>
                <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Bike Model</th>
                    <th>Bike Color</th>
                    <th>Bike Weight</th>
                    {
                        onCancelClick && <th className="text-center">Cancel Reservation</th>
                    }
                    
                </tr>
            </thead>
            <tbody>
                {
                    reservations.map((item, index) =>
                        (
                            <tr key={index}>
                                <td>{moment(item.startDate).format('MM/DD/YYYY')}</td>
                                <td>{moment(item.endDate).format('MM/DD/YYYY')}</td>
                                <td>{item.bikeId.model}</td>
                                <td>{item.bikeId.color}</td>
                                <td>{item.bikeId.weight}</td>
                                {
                                    onCancelClick &&
                                    <td className="text-center ">
                                        <a className="link" onClick={() => onCancelClick(item)}>
                                            <i className="fa fa-thumbs-down text-danger"> </i>
                                        </a>
                                    </td>
                                }

                            </tr>
                        )
                    )}
            </tbody>
        </table>
    </div>

)

export default ReservationsTable

ReservationsTable.propTypes = {
    reservations: PropTypes.array,
    onCancelClick: PropTypes.func,
};