const { execSync } = require('child_process');
const fs = require('fs');
const threads = require('os').cpus().length || 2;
const videoName = 'Kara\\ no\\ Kyoukai\\ 【AMV】\\ Oblivious_HD.mp4';
const tempFileList = 'tempList.txt';
const tempVideoFileName = i => `temp${i}.${videoName.split('.').pop()}`;
try {
  const videoDuration = execSync(`ffmpeg -i ${videoName} 2>&1 | grep "Duration"`).toString();

  const durationArray = videoDuration
    .split(',')
    .shift()
    .split('Duration: ')
    .pop()
    .split(':');

  const durationSeconds = Number(durationArray[0]) * 3600 + Number(durationArray[1]) * 60 + Number(durationArray[2]);
  const videoDurationClips = [];
  const videoClipDuration = Math.floor(durationSeconds / threads);

  for (let i = 0; i < threads; i++) {
    if (i < threads - 1) {
      videoDurationClips.push({
        startTime: secondsToTimeStamp(videoClipDuration * i),
        duration: secondsToTimeStamp(videoClipDuration - 1)
      });
    } else {
      videoDurationClips.push({
        startTime: secondsToTimeStamp(videoClipDuration * (i - 1) + videoClipDuration),
        duration: ''
      });
    }
  }
  let fileListName = '';
  videoDurationClips.forEach(({ startTime, duration }, i) => {
    fileListName += `file ./${tempVideoFileName(i)}\n`;
    execSync(
      `ffmpeg -ss ${startTime} -i ${videoName} ${duration ? `-to ${duration}` : ''} -c copy ${tempVideoFileName(i)}`
    );
  });
  fs.writeFileSync(`./${tempFileList}`, fileListName);
  mergeVideo();
  deleteTempFiles();
  // ffmpeg -ss 00:01:00 -i input.mp4 -to 00:02:00 -c copy output.mp4
} catch (err) {
  console.log(err);

  for (let key in err) {
    if (err[key]) console.log(key, err[key].toString());
  }
}
// covert second to HH:MM:SS
function mergeVideo() {
  execSync(`ffmpeg -f concat -safe 0 -i ${tempFileList} -c copy output.mp4`);
}
function deleteTempFiles() {
  for (i = 0; i < threads; i++) {
    fs.unlink(`./${tempVideoFileName(i)}`, err => {
      if (err) console.log(err);
    });
  }
}
function secondsToTimeStamp(seconds) {
  console.log(seconds);
  let remainingSeconds = seconds;
  const HH = Math.floor(remainingSeconds / 3600);
  remainingSeconds = remainingSeconds % 3600;
  const MM = Math.floor(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  const SS = Math.floor(remainingSeconds);
  return `${HH}:${MM}:${SS}`;
}
