import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { courseInfo, domains } from './enums';

//INPUT CATEGORY
const COURSE_CATEGORY = domains.MATH_AND_LOGIC


function arrayToCSV (data) {
  let csv = data.map(row => Object.values(row));
  csv.unshift(Object.keys(data[0]));
  return csv.join('\n');
}

@Injectable()
export class AppService {

  private getUrl = (pageno: number = 1, domain: domains = COURSE_CATEGORY): string => {
    let topic = domain.trim().split(" ").join("%20") //
    return `https://www.coursera.org/search?page=${pageno}&index=prod_all_launched_products_term_optimization&topic=${topic}`
  }

  async getAllCourses(location = '') {
    try {
      let courseList: courseInfo[] = [];
      let pageno: number = 1;

      //-->@Input Category
      let domain: domains = COURSE_CATEGORY 


      const browser = await puppeteer.launch({ headless: true, });
      const page = await browser.newPage();

      //-->@Make Search Query Base domain From Input Category
      let url = this.getUrl(pageno, domain)
      
      await page.goto(url);
      //-->.css-18msmec
      await page.waitForSelector('div.css-1pa69gt'); 
      
      // get the next button
      const nextButtonSelector = 'button[data-e2e="pagination-controls-next"]'
      let nextButton = await page.$(nextButtonSelector);

      //Check nextButton exist or disabled or not
      while (nextButton!=null && !await nextButton.evaluate((btn) => btn.disabled)) {
        await page.click(nextButtonSelector);
        await page.waitForNavigation();

        await page.waitForSelector('div.css-1pa69gt'); 

        let courseCount = await page.$$eval('div.css-1pa69gt', divs => divs.length)

        let courseNames = await page.$$eval('h2.css-bku0rr', h2s => {
          return h2s.map(h2 => h2.textContent);
        })

        let providers = await page.$$eval('span.css-14d8ngk', (spans) => {
          return spans.map(span => span.textContent);
        })

        let ratings = await page.$$eval('p.css-zl0kzj', (ps) => {
          return ps.map(p => p.textContent);
        })

        let descriptions = await page.$$eval('p.css-5or6ht', ps => {
          return ps.map(p => p.textContent)
        })

        let duration = await page.$$eval('div.css-pn23ng ~ p.css-14d8ngk', ps => {
          return ps.map(p => p.textContent)
        })

        for (let i = 0; i < courseCount; i++) {
          courseList.push({
            name: courseNames[i + 1]?.replace(/,/g, ' '),
            provider: providers[i]?.replace(/,/g, ' '),
            description: descriptions[i]?.replace(/,/g, ' '),
            rating: ratings[i]?.replace(/,/g, ' '),
            duration: duration[i]?.replace(/,/g, ' ')
          })
        }

        nextButton = await page.$(nextButtonSelector);
      }

      let results = arrayToCSV([...courseList])
      fs.writeFileSync(COURSE_CATEGORY.replace(/ /g, '_')+'.csv',results)
      await browser.close();

      return {
        'success': true,
        'message': "data scraping successfully",
        'category': COURSE_CATEGORY,
        'file': 'link'//path
      }
    } catch (error) {
      console.log(error)
    }
  }
}