const { expect, use } = require('chai');
const { render } = require('@marko/testing-library');
const { testPassThroughAttributes } = require('../../../common/test-utils/server');
const template = require('../index.marko');

use(require('chai-dom'));

it('renders defaults', async() => {
    const { getByText } = await render(template, { number: 5 });
    expect(getByText(/\d+/)).has.text('5');
});

it('renders number with rounded-up value', async() => {
    const { getByText } = await render(template, { number: 5.6 });
    expect(getByText(/\d+/)).has.text('6');
});

it('does not render with negative value', async() => {
    const { getByText } = await render(template, { number: -5 });
    expect(() => getByText(/\d+/)).to.throw('Unable to find an element');
});

describe('given number is a string', () => {
    it('renders number with coerced string', async() => {
        const { getByText } = await render(template, { number: '5' });
        expect(getByText(/\d+/)).has.text('5');
    });

    it('renders number with rounded-up string', async() => {
        const { getByText } = await render(template, { number: '5.4' });
        expect(getByText(/\d+/)).has.text('5');
    });

    it('does not renders with an invalid string', async() => {
        const { getByText } = await render(template, { number: 'five' });
        expect(() => getByText(/\d+/)).to.throw('Unable to find an element');
    });

    it('does not renders with a negative string', async() => {
        const { getByText } = await render(template, { number: '-5' });
        expect(() => getByText(/\d+/)).to.throw('Unable to find an element');
    });
});

it('truncates when the value is greater than 99', async() => {
    const { getByText } = await render(template, { number: 150 });
    expect(getByText(/\d+/)).has.text('99+');
});

testPassThroughAttributes(template, { input: { number: 1 } });
