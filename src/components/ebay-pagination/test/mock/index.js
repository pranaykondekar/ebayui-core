const assign = require('core-js-pure/features/object/assign');

const Base_0Items = {
    a11yPreviousText: 'Previous page',
    a11yNextText: 'Next page',
    a11yCurrentText: 'Results Pagination - Page 2',
    items: []
};

exports.Links_6Items_No_Selected = assign({}, Base_0Items, {
    items: [].concat(
        {
            type: 'previous',
            href: '#previous'
        },
        getNItems(6, i => ({
            href: `#${i}`,
            renderBody: createRenderBody(`P${i}`)
        })),
        {
            type: 'next',
            href: '#next'
        }
    )
});

exports.Links_9Items_1Selected = assign({}, Base_0Items, {
    items: [].concat(
        {
            type: 'previous',
            href: '#previous'
        },
        getNItems(9, i => ({
            href: `#${i}`,
            current: i === 1,
            renderBody: createRenderBody(`P${i}`)
        })),
        {
            type: 'next',
            href: '#next'
        }
    )
});

exports.Links_9Items_4Selected = assign({}, Base_0Items, {
    items: [].concat(
        {
            type: 'previous',
            href: '#previous'
        },
        getNItems(9, i => ({
            href: `#${i}`,
            current: i === 4,
            renderBody: createRenderBody(`P${i}`)
        })),
        {
            type: 'next',
            href: '#next'
        }
    )
});

exports.Links_9Items_7Selected = assign({}, Base_0Items, {
    items: [].concat(
        {
            type: 'previous',
            href: '#previous'
        },
        getNItems(9, i => ({
            href: `#${i}`,
            current: i === 7,
            renderBody: createRenderBody(`P${i}`)
        })),
        {
            type: 'next',
            href: '#next'
        }
    )
});

exports.Links_1Items_Navigation_Disabled = assign({}, Base_0Items, {
    items: [
        {
            type: 'previous',
            href: '#previous',
            disabled: true
        },
        {
            href: `#1`,
            renderBody: createRenderBody('Pagination content 1')
        },
        {
            type: 'next',
            href: '#next',
            disabled: true
        }
    ]
});

exports.Links_1Items_No_Navigation = assign({}, Base_0Items, {
    items: [
        {
            href: `#1`,
            renderBody: createRenderBody('Pagination content 1')
        }
    ]
});

exports.Buttons_0Selected = assign({}, Base_0Items, {
    items: [].concat(
        {
            type: 'previous'
        },
        getNItems(6, i => ({
            current: i === 0,
            renderBody: createRenderBody(`P${i}`)
        })),
        {
            type: 'next'
        }
    )
});

function getNItems(n, getAttrs) {
    return Array.from({ length: n }).map((_, i) => getAttrs(i));
}

function createRenderBody(text) {
    renderBody.text = text;
    return renderBody;
    function renderBody(out) {
        out.write(text);
    }
}