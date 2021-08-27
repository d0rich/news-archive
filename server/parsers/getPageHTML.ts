import Nightmare from 'nightmare'
import axios from 'axios'

const nightmare = new Nightmare({ show: false })

export const getDynamicPageHTML = async (url: string) => {
  // @ts-ignore
  const html: string = await (nightmare
    .goto(url)
    .wait('body')
    // @ts-ignore
    .evaluate(() => document.querySelector('body').innerHTML)
    .end())
  return html
}

export const getStaticPageHTML = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}
