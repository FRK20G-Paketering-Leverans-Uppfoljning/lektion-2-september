import { shallowMount } from '@vue/test-utils';
import Insults from '@/components/Insults.vue';
import { enableFetchMocks } from 'jest-fetch-mock';

/**
 * När användaren klickar på en knapp ska en Shakespeare förelämpning slumpas och visas. 
 * När användaren klickar på knappen ska en ny förelämpning slumpas. 
 * Innan användaren har klickat för första gången på knappen så ska 
 * ingen förelämpning visas utan det ska stå "insult me!"
 */

/**
 * Varför mocka API-anrop?
 * Eftersom fetch är en metod som finns enbart i webbläsaren på window-objektet så går det
 * inte att använda i Jest som körs i en node-miljö i terminalen.
 * I våra tester behöver vi ersätta fetch med något annat.
 * Vi vill inte göra onödiga API-anrop som ökar belastningen på servern och gör våra
 * tester långsammare.
 * Vi vill försäkra oss om att vi får samma API-svar tillbaka varje gång.
 */

describe('Insults.vue', () => {
  it('should show "Insult me!" when rendered', () => {
    const expected = 'Insult me!';
    const wrapper = shallowMount(Insults);

    const insultElem = wrapper.find('h2');
    const text = insultElem.text();
    
    expect(text).toBe(expected);
  });

  // it('should show a new insult when button clicked', async () => {
  //   const insults = ["Never hung poison on a fouler toad - Rickard III", 
  //   "He thinks too much: such men are dangerous. - Julius Ceasar"];
  //   const wrapper = shallowMount(Insults);

  //   const buttonElem = wrapper.find('button');
  //   await buttonElem.trigger('click');

  //   const insultElem = wrapper.find('h2');
  //   const text = insultElem.text();

  //   expect(insults).toContain(text);
  // });
})

describe('Insults.vue - Fetch calls', () => {
  beforeEach(() => {
    enableFetchMocks(); //Startar fetch-mocken och ger ett fetch-objekt att jobba med
    fetch.mockResponseOnce(JSON.stringify({"insult":"Out, you green-sickness carrion! Out, you baggage! You tallow-face!",
    "play":"Romeo and Juliet"})); //Mockar ett fetch-svar
  });

  it('should make a fetch call', async () => {
    const expected = 1;
    const wrapper = shallowMount(Insults);

    const buttonElem = wrapper.find('button');
    await buttonElem.trigger('click');

    //Nedan kollar vi att vi gjort ett fetch-anrop
    const calls = fetch.mock.calls.length; //Detta kommer från jest-mock-fetch
    console.log('Number of fetch calls: ', calls);
    expect(calls).toBe(expected);
  });

  it('should show the results from fetch call correctly', async () => {
    const expected = 'Out, you green-sickness carrion! Out, you baggage! You tallow-face! - Romeo and Juliet';
    const wrapper = shallowMount(Insults);

    //Sätter insult-propertyn till svaret från ett fetch-anrop
    await wrapper.setData({ insult: {"insult":"Out, you green-sickness carrion! Out, you baggage! You tallow-face!",
    "play":"Romeo and Juliet"} }) //setData kommer ifrån vue-test-utils

    const insultElem = wrapper.find('h2');
    const text = insultElem.text();
    console.log(text);
    expect(text).toBe(expected);
  });
});
