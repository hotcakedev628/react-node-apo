import React from 'react'
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import Title from '../text/Title';
import queryString from 'query-string'
import { BikeReservationsTable } from '../tables/BikeReservationsTable';
import { PaginationContainer } from '../pagination/PaginationContainer';
import { PageContentLayout } from '../layout/PageContentLayout';


export class BikeReservations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { reservations: [], skip: 0 };
    }
    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        ApiService.getBikeReservations(queryString.parse(this.props.location.search).bikeId, { skip: this.state.skip }).then(x => {
            this.setState({ reservations: x.items, pageCount: x.count / 10 })
        }).catch(err => {
            toast.error(err.data.msg)
        })
    }


    render() {
        return (
            <React.Fragment>
                <Title> {queryString.parse(this.props.location.search).label} Model Reservations </Title>
                <PageContentLayout isRendering={this.state.reservations.length} unAvailabilityText="No reservations for this bike">
                    <BikeReservationsTable reservations={this.state.reservations} />
                    <PaginationContainer pageCount={this.state.pageCount} handlePageClick={skip => this.setState({ skip }, () => this.fetchData())} />
                </PageContentLayout>
            </React.Fragment>
        )

    }

}
