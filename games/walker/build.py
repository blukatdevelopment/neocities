#!/usr/bin/python3
from pathlib import Path

EXPORT_FILE = "walker.build.html"
INJECT_PATTERN = "REPLACETHIS"
HTML_FILE = "./walker.html"
FIRST_FILE = "namespaces.js"
LAST_FILE = "main.js"

def get_files_at_path(path):
    js_files = [file for file in Path(path).glob('*.js')]
    return js_files

def get_html():
    html_path = Path(HTML_FILE)
    return html_path.read_text()

def main():
    p = Path('.')
    file_list = list(p.glob('**/*.js'))
    payload = ""

    for file in file_list:
        if file.name == FIRST_FILE:
            payload += "\n"
            payload += file.read_text()

    for file in file_list:
        if file.name != LAST_FILE and file.name != FIRST_FILE:
            payload += "\n"
            payload += file.read_text()

    for file in file_list:
        if file.name == LAST_FILE:
            payload += "\n"
            payload += file.read_text()

    html = get_html()
    html = html.replace(INJECT_PATTERN, payload, 1)

    destination = Path(EXPORT_FILE)
    destination.write_text(html)

main()