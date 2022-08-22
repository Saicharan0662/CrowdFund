import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {

    state = {
        approveLoading: false,
        finalizeloading: false,
    }

    onApprove = async (e) => {
        this.setState({ approveLoading: true })
        const campaign = Campaign(this.props.address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            })
        } catch (error) {
            alert(error.message)
        }
        this.setState({ approveLoading: false })
    }

    onFinalize = async (e) => {
        this.setState({ finalizeloading: true })
        const campaign = Campaign(this.props.address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            })
        } catch (error) {
            alert(error.message)
        }
        this.setState({ finalizeloading: false })
    }

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        const readyToFinalize = request.approvalCount > approversCount / 2;
        return (
            <Row disabled={request.complete} positive={!request.complete && readyToFinalize}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                {!request.complete &&
                    <Cell>
                        <Button loading={this.state.approveLoading} basic color='green' onClick={this.onApprove}>Approve</Button>
                    </Cell>}
                {!request.complete &&
                    <Cell>
                        <Button loading={this.state.finalizeloading} basic color='teal' onClick={this.onFinalize}>Finalize</Button>
                    </Cell>}
            </Row>
        )
    }
}

export default RequestRow;