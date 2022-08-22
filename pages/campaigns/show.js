import React, { Component } from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = Campaign(address)
        const summary = await campaign.methods.getSummary().call();

        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            address: address
        }
    }

    renderCards() {
        const {
            minimumContribution,
            balance,
            requestCount,
            approversCount,
            manager
        } = this.props;

        const items = [
            {
                header: manager,
                meta: "Address of manager",
                description: "The manager who created this campaign and can create requests.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution (wei)",
                description: "You must contribute atleast this much wei to become a contributor.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: requestCount,
                meta: "Number of Requests",
                description: "A requests tries to withdraw money from the contract. Request must be approved by the approvers.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: approversCount,
                meta: "Number of Approvers",
                description: "Number of people who already have donated.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: "Campaign Balance (ether)",
                description: "The balance is how much money the campaign has left to spent.",
                style: { overflowWrap: 'break-word' }
            },
        ]

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={4}><ContributeForm address={this.props.address} /></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a >
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow