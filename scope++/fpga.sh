#!/bin/sh
# Ecosystem 2.0: the bazaar runs this script (after rmoverlay.sh) when the App is started; fpga.conf is only
# checked to be non-empty. scope++ has no FPGA of its own: it uses the factory v0.94 bitstream (scope + ASG +
# PID at 0x40100000/0x40200000/0x40300000), loaded exactly as the factory scopegenpro/spectrumpro Apps do.
# overlay.sh picks /opt/redpitaya/fpga/<model>/v0.94/fpga.bit.bin (model from 'monitor -f', z10_125 on
# STEMlab 125-14) and loads it with fpgautil -b, plus its device tree overlay (fpga.dtbo).
# Ecosystem 0.9x does not run fpga.sh: it loads the file named in fpga.conf.
/opt/redpitaya/sbin/overlay.sh v0.94
