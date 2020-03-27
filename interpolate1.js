const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const { exec } = require('child_process');
const fs = require('fs');
const configs = ['mc_mode=obmc:me_mode=bilat:me=esa',
  'mc_mode=obmc:me_mode=bilat:me=tss',
  'mc_mode=obmc:me_mode=bilat:me=tdls',
  'mc_mode=obmc:me_mode=bilat:me=ntss',
  'mc_mode=obmc:me_mode=bilat:me=fss',
  'mc_mode=obmc:me_mode=bilat:me=ds',
  'mc_mode=obmc:me_mode=bilat:me=hexbs',
  'mc_mode=obmc:me_mode=bilat:me=epzs',
  'mc_mode=obmc:me_mode=bilat:me=umh', //bi lat
  
];
for (let i = 0; i < configs.length; i++) {
  exec(
    `ffmpeg -threads 2 -i Kara\\\ no\\\ Kyoukai\\\ 【AMV】\\\ Oblivious_HD.mp4 -filter:v "minterpolate=fps=60:mi_mode=mci:${configs[i]}:vsbmc=1" Kara\\\ no\\\ Kyoukai\\\ 【AMV】\\\ Oblivious_HD-${configs[i]}.mp4`,
    () => {}
  );
}
