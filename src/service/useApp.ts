import create, { GetState, SetState, State } from './createState'
import Pooldao from './Pooldao'

export interface AppState extends State {
  provider: Pooldao
  currentAccount: string
  ethBalance: string
  poolBalance: string
}

export const [useApp, useAppApi] = create<AppState>(
  (set: SetState<AppState>, get: GetState<AppState>): AppState => ({
    provider: new Pooldao(),
    currentAccount: '',
    ethBalance: '',
    poolBalance: '',
  })
)

export default useApp
