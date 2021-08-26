import Nightmare from 'nightmare'

const nightmare = new Nightmare({ show: true })

export const getPageHTML = async (url: string) => {
  const html = await (nightmare
    .goto(url)
    .wait('body')
    // @ts-ignore
    .evaluate(() => document.querySelector('body').innerHTML)
    .end())
  return html
}
