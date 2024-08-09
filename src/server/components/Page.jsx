import { component } from '@dark-engine/core'

const Page = component(({ currentLanguage, title }) => {
  return (
    <html lang={currentLanguage}>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <base href='/' />
        <title>{title}</title>

        <link rel='shortcut icon' href='/favicon.ico' />
        <script type='module' src='/_allanite/index.js' defer />
        ___styleTags
      </head>
      <body>
        <div id='dark-root'>___app</div>
      </body>
    </html>
  )
})

export default Page
