const { buildComponentsSideBarItems } = require('./helpers/components-sidebar');

module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Welcome',
      items: [
        'welcome/introduction',
        'welcome/design-principles',
        'welcome/contributing',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/player',
        'getting-started/providers',
        'getting-started/ui',
        'getting-started/controls',
        'getting-started/settings',
        'getting-started/styling',
        'getting-started/extending',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Components',
      items: buildComponentsSideBarItems(),
      collapsed: false,
    },
  ],
};
