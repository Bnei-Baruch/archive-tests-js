/*
    Player Page test suite - 2018 (c)
 */

import {Selector,ClientFunction} from 'testcafe';
import selectors from '../src/selectors.js'
import {tcUtils} from '../src/tc_utils'
const testconfig = require('../_testcafe_tests/testconfig');
const texts = require('../src/texts');
const player_utils = require('../src/player_utils');

const width = 1400;
const height = 1080;

const setHeight = ClientFunction((selector) => {
    const el = document.querySelector(selector);

    el.style.width = '1px';
    el.style.height = '1px';
});


fixture`Video Player Test Suite`
    .page(testconfig.resources.playerUrl);

test('playerTimeCode', async t => {

    await player_utils.waitForPlayerToLoad();
    const timeCodes = await tcUtils.multipleSelect(selectors.player.controls.timecode);
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
    await t.click(selectors.player.controls.videoResolution);
    let videoSizeElements = await tcUtils.multipleSelect(selectors.player.controls.videoResolutionDropBox);
    await t.expect(videoSizeElements.length).eql(2);
    await t.expect(videoSizeElements[0].trim()).eql('720p');
    await t.expect(videoSizeElements[1].trim()).eql('360p');
});


test('videoSpeed', async t => {

    // click on playback rate
    await t.click(selectors.player.controls.playbackRate);
    let rateElements = await tcUtils.multipleSelect(selectors.player.controls.playbackRateDropBox);
    await t.expect(rateElements.length).eql(5);
    await t.expect(rateElements[0].trim()).eql('2x');
    await t.expect(rateElements[1].trim()).eql('1.5x');
    await t.expect(rateElements[2].trim()).eql('1.25x');
    await t.expect(rateElements[3].trim()).eql('1x');
    await t.expect(rateElements[4].trim()).eql('0.75x');
});

test('volumeBar', async t => {

});

test('audioVideoToggle', async t => {

});

test('languageSelector', async t => {

});

test.skip('fullScreenToggle', async t => {
    // await setHeight(selectors.player.controls.fullScreen);
    await player_utils.waitForPlayerToLoad();
    await t.expect(await player_utils.isFullScreen()).notOk();
    await player_utils.playerFullScreenToggle(t);
    await t.expect(await player_utils.isFullScreen()).ok();
    await player_utils.playerFullScreenToggle(t);
    await t.expect(await player_utils.isFullScreen()).notOk();
});

test('sharingModeOn', async t => {

});

test('countPlayerButtons', async t => {

    let playerButtons = await tcUtils.multipleSelect(selectors.player.controls.allButtons);
    await t.expect(playerButtons.length).eql(10);
});

test('playerSkipTimeShortKeys', async t => {
    // hold Shift and left right narrow jump by 10 seconds

    // hold Option and left right narrow jump by 5 seconds
});

test('sharingModeOff', async t => {

});

test('sharingModeActions', async t => {

});

