#
# $Id: Makefile 1235 2014-02-21 16:44:10Z ales.bardorfer $
#
# Red Pitaya specific application Makefile.
#

APP=$(notdir $(CURDIR:%/=%))

-include ../_settings.env
-include ../_build_number

# Versioning system
BUILD_NUMBER ?= 0
REVISION ?= devbuild
VER:=$(shell cat info/info.json | grep version | sed -e 's/.*:\ *\"//' | sed -e 's/-.*//')

INSTALL_DIR ?= .

CONTROLLERHF = controllerhf.so

CFLAGS += -DVERSION=$(VER)-$(BUILD_NUMBER) -DREVISION=$(REVISION)
export CFLAGS


.PHONY: clean clean_app

all: $(CONTROLLERHF)

$(CONTROLLERHF):
	$(MAKE) -C src

app: $(CONTROLLERHF)

# target/$(APP): red_pitaya.bit $(CONTROLLERHF) index.html
target/$(APP): $(CONTROLLERHF) index.html
	mkdir -p target/$(APP)
	#cp -r $(CONTROLLERHF) fpga.conf info css js red_pitaya.bit index.html target/$(APP)
	cp -r $(CONTROLLERHF) fpga.conf info css js index.html target/$(APP)
	# cp -r upload_app.sh target/
	cp -r ../resources target/
	cp ../CHANGELOG.md ../README.md target/
	mkdir -p target/$(APP)/py
	cp ../resources/rp_cmds/py/*.py target/$(APP)/py/
	sed -i target/$(APP)/info/info.json -e 's/REVISION/$(REVISION)/'
	sed -i target/$(APP)/info/info.json -e 's/BUILD_NUMBER/$(BUILD_NUMBER)/'
	sed -i target/$(APP)/index.html -e "s/\(\\s*\)var\\s*app_version\\s*=\\s*'VERSION'\\s*;\\s*/\\1var app_version = '$(VER)-$(BUILD_NUMBER)-$(REVISION)';/"

zip: $(CONTROLLERHF) target/$(APP)
	#-$(RM) target -rf
	cd target; zip -r $(INSTALL_DIR)/$(APP)-$(VER)-$(BUILD_NUMBER)-$(REVISION).zip *
	mv target/$(APP)-$(VER)-$(BUILD_NUMBER)-$(REVISION).zip ../archive/.
	#$(RM) target -rf

tar: $(CONTROLLERHF) target/$(APP) target_dbg/$(APP)_DEBUG target_rld/$(APP)_RELOAD
	cd target; tar -czf $(INSTALL_DIR)/$(APP)-$(VER)-$(BUILD_NUMBER)-$(REVISION).tar.gz *
	mv target/$(APP)-$(VER)-$(BUILD_NUMBER)-$(REVISION).tar.gz ../archive/.

clean_target:
	-$(RM) target -rf

clean_app:
	$(MAKE) -C src clean
	-$(RM) target -rf
	-$(RM) *.so
	echo "BUILD_NUMBER=$$(( $(BUILD_NUMBER) + 1 ))" > ../_build_number

clean: clean_app clean_target



upload_html: index.html
	ssh $(RPIP) $(RPOPTS) "PATH_REDPITAYA=/opt/redpitaya /boot/sbin/rw ; rm -rf /opt/redpitaya/www/apps/scope++/index.html"
	scp $(RPSCP) -r index.html root@$(RPIP):/opt/redpitaya/www/apps/scope++/

upload: target/$(APP)
	ssh $(RPIP) $(RPOPTS) "PATH_REDPITAYA=/opt/redpitaya /boot/sbin/rw ; rm -rf /opt/redpitaya/www/apps/$(APP) ; mkdir -p /opt/redpitaya/www/apps/$(APP)"
	#cd target/$(APP) ; scp  $(RPSCP) -r controllerhf.so css js fpga.conf index.html info red_pitaya.bit  root@$(RPIP):/opt/redpitaya/www/apps/$(APP)/
	cd target/$(APP) ; scp  $(RPSCP) -r controllerhf.so css js fpga.conf index.html info root@$(RPIP):/opt/redpitaya/www/apps/$(APP)/


upload_html: target/$(APP) target_dbg/$(APP)_DEBUG target_rld/$(APP)_RELOAD
	ssh $(RPIP) $(RPOPTS) "PATH_REDPITAYA=/opt/redpitaya /boot/sbin/rw ; rm -rf /opt/redpitaya/www/apps/$(APP)/{index.html,js,css}"
	cd target/$(APP); scp $(RPSCP) -r index.html css js root@$(RPIP):/opt/redpitaya/www/apps/$(APP)/

upload_py: ../resources/rp_cmds/py/hugo.py
	ssh $(RPIP) $(RPOPTS) "PATH_REDPITAYA=/opt/redpitaya /boot/sbin/rw ; rm -rf /root/py/*.py"
	scp $(RPSCP) ../resources/rp_cmds/py/*.py root@$(RPIP):/root/py/
	ssh $(RPIP) $(RPOPTS) "PATH_REDPITAYA=/opt/redpitaya /boot/sbin/rw ; chmod +x /root/py/*.py"
