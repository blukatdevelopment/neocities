#!/usr/bin/python3

# Install watchdog with `sudo apt install python3-watchdog`
# Run this in the background to automatically build you change files.
import sys
import time
import logging
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from build import main

class Handler(FileSystemEventHandler):

    @staticmethod
    def on_any_event(event):

        if event.is_directory:
            return

        if event.event_type == "created" or event.event_type == "modified":
            if event.src_path == "./walker.build.html":
                print("Skipping change to walker.build.html")
            else:
                print("Run build.py")
                main()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s - %(message)s',
                        datefmt='%Y-%m-%d %H:%M:%S')
    path = sys.argv[1] if len(sys.argv) > 1 else '.'
    event_handler = Handler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()