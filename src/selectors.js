const selectors = {

    main: {
        sideBar: '.sidebar-item',
        title: '.homepage__title',
        logo: '.layout__header .logo',
        donateButton: '.layout__header .donate-button',
        languageDropDown: '.layout__header .item.dropdown',
        searchButton: '.search-omnibox button',
        searchInput: '.homepage__search .search-omnibox',
        searchResult: '.layout__header .search-omnibox',
        thumbnail: '.thumbnail',
        horizonTitle: '.horizontal.divider',
        horizonIconRows: '.homepage__website-sections .header',
        lastUpdateThumbnails: '.homepage__thumbnails a',
        footer: '.layout__footer'
    },
    search: {
        header: '.section-header',
        filterPanel: '.filter-panel a.item',
        searchResultsTable: '.search-results .search__link'
    }
};

module.exports = selectors;
