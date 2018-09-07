/*
    Player Page test suite - 2018 (c)
 */

import {Selector,ClientFunction} from 'testcafe';
import selectors from '../src/selectors.js'

const testconfig = require('./testconfig');
const texts = require('../src/texts');
const tcUtils = require('../src/tc_utils');
const player_utils = require('../src/player_utils');
const tc_utils = require('../src/tc_utils');
const width = 1400;
const height = 1080;


const setHeight = ClientFunction((selector) => {
    const el = document.querySelector(selector);

    el.style.width = '1px';
    el.style.height = '1px';
});

const focus = ClientFunction((selector) => {
    document.querySelector(selector).focus();
});



fixture`Video Player Test Suite`
    .page(testconfig.resources.playerUrl);

test('playerTimeCode', async t => {

    await player_utils.waitForPlayerToLoad();
    const timeCodes = await tc_utils.multipleSelect(selectors.player.controls.timecode);
    console.log(`Timecodes: ${timeCodes[0]}:${timeCodes[1]}`);

    await t
        .expect(timeCodes[0]).eql('00:00')
        .expect(timeCodes[1]).notEql('00:00');
});

test('timeCodeUpdateByPlay', async t => {

    await player_utils.waitForPlayerToLoad();
    await t.click('i.play.icon');
    await t.wait(5000);
    await t
           .expect(await player_utils.getPlayerCurrentTime()).gt(0);
});

test('timeCodeUpdateByDrag', async t => {

    await player_utils.waitForPlayerToLoad();
    await setHeight(selectors.player.controls.seekbarKnob);
    console.debug("Before Drag: " + await player_utils.getPlayerCurrentTime());
    await t.drag(selectors.player.controls.seekbarKnob, 200, 0);
    console.debug("After Drag: " + await player_utils.getPlayerCurrentTime());
    await t.expect(await player_utils.getPlayerCurrentTime()).gt(0)

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

