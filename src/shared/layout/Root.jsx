import { component } from '@dark-engine/core'

import Theme from '../styles/Theme'
import ChangeTitle from '../components/ChangeTitle'
import AppLayout from './AppLayout'

const Root = component(({ slot }) => {
  return (
    <Theme>
      <ChangeTitle />

      <AppLayout>
        {slot}
      </AppLayout>
    </Theme>
  )
})

export default Root
