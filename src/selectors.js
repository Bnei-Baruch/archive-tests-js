const selectors = {

    main: {
        title: '.homepage__title',
        searchButton: '.search-omnibox button',
        searchInput: '.ui.action.input',
        searchResult: '.layout__header .search-omnibox',
        thumbnail: '.thumbnail',
        horizonTitle: '.horizontal.divider',
        horizonIconRows: '.homepage__website-sections .header',
        lastUpdateThumbnails: '.homepage__thumbnails a',
    },
    common: {
        sideBar: '.sidebar-item',
        logo: '.layout__header .logo',
        searchInput: '.mobile-hidden .search-omnibox',
        header: '.section-header',
        donateButton: '.layout__header .donate-button',
        languageDropDown: '.layout__header .item.dropdown',
        title: '.section-header__title',
        subtitle: '.section-header__subtitle',
        filterOptions: '.filters__menu .filter',
        filterTabsNames: '.filters .filters__menu a.item.filter small',
        popup: '.content.filter-popup.ltr',
        pagination: '.pagination-menu *',
        footer: '.layout__footer'

    },
    search: {
        searchResultsTable: '.search-results .search__link',
    },
    lessons: {
        searchInput: '.mobile-hidden .search-omnibox',
        upper: '.section-header__menu .item',
        selectedStudyH2: 'h2.ui.header',
        containerPageResults: '.container.padded .index__date',
    },
    programs: {
    },
    sources: {
    },
    events: {
    },
    topics: {
        header: '.layout__content'
    },
    publications: {
    },
    projectStatus: {
        header: '.aligned'
    },

};

module.exports = selectors;
