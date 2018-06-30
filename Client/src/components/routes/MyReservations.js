import React from 'react'
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Title from '../text/Title';
import ReservationsTable from '../tables/ReservationsTable';

export class MyReservations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { reservations: [], skip: 0 };
    }
    componentDidMount() {
        this.fetchMyReservations()
    }

    fetchMyReservations() {
        ApiService.getMyReservations({ skip: this.state.skip }).then(x => {
            this.setState({ ...this.state, reservations: x.items, pageCount: x.count / 10 })
        }).catch(err => {
            toast.error(err.data.msg)
        })
    }

    onCancelReservation = (item) => {
        ApiService.cancelReservation(item._id).then(x => {
            this.setState((oldState)=>({ ...this.state, reservations: oldState.reservations.filter(res => res._id !== item._id) }))
        })
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let skip = Math.ceil(selected * 10);
        this.setState({ skip }, () => {
            this.fetchMyReservations();
        });
    };


    render() {
        return (
            <React.Fragment>
                <Title> My Reservations </Title>
                <div id="react-paginate">

                    <ReservationsTable reservations={this.state.reservations} onCancelClick={this.onCancelReservation} />
                    <ReactPaginate previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={<a href="">...</a>}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div >
            </React.Fragment>


        )

    }

}
