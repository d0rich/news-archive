import Nightmare from 'nightmare'
import axios from 'axios'

export const getDynamicPageHTML = async (url: string) => {
  console.log('Starting browser to load ' + url)
  const nightmare = new Nightmare({ show: false })
  console.log('Browser started. Getting ' + url + ' ...')
  // @ts-ignore
  const html: string = await (nightmare
    .goto(url)
    .wait('body')
    // @ts-ignore
    .evaluate(() => document.querySelector('body').innerHTML)
    .end())
  console.log(`Page ${url} got`)
  return html
}

export const getStaticPageHTML = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}
