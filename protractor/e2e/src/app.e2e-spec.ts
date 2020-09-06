'use strict'; // necessary for es6 output in node

import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

const expectedH1 = 'Tour of Heroes';
const expectedTitle = `${expectedH1}`;
const targetHero = { id: 15, name: 'Magneta' };
const targetHeroDashboardIndex = 3;
const nameSuffix = 'X';
const newHeroName = targetHero.name + nameSuffix;

class Hero {
  id: number;
  name: string;

  // Factory methods

  // Hero from string formatted as '<id> <name>'.
  static fromString(s: string): Hero {
    return {
      id: +s.substr(0, s.indexOf(' ')),
      name: s.substr(s.indexOf(' ') + 1),
    };
  }

  // Hero from hero list <li> element.
  static async fromLi(li: ElementFinder): Promise<Hero> {
    let stringsFromA = await li.all(by.css('a')).getText();
    let strings = stringsFromA[0].split(' ');
    return { id: +strings[0], name: strings[1] };
  }

  // Hero id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Hero> {
    // Get hero id from the first <div>
    let _id = await detail.all(by.css('div')).first().getText();
    // Get name from the h2
    let _name = await detail.element(by.css('h2')).getText();
    return {
      id: +_id.substr(_id.indexOf(' ') + 1),
      name: _name.substr(0, _name.lastIndexOf(' '))
    };
  }
}

describe('Proyecto base', () => {

  beforeAll(() => browser.get(''));

  function getPageElts() {
    let navElts = element.all(by.css('app-root nav a'));

    return {
      navElts: navElts,

      appDashboardHref: navElts.get(0),
      appDashboard: element(by.css('app-root app-dashboard')),
      topHeroes: element.all(by.css('app-root app-dashboard > div h4')),

      appHeroesHref: navElts.get(1),
      appHeroes: element(by.css('app-root app-heroes')),
      allHeroes: element.all(by.css('app-root app-heroes li')),
      selectedHeroSubview: element(by.css('app-root app-heroes > div:last-child')),

      heroDetail: element(by.css('app-root app-hero-detail > div')),

      searchBox: element(by.css('#search-box')),
      searchResults: element.all(by.css('.search-result li'))
    };
  }

  describe('Initial page', () => {

    it(`has title '${expectedTitle}'`, () => {
      expect(browser.getTitle()).toEqual(expectedTitle);
    });

    it(`has h1 '${expectedH1}'`, () => {
      expectHeading(1, expectedH1);
    });

    const expectedViewNames = ['Dashboard', 'Heroes'];
    it(`has views ${expectedViewNames}`, () => {
      let viewNames = getPageElts().navElts.map((el: ElementFinder) => el.getText());
      expect(viewNames).toEqual(expectedViewNames);
    });

    it('has dashboard as the active view', () => {
      let page = getPageElts();
      expect(page.appDashboard.isPresent()).toBeTruthy();
    });

    it('search hero Magneta', () => {
      let page = getPageElts();
      page.searchBox.sendKeys('Magneta');
      expect(page.searchResults.isPresent()).toBeTruthy();

    });


    it('browse hero Magneta from search', () => {
      let page = getPageElts();
      page.searchResults.isPresent().then(bool => {
        page.searchResults.click();
        expect(page.heroDetail.isPresent());
      });

    });

    it('browse hero Tornado from List', () => {
      let page = getPageElts();
      page.appHeroesHref.click().then(bool => {
        let hero = getHeroLiEltById(20);
        hero.click().then(bool => {
          expect(page.heroDetail.isPresent());
        })
      });
    });

    it('edit hero Tornado to Tornado Robotcop', () => {
      let page = getPageElts();
      addToHeroName(' Robocop');
      let save = element(by.buttonText('save'));
      save.click().then(bool => {
        page.appHeroesHref.click().then(bool => {
          let hero = getHeroLiEltById(20);
          hero.click().then(bool => {
            expectHeading(2, "TORNADO ROBOCOP Details");
          });
        });
      });
    });

    it('delete hero Tornado Robotcop', () => {
      let page = getPageElts();
      page.appHeroesHref.click().then(bool => {
        let hero = getHeroLiEltById(20);
        hero.element(by.buttonText('x')).click().then(bool => expect(!getHeroLiEltById(20).isPresent()));
      });

    })

  });

});

function addToHeroName(text: string): promise.Promise<void> {
  let input = element(by.css('input'));
  return input.sendKeys(text);
}

function expectHeading(hLevel: number, expectedText: string): void {
  let hTag = `h${hLevel}`;
  let hText = element(by.css(hTag)).getText();
  expect(hText).toEqual(expectedText, hTag);
};

function getHeroAEltById(id: number): ElementFinder {
  let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('..'));
}

function getHeroLiEltById(id: number): ElementFinder {
  let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('../..'));
}

async function toHeroArray(allHeroes: ElementArrayFinder): Promise<Hero[]> {
  let promisedHeroes = await allHeroes.map(Hero.fromLi);
  // The cast is necessary to get around issuing with the signature of Promise.all()
  return <Promise<any>>Promise.all(promisedHeroes);
}
