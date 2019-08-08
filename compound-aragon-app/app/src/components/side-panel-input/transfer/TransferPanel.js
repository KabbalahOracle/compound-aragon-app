import React from 'react'
import styled from 'styled-components'
import {TabBar} from '@aragon/ui'

import Deposit from './Deposit'
import Withdraw from './Withdraw'

const initialState = {
    screenIndex: 0,
}

class TransferPanel extends React.Component {
    static defaultProps = {
        onWithdraw: () => {
        },
        onDeposit: () => {
        },
        proxyAddress: null,
    }

    state = {
        ...initialState,
    }

    componentWillReceiveProps({opened}) {
        if (opened && !this.props.opened) {
            // Reset the state on the panel re-opening, to avoid flickering when it's still closing
            this.setState({...initialState})
        }
    }

    handleChange = screenIndex => {
        this.setState({screenIndex})
    }

    render() {
        const {screenIndex} = this.state
        const {appState, handleDeposit, handleWithdraw} = this.props
        return (
            <div>
                <TabBarWrapper>
                    <TabBar
                        items={['Deposit', 'Withdraw']}
                        selected={screenIndex}
                        onChange={this.handleChange}
                    />
                </TabBarWrapper>

                {screenIndex === 0 && (
                    <Deposit
                        appState={appState} handleDeposit={handleDeposit}
                    />
                )}
                {screenIndex === 1 && (
                    <Withdraw
                        appState={appState} handleWithdraw={handleWithdraw}
                    />
                )}
            </div>
        )
    }
}

const TabBarWrapper = styled.div`
  margin: 0 -30px 30px;
`

export default TransferPanel
