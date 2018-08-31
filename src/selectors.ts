const selectors = {
    main: {
        homepageTitle: '.homepage__title',
        searchButton: '.search-omnibox button',
        searchInput: 'input[type=search]',
        searchResult: '.layout__header .search-omnibox',
        thumbnail: '.thumbnail',
        horizonTitle: '.horizontal.divider',
        horizonIconRows: '.homepage__website-sections .header',
        lastUpdateThumbnails: '.homepage__thumbnails a.card',
        archiveThumbnails: '.homepage__website-sections.homepage__section a.header',
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
        headerPagination: '.header.pagination-results',
        filterOptionsHighLevel: '.section-header__menu.menu a.item',
        filterTabsNames: '.filters .filters__menu a.item.filter small',

        popup: '.content.filter-popup.ltr',
        pagination: '.pagination-menu *',
        footer: '.layout__footer'
    },
    search: {
        searchResultsTable: '.search-results .search__link',
    },
    lessons: {
        headerTabs: '.section-header__menu.menu a.item',
        selectedStudyH2: 'h2.ui.header',
        containerPageResults: '.container.padded .index__date',
    },
    programs: {
        paginationItem: 'table tr a.index__title',
    },
    sources: {
        authorsList: '.sources__list .ui.small.header',
        sourcesListByAuthor: '.sources__list .list',
    },
    events: {
        header: '.section-header',
        headerTabs: '.section-header__menu.menu a.item',
    },
    topics: {
        header: '.layout__content'
    },
    publications: {
        headerTabs: '.section-header__menu.menu a.item',
        paginationItem: '.blog-posts .post',
    },
    projectStatus: {
        title: '.aligned',
        uiStatus:'h3.ui.header'
    },
    player: {
        playerTag: "video",
        controls: {
            timecode: '.mediaplayer__timecode time',
            seekbarKnob: '.seekbar__knob',
            videoSize: '.mediaplayer__video-size',
            videoSizesList: '.mediaplayer__video-size span',
            playbackRate: '.mediaplayer__playback-rate',

        }
    }
};
export default selectors


