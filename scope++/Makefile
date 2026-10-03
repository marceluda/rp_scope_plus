#
# $Id: Makefile 1235 2014-02-21 16:44:10Z ales.bardorfer $
#
# Red Pitaya specific application Makefile.
#
# scope++ has no FPGA of its own: it uses the factory bitstream of the ecosystem
#   - Ecosystem 0.9x: fpga.conf -> /opt/redpitaya/fpga/fpga_0.93.bit (loaded by the bazaar)
#   - Ecosystem 2.0 : fpga.sh   -> /opt/redpitaya/sbin/overlay.sh v0.94 (fpga.conf only has to be non-empty)
#

APP=$(notdir $(CURDIR:%/=%))

-include ../_settings.env
-include ../_build_number

# If you want to set specific variables use the file: ../_settings.env
#
# i.e.
#
# RPIP=rp-XXXXXX.local
# RPOPTS=-l root -p 2022
# RPSCP=-P 2022

RPOPTS ?= -l root

# Versioning system
BUILD_NUMBER ?= 0
REVISION ?= devbuild
VER:=$(shell cat info/info.json | grep version | sed -e 's/.*:\ *\"//' | sed -e 's/-.*//')

INSTALL_DIR ?= .

CONTROLLERHF = controllerhf.so

# Files of the App folder in the Red Pitaya (/opt/redpitaya/www/apps/$(APP))
APP_FILES = $(CONTROLLERHF) nginx.conf fpga.conf fpga.sh info css js py index.html

PKG = $(APP)-$(VER)-$(BUILD_NUMBER)-$(REVISION)

CFLAGS += -DVERSION=$(VER)-$(BUILD_NUMBER) -DREVISION=$(REVISION)
export CFLAGS


# $(CONTROLLERHF) is PHONY too: src/Makefile decides what to rebuild (CFLAGS carry VERSION/BUILD_NUMBER)
.PHONY: all app zip tar clean clean_app clean_target upload upload_html upload_py $(CONTROLLERHF)

all: $(CONTROLLERHF)

$(CONTROLLERHF):
	$(MAKE) -C src

app: $(CONTROLLERHF)

target/$(APP): $(CONTROLLERHF) index.html fpga.sh fpga.conf nginx.conf
	-$(RM) -rf target
	mkdir -p target/$(APP)
	cp -r $(CONTROLLERHF) nginx.conf fpga.conf fpga.sh info css js index.html target/$(APP)
	chmod 755 target/$(APP)/fpga.sh  # 2.0 runs it with system(): needs the exec bit
	cp -r ../resources target/
	cp ../CHANGELOG.md ../README.md target/
	mkdir -p target/$(APP)/py
	cp ../resources/rp_cmds/py/*.py target/$(APP)/py/
	sed -i target/$(APP)/info/info.json -e 's/REVISION/$(REVISION)/'
	sed -i target/$(APP)/info/info.json -e 's/BUILD_NUMBER/$(BUILD_NUMBER)/'
	sed -i target/$(APP)/index.html -e "s/\(\\s*\)var\\s*app_version\\s*=\\s*'VERSION'\\s*;\\s*/\\1var app_version = '$(VER)-$(BUILD_NUMBER)-$(REVISION)';/"

zip: target/$(APP)
	mkdir -p ../archive
	-$(RM) -f target/$(PKG).zip
	cd target; zip -r $(INSTALL_DIR)/$(PKG).zip *
	mv target/$(PKG).zip ../archive/.

tar: target/$(APP)
	mkdir -p ../archive
	-$(RM) -f target/$(PKG).tar.gz
	cd target; tar -czf $(INSTALL_DIR)/$(PKG).tar.gz *
	mv target/$(PKG).tar.gz ../archive/.

clean_target:
	-$(RM) -rf target target_dbg target_rld

clean_app:
	-$(MAKE) -C src clean
	-$(RM) -rf target target_dbg target_rld
	-$(RM) -f *.so
	echo "BUILD_NUMBER=$$(( $(BUILD_NUMBER) + 1 ))" > ../_build_number

clean: clean_app clean_target


# Never run by the build: they copy the App to a real Red Pitaya (RPIP)
upload: target/$(APP)
	ssh $(RPIP) $(RPOPTS) "PATH_REDPITAYA=/opt/redpitaya /boot/sbin/rw ; rm -rf /opt/redpitaya/www/apps/$(APP) ; mkdir -p /opt/redpitaya/www/apps/$(APP)"
	cd target/$(APP) ; scp $(RPSCP) -r $(APP_FILES) root@$(RPIP):/opt/redpitaya/www/apps/$(APP)/
	ssh $(RPIP) $(RPOPTS) "chmod 755 /opt/redpitaya/www/apps/$(APP)/fpga.sh"

upload_html: target/$(APP)
	ssh $(RPIP) $(RPOPTS) "PATH_REDPITAYA=/opt/redpitaya /boot/sbin/rw ; rm -rf /opt/redpitaya/www/apps/$(APP)/{index.html,js,css}"
	cd target/$(APP); scp $(RPSCP) -r index.html css js root@$(RPIP):/opt/redpitaya/www/apps/$(APP)/

upload_py: ../resources/rp_cmds/py/test.py
	ssh $(RPIP) $(RPOPTS) "PATH_REDPITAYA=/opt/redpitaya /boot/sbin/rw ; mkdir -p /root/py ; rm -rf /root/py/*.py"
	scp $(RPSCP) ../resources/rp_cmds/py/*.py root@$(RPIP):/root/py/
	ssh $(RPIP) $(RPOPTS) "PATH_REDPITAYA=/opt/redpitaya /boot/sbin/rw ; chmod +x /root/py/*.py"
