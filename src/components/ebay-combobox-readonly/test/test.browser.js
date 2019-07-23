
const find = require('core-js-pure/features/array/find');
const { expect, use } = require('chai');
const { render, fireEvent, cleanup } = require('@marko/testing-library');
const mock = require('./mock');
const template = require('..');

use(require('chai-dom'));
afterEach(cleanup);

/** @type import("@marko/testing-library").RenderResult */
let component;

// Tests are rendered in a form so that we can check the form data value.
const form = document.createElement("form");
before(() => document.body.appendChild(form));
after(() => document.body.removeChild(form));

describe('given the readonly combobox with 3 items', () => {
    const input = mock.Combobox_3Options;

    beforeEach(async() => {
        component = await render(template, input, { container: form });
    });

    it('then it should not be expanded', () => {
        expect(getVisibleCombobox(component)).has.attr('aria-expanded', 'false');
    });

    it('then the native select should be initialized to the first option value', () => {
        expect(new FormData(form).get(input.name)).to.equal(input.options[0].value);
    });

    describe('when the down arrow key is pressed', () => {
        beforeEach(() => {
            pressKey(getVisibleCombobox(component), {
                key: 'ArrowDown',
                keyCode: 40
            });
        });

        it('then it should not expand the combobox', () => {
            expect(getVisibleCombobox(component)).has.attr('aria-expanded', 'false');
        });

        it('then it emits the combobox-change event with the correct data', () => {
            const changeEvents = component.emitted('combobox-change');
            expect(changeEvents).has.length(1);

            const [[changeEvent]] = changeEvents;
            expect(changeEvent).has.property('index', 1);
            expect(changeEvent).has.property('selected').and.is.deep.equal([input.options[1].value]);
        });

        it('then the native select should be set to the second option value', () => {
            expect(new FormData(form).get(input.name)).to.equal(input.options[1].value);
        });
    });

    describe('when the up arrow key is pressed', () => {
        beforeEach(() => {
            pressKey(getVisibleCombobox(component), {
                key: 'ArrowUp',
                keyCode: 38
            });
        });

        it('then it should not expand the combobox', () => {
            expect(getVisibleCombobox(component)).has.attr('aria-expanded', 'false');
        });

        it('then it emits the combobox-change event with the correct data', () => {
            const changeEvents = component.emitted('combobox-change');
            expect(changeEvents).has.length(1);

            const [[changeEvent]] = changeEvents;
            expect(changeEvent).has.property('index', 0);
            expect(changeEvent).has.property('selected').and.is.deep.equal([input.options[0].value]);
        });
    });

    describe('when the button is clicked', () => {
        beforeEach(() => {
            getVisibleCombobox(component).click();
        });

        it('then it emits the event from expander-expand', () => {
            expect(component.emitted('combobox-expand')).has.length(1);
        });

        it('then it has expanded the combobox', () => {
            expect(getVisibleCombobox(component)).has.attr('aria-expanded', 'true');
        });

        describe('when an option is clicked', () => {
            beforeEach(() => {
                getVisibleOptions(component)[1].click();
            });

            it('then the native select should be set to the second option value', () => {
                expect(new FormData(form).get(input.name)).to.equal(input.options[1].value);
            });
    
            it('then it emits the combobox-change event with correct data', () => {
                const changeEvents = component.emitted('combobox-change');
                expect(changeEvents).has.length(1);
    
                const [[changeEvent]] = changeEvents;
                expect(changeEvent).has.property('index', 1);
                expect(changeEvent).has.property('selected').and.is.deep.equal([input.options[1].value]);
            });

            thenItHasCollapsed();
        });

        describe('when the text of an option is clicked', () => {
            beforeEach(() => {
                getVisibleOptions(component)[1].firstElementChild.click();
            });

            it('then the native select should be set to the second option value', () => {
                expect(new FormData(form).get(input.name)).to.equal(input.options[1].value);
            });
    
            it('then it emits the combobox-change event with correct data', () => {
                const changeEvents = component.emitted('combobox-change');
                expect(changeEvents).has.length(1);
    
                const [[changeEvent]] = changeEvents;
                expect(changeEvent).has.property('index', 1);
                expect(changeEvent).has.property('selected').and.is.deep.equal([input.options[1].value]);
            });

            thenItHasCollapsed();
        });

        describe('when the button is clicked again', () => {
            beforeEach(() => {
                getVisibleCombobox(component).click();
            });

            thenItHasCollapsed();
        });

        describe('when the escape key is pressed', () => {
            beforeEach(() => {
                pressKey(getVisibleCombobox(component), {
                    key: 'Escape',
                    keyCode: 27
                });
            });
    
            thenItHasCollapsed();
        });

        function thenItHasCollapsed() {
            it('then it emits the event from expander-collapse', () => {
                expect(component.emitted('combobox-collapse')).has.length(1);
            });
    
            it('then it has collapsed the combobox', () => {
                expect(getVisibleCombobox(component)).has.attr('aria-expanded', 'false');
            });
        }
    });
});

describe('given the readonly combobox with 3 items that is disabled', () => {
    const input = mock.Combobox_3Options_Disabled;

    beforeEach(async() => {
        component = await render(template, input, { container: form });
    });

    it('then it should not be expanded', () => {
        expect(getVisibleCombobox(component)).has.attr('aria-expanded', 'false');
    });

    describe('when the button is clicked', () => {
        beforeEach(() => {
            getVisibleCombobox(component).click();
        });

        it('then it does not emit the event from expander-expand', () => {
            expect(component.emitted('combobox-expand')).has.length(0);
        });

        it('then it has not expanded the combobox', () => {
            expect(getVisibleCombobox(component)).has.attr('aria-expanded', 'false');
        });
    });
});

function getVisibleCombobox(component) {
    return find(component.getAllByRole('combobox'), isVisible);
}

function getVisibleOptions(component) {
    return component.getAllByRole('option').filter(isVisible);
}

function isVisible(el) {
    return !el.hasAttribute('hidden') && !el.closest('[hidden]');
}

function pressKey(el, info) {
    fireEvent.keyDown(el, info);
    fireEvent.keyPress(el, info);
    fireEvent.keyUp(el, info);
}