# Devbuild  changes

## v1.1.1
  - ADDED support for ecosystem 2.0 of RedPitaya
    - fpga.sh loads the factory v0.94 bitstream with /opt/redpitaya/sbin/overlay.sh (no FPGA of its own; fpga.conf kept for 0.9x)
    - nginx.conf with no-cache for index.html
  - ADDED root Makefile (builds the App and the zip/tar.gz packages in archive/); App Makefile rewritten
    (target/ with nginx.conf, fpga.conf and fpga.sh 755, packages in archive/, robust clean, upload with all the files)
  - settings.sh uses the Linaro 2015.02 toolchain
  - Ecosystem 2.0 web fixes, ported from rp_dummy_simulator v0.1.1 / rp_lock-in_pid_h_hf v0.3.8
    - FIXED E3: parameters are sent in chunks of at most 600 B (only changed and finite values, with retries)
    - App status is probed safely before polling /data (with cautious mode); the App is started robustly (with retries and verification)
    - ADDED "took control" detection when another client claims the board
    - ADDED save and restore of the App state in the browser (PIDs are restored disabled)
    - FIXED Config -> load (read-only keys are no longer sent)
    - FIXED second of two quick consecutive changes being lost while a POST was in flight
    - FIXED Enter in a field (Enter is prevented, forms use novalidate)
  - FIXED main.c: GUI xmin/xmax are taken from rp_main_params (partial POSTs); controller linked with -lm -lpthread
  - FIXED frozen oscilloscope with the v0.94 FPGA of ecosystem 2.0: the trigger lock is cleared (write 1 to 0x94) before arming
    and the end of the acquisition is detected with conf bit 4; still compatible with 0.9x
  - FIXED time scale after Restart (the scale is saved in seconds and restored with the server time units)
  - FIXED X axis after a restore (the plot starts with the server time window)
  - FIXED quick time scale clicks during a POST: they are queued and only the last one runs with the server units
  - FIXED Raw Mode button state: it is loaded from the server
  - Removed a debug console.log

## scope++-1.1.0-3-devbuild
  - Added features:
    - Save Config
    - Raw Mode

## scope++-1.1.0-0-devbuild
  - This is the starting point
