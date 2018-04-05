

pn=['xmin', 'xmax', 'trig_mode', 'trig_source', 'trig_edge', 'trig_delay', 'trig_level', 'single_btn', 
    'time_range', 'time_units', 'en_avg_at_dec', 'auto_flag', 'min_y', 'max_y', 'forcex_flag', 'meas_min_ch1', 
    'meas_max_ch1', 'meas_amp_ch1', 'meas_avg_ch1', 'meas_freq_ch1', 'meas_per_ch1', 'meas_min_ch2', 
    'meas_max_ch2', 'meas_amp_ch2', 'meas_avg_ch2', 'meas_freq_ch2', 'meas_per_ch2', 'prb_att_ch1', 'gain_ch1', 
    'prb_att_ch2', 'gain_ch2', 'gui_reset_y_range', 'gen_DC_offs_1', 'gen_DC_offs_2', 'gui_xmin', 'gui_xmax', 
    'min_y_norm', 'max_y_norm', 'gen_DC_norm_1', 'gen_DC_norm_2', 'scale_ch1', 'scale_ch2', 'gen_trig_mod_ch1', 
    'gen_sig_type_ch1', 'gen_enable_ch1', 'gen_single_ch1', 'gen_sig_amp_ch1', 'gen_sig_freq_ch1', 'gen_sig_dcoff_ch1', 
    'gen_trig_mod_ch2', 'gen_sig_type_ch2', 'gen_enable_ch2', 'gen_single_ch2', 'gen_sig_amp_ch2', 'gen_sig_freq_ch2', 
    'gen_sig_dcoff_ch2', 'gen_awg_refresh', 'pid_11_enable', 'pid_11_rst', 'pid_11_sp', 'pid_11_kp', 'pid_11_ki', 'pid_11_kd', 
    'pid_12_enable', 'pid_12_rst', 'pid_12_sp', 'pid_12_kp', 'pid_12_ki', 'pid_12_kd', 'pid_21_enable', 'pid_21_rst', 'pid_21_sp', 
    'pid_21_kp', 'pid_21_ki', 'pid_21_kd', 'pid_22_enable', 'pid_22_rst', 'pid_22_sp', 'pid_22_kp', 'pid_22_ki', 'pid_22_kd']

for ( var x in pn) { console.log( pn[x] ) }

for ( var x in pn) {
  if ( $('#'+pn[x]).size()==1 )
    console.log( ""+pn[x]+": "+ $('#'+pn[x])[0].type ) ;
}


function wait_next(){
  var timeouttime=1000;
  var starttime = new Date().getTime();
  var lastSendParamsCount = sendParamsCount;
  sendParams(true);
  while (sendParamsCount==lastSendParamsCount) {
    if ((new Date().getTime() - starttime) > timeouttime){
      break;
    }
  }
  return
}

/*
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
*/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two second later');
}
  

function wait(seg) {
  if(seg>1){
    seg=Math.round(seg);
    while(seg>0){
      console.log(seg);
      seg--;
      sleep(1000)
    }
  } else {
    sleep(1000*Math.round(seg))
  }
  return
}

function rp_set(param,val){
  params.local[param]=val;
  //sendParams(true);
  wait_next()
}

function rp_get(param){
  return params.local[param];
}


async function demo() {
  var amplitudes=[];
  rp_set('gen_sig_amp_ch1', 0.3)
  await sleep(300);
  rp_set('gen_sig_freq_ch1', 200);
  await sleep(300);
  rp_set('gen_enable_ch1', 1)
  await sleep(300);

  $('#btn_auto').click();
  await sleep(2000);
  
  rp_get('time_range');

  await sleep(3000);

  freqs=[200,430,928,2000,4300,9200,20000,43000,93000,200000];

  for(var i in freqs){
    rp_set('gen_sig_freq_ch1', freqs[i]);
    await sleep(300);
    console.log('frecuencia '+ freqs[i] + ' Hz' );
    
    if(i%4 == 3) { 
      $('#btn_auto').click();
      await sleep(1000);
      console.log('Resize')
    }
    await sleep(3000);
    amplitudes[i]=params.local.meas_amp_ch1;
    console.log('amplitud Vpp: '+ amplitudes[i] + ' V' );
    await sleep(300);
  }
  
  console.log(amplitudes);
}






