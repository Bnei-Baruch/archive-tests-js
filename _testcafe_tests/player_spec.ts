/*
    Player Page test suite - 2018 (c)
 */

import {Selector,ClientFunction} from 'testcafe';
import selectors from '../src/selectors.js'

const testconfig = require('./testconfig');
const tcUtils = require('../src/tc_utils');
const player_utils = require('../src/player_utils');
const utils = require('../src/utils');
const tc_utils = require('../src/tc_utils');
const width = 1400;
const height = 1080;

fixture`Video Player Test Suite`
    .page(testconfig.resources.playerUrl);

test('playerTimeCode', async t => {

    const timeCodes = await tc_utils.multipleSelect(selectors.player.controls.timecode);
    console.log(`Timecodes: ${timeCodes[0]}:${timeCodes[1]}`);

    await player_utils.waitPlayerToLoad();
    await t
        .expect(timeCodes[0]).eql('00:00')
        .expect(timeCodes[1]).notEql('00:00');
});

test('timeCodeUpdateByPlay', async t => {

    await player_utils.waitPlayerToLoad(t);
    await player_utils.playByClick(t);
    await utils.sleep(5000);

    t.expect(await player_utils.getPlayerCurrentTime(t)).gt(0);
});

test('timeCodeUpdateByScroll', async t => {

    const getSeekbarRect = ClientFunction((selector) => {
        const {top, left, bottom, right} = document.querySelector(selector).getBoundingClientRect();
        return {top, left, bottom, right};
    });

    let rect = await getSeekbarRect(selectors.player.controls.seekbarKnob);

    console.debug("Rect >> top: " + rect.top + " left: " + rect.left + " bottom: " + rect.bottom +
        " right: " + rect.right);

    let current_mouse_x = rect.left + ((rect.right - rect.left) / 2);
    let current_mouse_y = rect.top + ((rect.top - rect.bottom) / 2);

    console.debug("Before Drag: " + await player_utils.getPlayerCurrentTime());
    const seekbarSelector = await Selector(selectors.player.controls.seekbarKnob);
    await t.drag(seekbarSelector, current_mouse_x + 100, parseInt(current_mouse_y));

    console.debug("After Drag: " + await player_utils.getPlayerCurrentTime());

});

test('timeCodeUpdateByLink', async t => {

});

test('videoSize', async t => {

    // click on playback rate
    await t.click('.mediaplayer__video-size');
    let videoSizeElements = await tc_utils.multipleSelect('.mediaplayer__video-size span');
    // let videoSizeElements = await t.eval('.mediaplayer__video-size span', (selectors) => {
    //     return selectors.map(selector => selector.innerText);
    // });
    //
    await t.expect(videoSizeElements.length).eql(2);
    await t.expect(videoSizeElements[0].trim()).eql('720p');
    await t.expect(videoSizeElements[1].trim()).eql('360p');
});


test('speedSelector_1X', async t => {

    // click on playback rate
    await t.click('.mediaplayer__playback-rate');
    // let rateElements = await t.$$eval('.visible.menu.transition div span', (selectors) => {
    //     return selectors.map(selector => selector.innerText);
    // });
    // t.expect(rateElements.length).eql(5);
    // t.expect(rateElements[0].trim()).eql('2x');
    // t.expect(rateElements[1].trim()).eql('1.5x');
    // t.expect(rateElements[2].trim()).eql('1.25x');
    // t.expect(rateElements[3].trim()).eql('1x');
    // t.expect(rateElements[4].trim()).eql('0.75x');
});

test('speedSelector_1_5X', async t => {

});

test('speedSelector_2X', async t => {

});

test('volumeBar', async t => {

});

test('audioVideoToggle', async t => {

});

test('languageSelector', async t => {

});

test('fullScreenToggle', async t => {
    t.expect(await player_utils.isFullScreen(t)).notOk();
    await player_utils.playerFullScreenToggle(t);
    t.expect(await player_utils.isFullScreen(t)).ok();
    await player_utils.playerFullScreenToggle(t);
    t.expect(await player_utils.isFullScreen(t)).notOk();
});

test('sharingModeOn', async t => {

});

test('countPlayerButtons', async t => {

    // verify that displayed all buttons 10
    // let playerButtons = await t.$$eval('.mediaplayer__controls button', (selectors) => {
    //     return selectors.map(selector => selector.innerHTML)
    // });
    // t.expect(playerButtons.length).eql(10);
});

test('playerSkipTimeShortKeys', async t => {
    // hold Shift and left right narrow jump by 10 seconds

    // hold Option and left right narrow jump by 5 seconds
});

test('sharingModeOff', async t => {

});

test('sharingModeActions', async t => {

});

