/*
    Player Page test suite - 2018 (c)
 */

import {ClientFunction, Selector} from 'testcafe';
import selectors from '../src/selectors'
import tcUtils from '../src/tc_utils'
import testconfig from '../src/testconfig';
import player_utils from '../src/player_utils';

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
    console.log(`Timecodes: ${timeCodes[0]} - ${timeCodes[1]}`);

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
    await t
        .navigateTo(testconfig.resources.playerUrl + '&mediaType=video&sstart=7m28s&send=11m22s');
    await player_utils.waitForPlayerToLoad();
    const timeCodes = await tcUtils.multipleSelect(selectors.player.controls.timecode);
    console.log(`Timecodes: ${timeCodes[0]} - ${timeCodes[1]}`);
    await t
        .expect(timeCodes[0]).eql('07:28')
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
    await t
        .click(selectors.player.controls.playerVolume)
        .expect(await Selector(selectors.player.controls.playerVolumeBar)).ok()
        .click(selectors.player.controls.playerVolume)
        .expect(await Selector(selectors.player.controls.playerVolumeOff)).ok()
        .click(selectors.player.controls.playerVolume)
        .expect(await Selector(selectors.player.controls.playerVolumeUp)).ok()


});

test('audioVideoToggle', async t => {
    await t
        .expect(await Selector(selectors.player.controls.playerVideoMode)).ok()
        .click(selectors.player.controls.playerAudioVideoToggle)
        .expect(await Selector(selectors.player.controls.playerAudioMode)).ok()
        .click(selectors.player.controls.playerAudioVideoToggle)
        .expect(await Selector(selectors.player.controls.playerVideoMode)).ok()

});

test('languageSelector', async t => {
    await t
        .click(selectors.player.controls.playerLanguagesButton)
        .expect(await Selector(selectors.player.controls.playerLanguagesList)).ok();
        const languagesList = await tcUtils.multipleSelect(selectors.player.controls.playerLanguagesListEntries);
    await t
        .expect(languagesList.length).gt(0)
        .click(await Selector(selectors.player.controls.playerLanguagesListEntries).nth(3))
        // TODO: meanwhile disabled to to testcafe issue with user interaction
        // https://github.com/DevExpress/testcafe/issues/2863
        // .expect(await Selector(selectors.player.controls.playerLanguagesCurrentLang).innerText).eql("es")
});

test.skip('fullScreenToggle', async t => {
    // FIXME: Waiting for testcafe bug fix: https://github.com/DevExpress/testcafe/issues/2863
    await player_utils.waitForPlayerToLoad();
    await t.expect(await player_utils.isFullScreen()).notOk();
    await player_utils.playerFullScreenToggle(t);
    await t.expect(await player_utils.isFullScreen()).ok();
    await player_utils.playerFullScreenToggle(t);
    await t.expect(await player_utils.isFullScreen()).notOk();
});

test('countPlayerButtons', async t => {

    let playerButtons = await tcUtils.multipleSelect(selectors.player.controls.allButtons);
    await t.expect(playerButtons.length).eql(10);
});

test.skip('playerSkipTimeShortKeys', async t => {
    // hold Shift and left right narrow jump by 10 seconds

    // hold Option and left right narrow jump by 5 seconds
});

test('sharingModeToggle', async t => {
    await player_utils.waitForPlayerToLoad();
    await t
        .click(Selector(selectors.player.controls.playerSharingButton))
        .expect(Selector(selectors.player.controls.playerSharingModeControls.sharingModeOn).exists).ok()
        .expect(Selector(selectors.player.controls.playerSharingModeControls.sharingBar).exists).ok()
        .expect(Selector(selectors.player.controls.playerSharingModeControls.sharingCopyButton).exists).ok()
        .expect(Selector(selectors.player.controls.playerSharingModeControls.sharingEndButton).exists).ok()
        .expect(Selector(selectors.player.controls.playerSharingModeControls.sharingStartButton).exists).ok()
        .expect(Selector(selectors.player.controls.playerSharingModeControls.socialButtons).exists).ok()
        .click(Selector(selectors.player.controls.playerSharingButton))
        .expect(Selector(selectors.player.controls.playerSharingModeControls.sharingModeOn).exists).notOk()
        .expect(Selector(selectors.player.controls.playerSharingModeControls.sharingBar).exists).notOk()
        .expect(Selector(selectors.player.controls.playerSharingModeControls.sharingCopyButton).exists).notOk()
        .expect(Selector(selectors.player.controls.playerSharingModeControls.sharingEndButton).exists).notOk()
        .expect(Selector(selectors.player.controls.playerSharingModeControls.sharingStartButton).exists).notOk()
        .expect(Selector(selectors.player.controls.playerSharingModeControls.socialButtons).exists).notOk()

});

test.skip('sharingModeActions', async t => {
    // FIXME: Waiting for testcafe bug fix: https://github.com/DevExpress/testcafe/issues/2863
    let startTime = 300;
    let endTime = 800;
    await player_utils.waitForPlayerToLoad();
    await t
        .click(Selector(selectors.player.controls.playerSharingButton));
    await player_utils.setPlayerDuration(startTime);
    await t
        .click(Selector(selectors.player.controls.playerSharingModeControls.sharingStartButton));
    await player_utils.setPlayerDuration(endTime);
    await t
        .click(Selector(selectors.player.controls.playerSharingModeControls.sharingEndButton))
        .navigateTo(await Selector(selectors.player.controls.playerSharingModeControls.sharingLinkText).innerText)


});

