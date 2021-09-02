import { shallowMount } from '@vue/test-utils'
import Insults from '@/components/Insults.vue'

/**
 * När användaren klickar på en knapp ska en Shakespeare förelämpning slumpas och visas. 
 * När användaren klickar på knappen ska en ny förelämpning slumpas. 
 * Innan användaren har klickat för första gången på knappen så ska 
 * ingen förelämpning visas utan det ska stå "insult me!"
 */

describe('Insults.vue', () => {
  it('should show "Insult me!" when rendered', () => {
    const expected = 'Insult me!';
    const wrapper = shallowMount(Insults);

    const insultElem = wrapper.find('h2');
    const text = insultElem.text();
    
    expect(text).toBe(expected);
  });

  it('should show a new insult when button clicked', async () => {
    const insults = ["Never hung poison on a fouler toad - Rickard III", 
    "He thinks too much: such men are dangerous. - Julius Ceasar"];
    const wrapper = shallowMount(Insults);

    const buttonElem = wrapper.find('button');
    await buttonElem.trigger('click');

    const insultElem = wrapper.find('h2');
    const text = insultElem.text();

    expect(insults).toContain(text);
  });
})
