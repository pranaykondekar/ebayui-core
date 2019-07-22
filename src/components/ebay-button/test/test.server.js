const { render } = require('@marko/testing-library');
const { expect, testPassThroughAttributes } = require('../../../common/test-utils/server');
const template = require('..');

const properties = {
    priority: ['primary', 'secondary'],
    size: ['small', 'large']
};

Object.keys(properties).forEach(property => {
    const values = properties[property];
    values.forEach(value => {
        test(`renders button with ${property}=${value}`, async() => {
            const { getByRole } = await render(template, { [property]: value });
            expect(getByRole('button')).has.class(`btn--${value}`);
        });
    });
});

[false, true].forEach(fluid => {
    test(`renders button with fluid=${fluid}`, async() => {
        const { getByRole } = await render(template, { fluid });
        expect(getByRole('button'))[fluid ? 'has' : 'not'].class('btn--fluid');
    });
});

test('renders defaults', async() => {
    const { getByRole } = await render(template);
    expect(getByRole('button')).has.class('btn--secondary');
});

test('renders with id override', async() => {
    const { getByRole } = await render(template, { id: 'test' });
    expect(getByRole('button')).has.id('test');
});

test('renders with type override', async() => {
    const { getByRole } = await render(template, { type: 'submit' });
    expect(getByRole('button')).has.attr('type', 'submit');
});

test('does not apply priority class for unsupported value', async() => {
    const { getByRole } = await render(template, { priority: 'none' });
    expect(getByRole('button'))
        .does.not.have.class('btn--none')
        .and.does.not.have.class('btn--secondary');
});

test('renders fake version', async() => {
    const { getByLabelText } = await render(template, {
        href: '#',
        size: 'small',
        priority: 'primary',
        htmlAttributes: {
            ariaLabel: 'fake button'
        }
    });

    const btn = getByLabelText('fake button');
    expect(btn).has.attr('href', '#');
    expect(btn).has.property('tagName', 'A');
    expect(btn)
        .has.class('fake-btn--small')
        .and.class('fake-btn--primary');
});

test('renders disabled version', async() => {
    const { getByRole } = await render(template, { disabled: true });
    expect(getByRole('button')).has.attr('disabled');
});

test('renders partially disabled version', async() => {
    const { getByRole } = await render(template, { partiallyDisabled: true });
    expect(getByRole('button')).has.attr('aria-disabled', 'true');
});

test('renders expand variant', async() => {
    const { getByRole } = await render(template, { variant: 'expand' });
    expect(getByRole('button')).has.class('expand-btn');
});

test('renders expand variant with no text', async() => {
    const { getByRole } = await render(template, {
        variant: 'expand',
        noText: true
    });
    expect(getByRole('button'))
        .has.class('expand-btn')
        .and.class('expand-btn--no-text');
});

test('renders icon variant', async() => {
    const { getByLabelText } = await render(template, {
        variant: 'icon',
        htmlAttributes: {
            ariaLabel: 'icon button'
        }
    });

    expect(getByLabelText('icon button')).has.class('icon-btn');
});

test('renders badged icon variant', async() => {
    const { getByLabelText } = await render(template, {
        variant: 'icon',
        badgeNumber: 5,
        badgeAriaLabel: '5 Items',
        htmlAttributes: {
            ariaLabel: 'Badged button'
        }
    });

    expect(getByLabelText('Badged button')).has.class('icon-btn--badged');
    expect(getByLabelText('5 Items')).has.text('5');
});

testPassThroughAttributes(template);
