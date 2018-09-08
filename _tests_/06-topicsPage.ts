/*
    Common Sanity Test - Chceck the follow elements are on the page
    ---------------------------------------------
    1. Sidebar
    2. Title and Subtitle
    3. Header
    4. Tabs
    5. Filters
    6. Footers
*/

// import {Selector} from 'testcafe';

// import selectors from '../src/selectors';
// import texts from '../src/texts'
// import config from '../src/config'
// import tcUtils from '../src/tc_utils'
//
// // const link = `${config.basePath}/${config.lang}/topics`;
// const link = `${config.basePath}/${config.lang}`;
// fixture`Publications`.page(`${link}/publications`);
//
// test('Smoke Test - Publications', async t => {
//     const headerTabs = await tcUtils.multipleSelect(selectors.publications.headerTabs);
//     const filterTabs = await tcUtils.multipleSelect(selectors.common.filterTabsNames);
//
//     await t
//         .maximizeWindow()
//         .expect(headerTabs).eql(texts.publications.headerTabNames)
//         .expect(filterTabs).eql(texts.publications.filterTabNames)
//
//     // await tcUtils.filter(selectors.common.filterTabsNames);
//
//     });

// import {Selector} from 'testcafe';
//
// fixture`New Fixture`.page`http://kavanamusic.com/admin/`;
//
// test('New Test', async t => {
//     await t
//         .maximizeWindow()
//         .typeText(Selector('#email'), 'test@test.com')
//         .typeText(Selector('#password'), '123456')
//         .click(Selector('span').withText('Login'))
//         .click(Selector('.menu-item.ng-star-inserted').nth(4).find('span').withText('Albums'))
//         .click(Selector('[name="edit"].icon-edit').find('svg'))
//         .click(Selector('span').withText('New Track'))
//         .typeText(Selector('#track-name'), 'adada')
//         .typeText(Selector('#track-artists'), 'awda')
//         .click(Selector('button').withText('Upload'))
//         .click(Selector('.dropzone'))
//         .setFilesToUpload('#hidden-file-upload-input', '/Users/benjamin/Downloads/Radio/upload/0010-302-2.mp3')
//         .wait(30000)
//         .hover(Selector('span').withText('Create').find('.ng-star-inserted'))
//         .wait(3000)
//         .click(Selector('span').withText('Create').find('.ng-star-inserted'))
//         .wait(5000)
// });



// .hover('#mat-dialog-1 > new-track-modal > form > mat-dialog-actions > button.submit-button.mat-raised-button.mat-accent')

// .click(Selector('#mat-dialog-1 > new-track-modal > form > mat-dialog-actions > button.submit-button.mat-raised-button.mat-accent'))










