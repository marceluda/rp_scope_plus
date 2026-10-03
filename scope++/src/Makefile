CC=$(CROSS_COMPILE)gcc
RM=rm

OBJECTS=main.o fpga.o worker.o calib.o fpga_awg.o generate.o fpga_pid.o pid.o

CFLAGS+= -Wall -Werror -g -fPIC $(INCLUDE)
# -lm: main.c/worker.c use round/ceil/sqrt...; -lpthread: worker thread and mutexes (explicit, so that
# controllerhf.so does not depend on the libraries the server happens to have loaded)
LDFLAGS=-shared -lm -lpthread

CONTROLLER = ../controllerhf.so

all: $(CONTROLLER)

$(CONTROLLER): $(OBJECTS)
	$(CC) -o $(CONTROLLER) $(OBJECTS) $(CFLAGS) $(LDFLAGS)
	-$(RM) -f $(OBJECTS)

clean:
	-$(RM) -f $(OBJECTS)
