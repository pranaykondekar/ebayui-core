const { expect, use } = require('chai');
const { render } = require('@marko/testing-library');
const { testPassThroughAttributes } = require('../../../common/test-utils/server');
const template = require('..');

use(require('chai-dom'));

test('renders default switch', async () => {
    const { getByRole } = await render(template);
    const switchControl = getByRole("switch");
    expect(switchControl).to.have.class("switch__control");
    expect(switchControl.parentElement).to.have.class("switch");
    expect(switchControl.nextElementSibling).to.have.class("switch__button");
    expect(switchControl).to.have.property("disabled", false);
});

test('renders disabled switch', async () => {
    const { getByRole } = await render(template, { disabled: true });
    const switchControl = getByRole("switch");
    expect(switchControl).to.have.property("disabled", true);
});

testPassThroughAttributes(template);
