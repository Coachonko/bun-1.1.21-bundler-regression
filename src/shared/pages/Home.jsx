import { component } from '@dark-engine/core'
import { useTranslation } from '@wareme/translations'

import WideImage from '../components/WideImage'

const Home = component(() => {
  const { t } = useTranslation('home')

  return (
    <>
      <WideImage src='_public/hero.jpg' alt={t('imageAlt')} />
    </>
  )
})

export default Home
