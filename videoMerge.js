const fs = require('fs');
const { execSync } = require('child_process');

// console.log(fs.readdirSync('./'));
const tempFileName = 'temp.txt';
const files = [
  'cut-mc_mode=aobmc:me_mode=bidir:me=ds.mp4',
  'cut-mc_mode=aobmc:me_mode=bidir:me=epzs.mp4',
  'cut-mc_mode=aobmc:me_mode=bidir:me=esa.mp4',
  'cut-mc_mode=aobmc:me_mode=bidir:me=fss.mp4',
  'cut-mc_mode=aobmc:me_mode=bidir:me=hexbs.mp4',
  'cut-mc_mode=aobmc:me_mode=bidir:me=ntss.mp4',
  'cut-mc_mode=aobmc:me_mode=bidir:me=tdls.mp4',
  'cut-mc_mode=aobmc:me_mode=bidir:me=tss.mp4',
  'cut-mc_mode=aobmc:me_mode=bidir:me=umh.mp4',
  'cut-mc_mode=obmc:me_mode=bidir:me=ds.mp4',
  'cut-mc_mode=obmc:me_mode=bidir:me=epzs.mp4',
  'cut-mc_mode=obmc:me_mode=bidir:me=esa.mp4',
  'cut-mc_mode=obmc:me_mode=bidir:me=fss.mp4',
  'cut-mc_mode=obmc:me_mode=bidir:me=hexbs.mp4',
  'cut-mc_mode=obmc:me_mode=bidir:me=ntss.mp4',
  'cut-mc_mode=obmc:me_mode=bidir:me=tdls.mp4',
  'cut-mc_mode=obmc:me_mode=bidir:me=tss.mp4',
  'cut-mc_mode=obmc:me_mode=bidir:me=umh.mp4'
];

const tempFileData = files.reduce((prevoiusValue, currentValue) => prevoiusValue + `file '${currentValue}'\n`, '');

console.log(tempFileData);
fs.writeFileSync(`./${tempFileName}`, tempFileData);

execSync(`ffmpeg -f concat -safe 0 -i ${tempFileName} -c copy output.mp4`);
