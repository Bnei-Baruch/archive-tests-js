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
        filterOptions: '.filters__menu .filter',
        searchResultsTable: '.search-results .search__link',
        pagination: '.pagination-menu *'
    },
    lessons: {
        sideBar: '.sidebar-item',
        title: '.section-header__title',
        header: '.section-header',
        logo: '.layout__header .logo',
        searchInput: '.mobile-hidden .search-omnibox',
        donateButton: '.layout__header .donate-button',
        languageDropDown: '.layout__header .item.dropdown',
        upper: '.section-header__menu .item',
        filterTabsNames: '.section-header__menu .item',
        filterOptions: '.filters__menu .filter',
        popup: '.content.filter-popup.ltr',
        selectedStudyH2: 'h2.ui.header',
        containerPageResults: '.container.padded .index__date',
        paginationResults: '.pagination-results',
        footer: '.layout__footer'
    },
    programs: {
        sideBar: '.sidebar-item',
        header: '.section-header',
        title: '.section-header__title',
        subtitle: '.section-header__subtitle',
        logo: '.layout__header .logo',
        searchInput: '.mobile-hidden .search-omnibox',
        donateButton: '.layout__header .donate-button',
        languageDropDown: '.layout__header .item.dropdown',
        filterTabsNames: '.filters .filters__menu a.item.filter small',
        footer: '.layout__footer'
    },



    sources: {
        sideBar: '.sidebar-item',
        header: '.section-header',
        logo: '.layout__header .logo',
        searchInput: '.mobile-hidden .search-omnibox',
        donateButton: '.layout__header .donate-button',
        languageDropDown: '.layout__header .item.dropdown',
        footer: '.layout__footer'
    },
    events: {
        sideBar: '.sidebar-item',
        header: '.section-header',
        logo: '.layout__header .logo',
        searchInput: '.mobile-hidden .search-omnibox',
        donateButton: '.layout__header .donate-button',
        languageDropDown: '.layout__header .item.dropdown',
        filterTabsNames: '.section-header__menu',
        footer: '.layout__footer'
    },
    topics: {
        header: '.layout__content'
    },
    publications: {
        sideBar: '.sidebar-item',
        header: '.section-header',
        title: '.section-header__title',
        subtitle: '.section-header__subtitle',
        logo: '.layout__header .logo',
        searchInput: '.mobile-hidden .search-omnibox',
        donateButton: '.layout__header .donate-button',
        languageDropDown: '.layout__header .item.dropdown',
        filterTbl: '.filters__menu .filter small',
        footer: '.layout__footer'



        //filterTabs: '.filters .filters__menu a.item.filter small',
        //filterTabs: '.filters__menu .filter small',

    },
    projectStatus: {
        header: '.aligned'
    },

};

module.exports = selectors;
