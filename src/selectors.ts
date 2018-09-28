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
    query: {
        tabName: '.section-header__menu.menu a.item',
        filterBy: '.filters__menu.menu div.filter__wrapper small',
        openedBox: '.filter-popup__wrapper a.item',
        openedBoxButtons: '.filter-popup__header button',
        expectedString: '.filter__wrapper .filter__text .filter__breadcrumb',
        resultValueBlock: '.filter__state .filter__text .filter__breadcrumb',
        sourceTextAfterClear: '.filter__wrapper .filter__text',
        clearButton: '.times.icon',
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
        uiStatus: 'h3.ui.header'
    },
    player: {
        playerTag: "video",
        controls: {
            allButtons: '.mediaplayer__controls button',
            play: 'i.play.icon',
            onscreen_play: '.mediaplayer__onscreen-play',
            pause: 'i.pause.icon',
            timecode: '.mediaplayer__timecode time',
            seekbarKnob: '.seekbar__knob',
            playbackRate: '.mediaplayer__playback-rate',
            playbackRateDropBox: '.mediaplayer__playback-rate span',
            fullScreen: '.player-button.player-control-fullscreen',
            videoResolution: '.mediaplayer__video-size',
            videoResolutionDropBox: '.mediaplayer__video-size span',
            playerVolume: '.mediaplayer__volume',
            playerVolumeUp: '.volume.up.icon',
            playerVolumeDown: '.volume.down.icon',
            playerVolumeOff: '.volume.off.icon',
            playerVolumeBar: '.volume-popover',
            playerAudioVideoToggle: '.mediaplayer__audiovideo',
            playerAudioMode: ".mediaplayer audio",
            playerVideoMode: ".mediaplayer video",
            playerLanguagesButton: ".mediaplayer__languages",
            playerLanguagesCurrentLang: ".mediaplayer__languages div button",
            playerLanguagesList: ".mediaplayer__languages .visible.menu.transition",
            playerLanguagesListEntries: ".mediaplayer__languages .visible.menu.transition .item",
            playerSharingButton: "button .share.alternate.icon",
            playerSharingModeControls: {
                sharingModeOn: ".mediaplayer__onscreen-share",
                socialButtons: ".social-buttons",
                sharingBar: ".mediaplayer__onscreen-share-bar",
                sharingLinkText: ".mediaplayer__onscreen-share-bar p",
                sharingCopyButton: ".ui.mini.button.shareCopyLinkButton",
                sharingStartButton: "button .hourglass.start.icon",
                sharingEndButton: "button .hourglass.end.icon"
            }

        }
    }
};
export default selectors;
