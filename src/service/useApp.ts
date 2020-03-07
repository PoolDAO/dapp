import { createSelector } from 'reselect'

import create, { GetState, SetState, State } from './createState'
import Pooldao, { NodeInfo, DepositNode, OperatorsItem } from './Pooldao'

export interface AppState extends State {
  provider: Pooldao
  currentAccount: string
  nodeOverview: {
    participate: number
    run: number
    end: number
    pending: number
  }
  total: {
    deposit: number
    profit: number
    rate: number
  }
  operators: OperatorsItem[]
  myNodeList: NodeInfo[]
  allNodeList: NodeInfo[]
  ethBalance: string
  poolEthBalance: string
  userDepositNodes: DepositNode[]
  updateUserDeposit(currentAccount: string): Promise<void>
  updateNodeInfoList(): Promise<void>
  updateOperators(): Promise<void>
  listener: Record<string, any>
  init(): Promise<void>
}

export const [useApp, useAppApi, useAppSelector] = create<AppState>(
  (set: SetState<AppState>, get: GetState<AppState>): AppState => ({
    provider: new Pooldao(),
    currentAccount: '',
    ethBalance: '',
    poolEthBalance: '',
    nodeOverview: {
      participate: 0,
      run: 0,
      end: 0,
      pending: 0,
    },
    total: {
      deposit: 0,
      profit: 0,
      rate: 0,
    },
    operators: [],
    myNodeList: [],
    allNodeList: [],
    userDepositNodes: [],
    listener: {},

    async init() {
      const { listener, updateOperators, provider } = get()

      const currentProvider = provider.web3.currentProvider as any

      if (listener['accountsChanged']) {
        currentProvider.removeListener(this.listener['accountsChanged'])
      }

      set(state => {
        state.listener.accountsChanged = currentProvider.on(
          'accountsChanged',
          (accounts: string[]) => {
            console.log(accounts)
            set(state => {
              state.currentAccount = accounts[0]
            })
          }
        )
      })

      await updateOperators()
    },

    async updateUserDeposit(currentAccount) {
      const { provider } = get()
      const result = await provider.getUserDepositNodes(currentAccount)
      set(state => {
        state.userDepositNodes = result
      })
    },
    async updateOperators() {
      const { provider } = get()
      const result = await provider.getOperators()

      set(state => {
        state.operators = result
      })
    },

    async updateNodeInfoList() {
      const { provider } = get()
      const result = await provider.getNodeList()
      set(state => {
        state.allNodeList = result
      })
    },
  })
)

// const getIsDeposit = () => {
//   return createSelector(
//     (state: AppState) => state.
//   )
// }

export const getOperatorsItem = (address: string) => {
  return createSelector(
    (state: AppState) => state.operators,
    operators => {
      return (
        operators.find(item => {
          return item.address === address
        }) || null
      )
    }
  )
}

export default useApp
