import create, { GetState, SetState, State } from './createState'
import Pooldao from './Pooldao'

export interface AppState extends State {
  provider?: Pooldao
}

export const [useApp, useAppApi] = create<AppState>(
  (set: SetState<AppState>, get: GetState<AppState>): AppState => ({
    provider: undefined,
  })
)

export default useApp