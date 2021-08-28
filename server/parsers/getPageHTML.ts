import puppeteer from 'puppeteer'
import axios from 'axios'

export const getDynamicPageHTML = async (url: string) => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForTimeout(1000)
  // @ts-ignore
  const html: string = await page.evaluate(() => document.querySelector('body').innerHTML)
  await page.close()
  await browser.close()
  return html
}

export const getStaticPageHTML = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}
