import React, { Component } from 'react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import { Link } from '../routes';
import { Card, Button } from 'semantic-ui-react';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    renderCards() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            }
        })

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    <Link route="/campaigns/new">
                        <a className='item'>
                            <Button floated='right' content='Add Campaign' icon='add' primary />
                        </a>
                    </Link>
                    {this.renderCards()}
                </div>
            </Layout>
        )
    }
}

export default CampaignIndex;