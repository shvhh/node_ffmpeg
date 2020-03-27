// const cluster = require('cluster');
// const numCPUs = 4;
const { exec } = require('child_process');
// remove umh and esa :time consuming

const configs = [
  'mc_mode=obmc:me_mode=bidir:me=esa',
  'mc_mode=obmc:me_mode=bidir:me=tss',
  'mc_mode=obmc:me_mode=bidir:me=tdls',
  'mc_mode=obmc:me_mode=bidir:me=ntss',
  'mc_mode=obmc:me_mode=bidir:me=fss',
  'mc_mode=obmc:me_mode=bidir:me=ds',
  'mc_mode=obmc:me_mode=bidir:me=hexbs',
  'mc_mode=obmc:me_mode=bidir:me=epzs',
  'mc_mode=obmc:me_mode=bidir:me=umh', //bi dir
  // 'mc_mode=obmc:me_mode=bilat:me=esa',
  // 'mc_mode=obmc:me_mode=bilat:me=tss',
  // 'mc_mode=obmc:me_mode=bilat:me=tdls',
  // 'mc_mode=obmc:me_mode=bilat:me=ntss',
  // 'mc_mode=obmc:me_mode=bilat:me=fss',
  // 'mc_mode=obmc:me_mode=bilat:me=ds',
  // 'mc_mode=obmc:me_mode=bilat:me=hexbs',
  // 'mc_mode=obmc:me_mode=bilat:me=epzs',
  // 'mc_mode=obmc:me_mode=bilat:me=umh', //bi lat
  'mc_mode=aobmc:me_mode=bidir:me=esa',
  'mc_mode=aobmc:me_mode=bidir:me=tss',
  'mc_mode=aobmc:me_mode=bidir:me=tdls',
  'mc_mode=aobmc:me_mode=bidir:me=ntss',
  'mc_mode=aobmc:me_mode=bidir:me=fss',
  'mc_mode=aobmc:me_mode=bidir:me=ds',
  'mc_mode=aobmc:me_mode=bidir:me=hexbs',
  'mc_mode=aobmc:me_mode=bidir:me=epzs',
  'mc_mode=aobmc:me_mode=bidir:me=umh' //bi dir
  // 'mc_mode=aobmc:me_mode=bilat:me=esa',
  // 'mc_mode=aobmc:me_mode=bilat:me=tss',
  // 'mc_mode=aobmc:me_mode=bilat:me=tdls',
  // 'mc_mode=aobmc:me_mode=bilat:me=ntss',
  // 'mc_mode=aobmc:me_mode=bilat:me=fss',
  // 'mc_mode=aobmc:me_mode=bilat:me=ds',
  // 'mc_mode=aobmc:me_mode=bilat:me=hexbs',
  // 'mc_mode=aobmc:me_mode=bilat:me=epzs',
  // 'mc_mode=aobmc:me_mode=bilat:me=umh' //bi lat
];

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
for (let i = 0; i < configs.length; i++) {
  convert(i);
}
// }

function convert(i) {
  console.time(configs[i]);
  exec(
    `ffmpeg -threads 8 -i cut.mp4 -filter:v "minterpolate=fps=120:mi_mode=mci:${configs[i]}:vsbmc=1" cut-${configs[i]}.mp4`,
    () => {
      console.timeEnd(configs[i]);
    }
  );
}

/*
mc_mode=obmc:me_mode=bidir:me=hexbs: 1221693.954ms
mc_mode=aobmc:me_mode=bidir:me=hexbs: 1222888.480ms
mc_mode=obmc:me_mode=bidir:me=epzs: 1226863.579ms // efficient
mc_mode=aobmc:me_mode=bidir:me=ntss: 1227740.772ms
mc_mode=obmc:me_mode=bidir:me=ntss: 1228561.917ms
mc_mode=aobmc:me_mode=bidir:me=epzs: 1233303.154ms //best one
mc_mode=obmc:me_mode=bidir:me=tdls: 1238268.537ms
mc_mode=obmc:me_mode=bidir:me=ds: 1240994.163ms
mc_mode=aobmc:me_mode=bidir:me=ds: 1241255.434ms
mc_mode=aobmc:me_mode=bidir:me=tdls: 1242423.318ms
mc_mode=aobmc:me_mode=bidir:me=fss: 1243617.534ms
mc_mode=obmc:me_mode=bidir:me=fss: 1244323.909ms
mc_mode=obmc:me_mode=bidir:me=tss: 1251229.395ms
mc_mode=aobmc:me_mode=bidir:me=tss: 1255308.599ms
mc_mode=obmc:me_mode=bidir:me=umh: 1577262.844ms
mc_mode=aobmc:me_mode=bidir:me=umh: 1578223.009ms

*/
