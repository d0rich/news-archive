import puppeteer from 'puppeteer'
import axios from 'axios'

export const getDynamicPageHTML = async (url: string) => {
  console.log('Starting browser to get ' + url + '...')
  const browser = await puppeteer.launch()
  console.log('Getting ' + url + ' ...')
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForTimeout(1000)
  // @ts-ignore
  const html: string = await page.evaluate(() => document.querySelector('body').innerHTML)
  console.log(`Page ${url} got`)
  return html
}

export const getStaticPageHTML = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}
